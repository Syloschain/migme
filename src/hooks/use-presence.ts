
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

type PresenceState = {
  [key: string]: {
    user_id: string;
    username?: string;
    avatar_url?: string;
    status: 'online' | 'away' | 'busy';
    last_active: string;
  }[];
};

type UserPresence = {
  user_id: string;
  username?: string;
  avatar_url?: string;
  status: 'online' | 'away' | 'busy';
  last_active: string;
};

export function usePresence(roomId?: string) {
  const { user } = useAuth();
  const [channel, setChannel] = useState<any>(null);
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
        setPresenceState(newState);
        
        // Convert presence state to array of users
        const users: UserPresence[] = [];
        Object.values(newState).forEach(userPresences => {
          userPresences.forEach(presence => {
            users.push(presence as UserPresence);
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
