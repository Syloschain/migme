// ApiClient.js
import { supabase } from "@/integrations/supabase/client";

export const ApiClient = {
  // Auth operations
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

    // The profile will be created automatically via the database trigger
    // But we need to ensure the username is set correctly
    if (authData.user) {
      try {
        await supabase
          .from('profiles')
          .update({ username })
          .eq('id', authData.user.id);
      } catch (error) {
        console.error("Error updating username:", error);
        // We don't throw here since the auth user is already created
      }
    }

    return authData;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
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

  // User session
  getCurrentUser() {
    return supabase.auth.getUser();
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
  },

  // Transfer credits from a merchant to a customer
  async transferCredits(senderId, receiverId, amount, note) {
    // First, check that the sender is a merchant
    const { data: senderData, error: senderError } = await supabase
      .from('profiles')
      .select('is_merchant, credit_balance')
      .eq('id', senderId)
      .single();
    
    if (senderError) throw senderError;
    if (!senderData.is_merchant) throw new Error("Only merchants can transfer credits");
    if (senderData.credit_balance < amount) throw new Error("Insufficient credits");
    
    // Add a credit transaction for the receiver
    const { data, error } = await supabase
      .from('credit_transactions')
      .insert({
        profile_id: receiverId,
        amount: amount,
        transaction_type: 'merchant_transfer',
        description: note || 'Credit transfer from merchant',
        reference_id: senderId
      });
    
    if (error) throw error;
    
    // Remove credits from the sender
    const { error: deductError } = await supabase
      .from('credit_transactions')
      .insert({
        profile_id: senderId,
        amount: -amount,
        transaction_type: 'merchant_transfer_deduction',
        description: `Transfer to user ID: ${receiverId}`,
        reference_id: receiverId
      });
    
    if (deductError) throw deductError;
    
    // Record the merchant relationship
    const { error: relationError } = await supabase
      .from('merchant_transactions')
      .insert({
        merchant_id: senderId,
        customer_id: receiverId,
        amount: amount,
        commission: Math.floor(amount * 0.1), // 10% commission
        status: 'completed'
      });
    
    if (relationError) throw relationError;
    
    return data;
  },

  // Get credit transaction history for a user
  async getCreditTransactions(userId, limit = 20) {
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('profile_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }
};
