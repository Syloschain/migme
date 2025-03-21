
// FriendService.js
import { supabase } from "@/integrations/supabase/client";

export const FriendService = {
  async getFriends(userId) {
    const { data, error } = await supabase
      .from('friends')
      .select(`
        friend_id,
        status,
        created_at,
        profiles!friends_friend_id_fkey(
          id,
          username,
          avatar_url,
          status,
          level
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'accepted');

    if (error) throw error;
    return data.map(friend => ({
      ...friend.profiles,
      friendshipCreated: friend.created_at
    }));
  },

  async getFriendRequests(userId) {
    const { data, error } = await supabase
      .from('friends')
      .select(`
        id,
        user_id,
        created_at,
        profiles!friends_user_id_fkey(
          id,
          username,
          avatar_url,
          level
        )
      `)
      .eq('friend_id', userId)
      .eq('status', 'pending');

    if (error) throw error;
    return data.map(request => ({
      id: request.id,
      sender: request.profiles,
      created_at: request.created_at
    }));
  },

  async sendFriendRequest(userId, friendId) {
    const { data, error } = await supabase
      .from('friends')
      .insert([{ 
        user_id: userId, 
        friend_id: friendId, 
        status: 'pending' 
      }]);

    if (error) throw error;
    return data;
  },

  async acceptFriendRequest(requestId, userId, friendId) {
    // First update the incoming request
    const { error: updateError } = await supabase
      .from('friends')
      .update({ status: 'accepted' })
      .eq('id', requestId);

    if (updateError) throw updateError;

    // Then create the reciprocal friendship record
    const { data, error } = await supabase
      .from('friends')
      .insert([{ 
        user_id: userId, 
        friend_id: friendId, 
        status: 'accepted' 
      }]);

    if (error) throw error;
    return data;
  },

  async rejectFriendRequest(requestId) {
    const { error } = await supabase
      .from('friends')
      .update({ status: 'rejected' })
      .eq('id', requestId);

    if (error) throw error;
    return true;
  },

  async removeFriend(userId, friendId) {
    // Delete both sides of the friendship
    const { error: error1 } = await supabase
      .from('friends')
      .delete()
      .eq('user_id', userId)
      .eq('friend_id', friendId);

    if (error1) throw error1;

    const { error: error2 } = await supabase
      .from('friends')
      .delete()
      .eq('user_id', friendId)
      .eq('friend_id', userId);

    if (error2) throw error2;
    return true;
  },

  async searchUsers(query) {
    if (!query || query.length < 3) return [];

    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, level')
      .ilike('username', `%${query}%`)
      .limit(10);

    if (error) throw error;
    return data;
  }
};
