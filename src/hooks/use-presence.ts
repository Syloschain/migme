
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { RealtimeChannel } from '@supabase/supabase-js';

export type UserPresence = {
  user_id: string;
  username?: string;
  avatar_url?: string;
  status: 'online' | 'away' | 'busy';
  last_active: string;
};

export type PresenceState = {
  [key: string]: UserPresence[];
};

export function usePresence(roomId?: string) {
  const { user } = useAuth();
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [presenceState, setPresenceState] = useState<PresenceState>({});
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);

  useEffect(() => {
    if (!user || !roomId) return;

    // Create a new presence channel
    const channelName = roomId ? `room:${roomId}:presence` : 'global:presence';
    const presenceChannel = supabase.channel(channelName);

    // Set up presence handlers
    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const newState = presenceChannel.presenceState();
        // We need to manually cast this as our PresenceState type
        const typedState: PresenceState = {};
        
        // Convert the Supabase presence state to our expected format
        Object.keys(newState).forEach(key => {
          typedState[key] = newState[key].map(presence => {
            // Ensure each presence has the required properties
            return {
              user_id: (presence as any).user_id || '',
              username: (presence as any).username,
              avatar_url: (presence as any).avatar_url,
              status: (presence as any).status || 'online',
              last_active: (presence as any).last_active || new Date().toISOString(),
            };
          });
        });
        
        setPresenceState(typedState);
        
        // Convert presence state to array of users
        const users: UserPresence[] = [];
        Object.values(typedState).forEach(userPresences => {
          userPresences.forEach(presence => {
            users.push(presence);
          });
        });
        
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      });

    // Track the user's presence
    const userStatus: UserPresence = {
      user_id: user.id,
      username: user.user_metadata?.username,
      avatar_url: user.user_metadata?.avatar_url,
      status: 'online',
      last_active: new Date().toISOString(),
    };

    // Subscribe and track presence
    presenceChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await presenceChannel.track(userStatus);
      }
    });

    setChannel(presenceChannel);

    // Cleanup function
    return () => {
      if (presenceChannel) {
        supabase.removeChannel(presenceChannel);
      }
    };
  }, [user, roomId]);

  // Update user status
  const updateStatus = async (status: 'online' | 'away' | 'busy') => {
    if (channel && user) {
      await channel.track({
        user_id: user.id,
        username: user.user_metadata?.username,
        avatar_url: user.user_metadata?.avatar_url,
        status,
        last_active: new Date().toISOString(),
      });
    }
  };

  return {
    onlineUsers,
    presenceState,
    updateStatus,
  };
}
