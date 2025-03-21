
import { supabase } from "@/integrations/supabase/client";

// Update credit balance function
export const updateCreditBalance = async (userId: string, amount: number) => {
  // Using a more traditional approach without RPC function
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('credit_balance')
    .eq('id', userId)
    .single();
    
  if (fetchError) throw fetchError;
  
  const newBalance = profile.credit_balance + amount;
  
  const { data, error } = await supabase
    .from('profiles')
    .update({ credit_balance: newBalance })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Check if user has enough credits
export const hasEnoughCredits = async (userId: string, amount: number) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('credit_balance')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data.credit_balance >= amount;
};

// Process a game bet with appropriate win/loss amount
export const processGameBet = async (
  userId: string, 
  gameType: string, 
  betAmount: number, 
  result: 'win' | 'lose' | 'draw'
) => {
  // Calculate the win/loss amount
  let winAmount = 0;
  
  if (result === 'win') {
    winAmount = betAmount; // You win what you bet
  } else if (result === 'lose') {
    winAmount = -betAmount; // You lose what you bet
  } else {
    winAmount = 0; // Draw, no money changes hands
  }
  
  try {
    // Record the game transaction
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        profile_id: userId,
        amount: winAmount,
        transaction_type: 'game_bet',
        description: `${gameType} game: ${result}`
      });
      
    if (transactionError) throw transactionError;
    
    // Update the credit balance
    return await updateCreditBalance(userId, winAmount);
  } catch (error) {
    console.error("Error processing game bet:", error);
    throw error;
  }
};

// Get user's credit balance
export const getCreditBalance = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('credit_balance')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data.credit_balance;
};

// Functions needed for PrivateChatContext
export const findOrCreatePrivateChat = async (userId1: string, userId2: string) => {
  // Check if a chat already exists between these two users
  const { data: existingChats, error: findError } = await supabase
    .from('private_chats')
    .select('id, participants')
    .contains('participants', [userId1, userId2]);
    
  if (findError) throw findError;
  
  // If chat exists, return it
  if (existingChats && existingChats.length > 0) {
    return existingChats[0];
  }
  
  // Create a new chat
  const { data: newChat, error: createError } = await supabase
    .from('private_chats')
    .insert({
      participants: [userId1, userId2],
    })
    .select()
    .single();
    
  if (createError) throw createError;
  
  // Create participants entries
  await supabase
    .from('private_chat_participants')
    .insert([
      { chat_id: newChat.id, profile_id: userId1 },
      { chat_id: newChat.id, profile_id: userId2 }
    ]);
    
  return newChat;
};

export const getPrivateChatPartner = async (chatId: string, userId: string) => {
  // Get all participants for this chat
  const { data: participantsData, error: participantsError } = await supabase
    .from('private_chat_participants')
    .select('profile_id')
    .eq('chat_id', chatId);
    
  if (participantsError) throw participantsError;
  
  // Find the partner (not the current user)
  const partnerId = participantsData
    .map(p => p.profile_id)
    .find(id => id !== userId);
    
  if (!partnerId) return null;
  
  // Get the partner's profile
  const { data: partnerProfile, error: profileError } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, status')
    .eq('id', partnerId)
    .single();
    
  if (profileError) throw profileError;
  
  return partnerProfile;
};
