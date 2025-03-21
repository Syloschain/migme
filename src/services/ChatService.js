
// ChatService.js
import { supabase } from "@/integrations/supabase/client";
import { ApiClient } from "./ApiClient";

export const ChatService = {
  // Subscribe to real-time updates for chat messages
  subscribeToMessages(roomId, callback) {
    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('New message:', payload);
          callback(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  // Subscribe to user online status changes
  subscribeToUserStatus(callback) {
    const channel = supabase
      .channel('user-status')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: 'status=neq.offline'
        },
        (payload) => {
          console.log('User status changed:', payload);
          callback(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  // Handle private messages
  async getPrivateChats(userId) {
    const { data, error } = await supabase
      .from('private_chat_participants')
      .select(`
        chat_id,
        private_chats(
          id,
          created_at,
          updated_at
        )
      `)
      .eq('profile_id', userId);

    if (error) throw error;
    return data;
  },

  async getPrivateChatParticipants(chatId) {
    const { data, error } = await supabase
      .from('private_chat_participants')
      .select(`
        profiles(
          id,
          username,
          avatar_url,
          status
        )
      `)
      .eq('chat_id', chatId);

    if (error) throw error;
    return data.map(item => item.profiles);
  },

  async getPrivateMessages(chatId, limit = 50) {
    const { data, error } = await supabase
      .from('private_messages')
      .select(`
        *,
        profiles(
          username,
          avatar_url
        )
      `)
      .eq('chat_id', chatId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async sendPrivateMessage(chatId, senderId, content) {
    const { data, error } = await supabase
      .from('private_messages')
      .insert([{
        chat_id: chatId,
        sender_id: senderId,
        content
      }]);

    if (error) throw error;
    return data;
  },

  async createPrivateChat(userId, recipientId) {
    // First create the chat
    const { data: chatData, error: chatError } = await supabase
      .from('private_chats')
      .insert([{}])
      .select()
      .single();

    if (chatError) throw chatError;

    // Then add participants
    const participants = [
      { chat_id: chatData.id, profile_id: userId },
      { chat_id: chatData.id, profile_id: recipientId }
    ];

    const { error: participantsError } = await supabase
      .from('private_chat_participants')
      .insert(participants);

    if (participantsError) throw participantsError;

    return chatData;
  },

  // Set user status
  async updateUserStatus(userId, status) {
    const { data, error } = await ApiClient.updateProfile(userId, { status });
    if (error) throw error;
    return data;
  }
};
