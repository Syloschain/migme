
// GiftService.js
import { supabase } from "@/integrations/supabase/client";

export const GiftService = {
  async getAvailableGifts() {
    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .order('price', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getPremiumGifts() {
    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .eq('is_premium', true)
      .order('price', { ascending: true });

    if (error) throw error;
    return data;
  },

  async sendGift(senderId, receiverId, giftId, message, isPublic = false) {
    // First get the gift price
    const { data: giftData, error: giftError } = await supabase
      .from('gifts')
      .select('price')
      .eq('id', giftId)
      .single();

    if (giftError) throw giftError;

    // Get sender's balance
    const { data: senderData, error: senderError } = await supabase
      .from('profiles')
      .select('credit_balance')
      .eq('id', senderId)
      .single();

    if (senderError) throw senderError;

    // Check if sender has enough credits
    if (senderData.credit_balance < giftData.price) {
      throw new Error('Insufficient credits to send this gift');
    }

    // Begin transaction: create gift transaction
    const { data: giftTxData, error: giftTxError } = await supabase
      .from('gift_transactions')
      .insert([{
        sender_id: senderId,
        receiver_id: receiverId,
        gift_id: giftId,
        message,
        is_public: isPublic
      }])
      .select()
      .single();

    if (giftTxError) throw giftTxError;

    // Record credit transaction for the sender
    const { error: creditTxError } = await supabase
      .from('credit_transactions')
      .insert([{
        profile_id: senderId,
        amount: -giftData.price,
        transaction_type: 'gift_sent',
        reference_id: giftTxData.id,
        description: `Gift sent to user`
      }]);

    if (creditTxError) throw creditTxError;

    // Update sender's balance
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        credit_balance: senderData.credit_balance - giftData.price
      })
      .eq('id', senderId);

    if (updateError) throw updateError;

    // Record credit transaction for the receiver (they might get a small amount of credits for receiving gifts)
    const receiverCredits = Math.floor(giftData.price * 0.1); // 10% as reward
    if (receiverCredits > 0) {
      const { error: receiverTxError } = await supabase
        .from('credit_transactions')
        .insert([{
          profile_id: receiverId,
          amount: receiverCredits,
          transaction_type: 'gift_received',
          reference_id: giftTxData.id,
          description: `Gift received from user`
        }]);

      if (receiverTxError) throw receiverTxError;

      // Update receiver's balance
      const { data: receiverData, error: receiverError } = await supabase
        .from('profiles')
        .select('credit_balance')
        .eq('id', receiverId)
        .single();

      if (!receiverError) {
        await supabase
          .from('profiles')
          .update({
            credit_balance: receiverData.credit_balance + receiverCredits
          })
          .eq('id', receiverId);
      }
    }

    return giftTxData;
  },

  async getReceivedGifts(userId, limit = 10) {
    const { data, error } = await supabase
      .from('gift_transactions')
      .select(`
        *,
        gifts(*),
        profiles!gift_transactions_sender_id_fkey(username, avatar_url)
      `)
      .eq('receiver_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getSentGifts(userId, limit = 10) {
    const { data, error } = await supabase
      .from('gift_transactions')
      .select(`
        *,
        gifts(*),
        profiles!gift_transactions_receiver_id_fkey(username, avatar_url)
      `)
      .eq('sender_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }
};
