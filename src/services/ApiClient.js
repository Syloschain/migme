
// ApiClient.js
import { supabase } from "@/integrations/supabase/client";

export const ApiClient = {
  // Chat message operations
  async sendChatMessage({ roomId, userId, message }) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{ room_id: roomId, sender_id: userId, content: message }]);

    if (error) throw error;
    return data;
  },

  async fetchChatMessages(roomId, limit = 50) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*, profiles(username, avatar_url)')
      .eq('room_id', roomId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Chat rooms operations
  async fetchPublicChatRooms() {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createChatRoom({ name, description, userId, isPublic = true }) {
    const { data, error } = await supabase
      .from('chat_rooms')
      .insert([{ 
        name, 
        description, 
        owner_id: userId,
        is_public: isPublic
      }]);

    if (error) throw error;
    return data;
  },

  // User authentication
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signUp(email, password, username) {
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          username
        }
      }
    });

    if (authError) throw authError;
    return authData;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // User session
  getCurrentUser() {
    return supabase.auth.getUser();
  },

  getSession() {
    return supabase.auth.getSession();
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },

  // Profile operations
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;
    return data;
  },

  // Friends operations
  async getFriends(userId) {
    const { data, error } = await supabase
      .from('friends')
      .select('*, profiles!friends_friend_id_fkey(username, avatar_url, status)')
      .eq('user_id', userId)
      .eq('status', 'accepted');

    if (error) throw error;
    return data;
  },

  async sendFriendRequest(userId, friendId) {
    const { data, error } = await supabase
      .from('friends')
      .insert([{ user_id: userId, friend_id: friendId, status: 'pending' }]);

    if (error) throw error;
    return data;
  },

  // Credits operations
  async getCredits(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('credit_balance')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data.credit_balance;
  },

  async addCreditTransaction(profileId, amount, type, description, referenceId = null) {
    const { data, error } = await supabase
      .from('credit_transactions')
      .insert([{ 
        profile_id: profileId, 
        amount, 
        transaction_type: type,
        description,
        reference_id: referenceId
      }]);

    if (error) throw error;
    return data;
  },

  // Gifts operations
  async getGifts() {
    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .order('price', { ascending: true });

    if (error) throw error;
    return data;
  },

  async sendGift(senderId, receiverId, giftId, message, isPublic = false) {
    const { data, error } = await supabase
      .from('gift_transactions')
      .insert([{ 
        sender_id: senderId, 
        receiver_id: receiverId,
        gift_id: giftId,
        message,
        is_public: isPublic
      }]);

    if (error) throw error;
    return data;
  },

  // Games operations
  async getGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*');

    if (error) throw error;
    return data;
  },

  async createGameSession(gameId) {
    const { data, error } = await supabase
      .from('game_sessions')
      .insert([{ game_id: gameId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async joinGameSession(sessionId, profileId) {
    const { data, error } = await supabase
      .from('game_participants')
      .insert([{ session_id: sessionId, profile_id: profileId }]);

    if (error) throw error;
    return data;
  }
};
