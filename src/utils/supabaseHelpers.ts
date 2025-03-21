
import { supabase } from "@/integrations/supabase/client";

// Update credit balance function
export const updateCreditBalance = async (userId: string, amount: number) => {
  const { data, error } = await supabase.rpc('update_credit_balance', {
    user_id: userId,
    amount: amount
  });
  
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
    // Use the existing Supabase RPC function
    const { error } = await supabase
      .rpc('process_game_bet', {
        p_user_id: userId,
        p_game_type: gameType,
        p_bet_amount: betAmount,
        p_result: result,
        p_win_amount: winAmount
      });
      
    if (error) throw error;
    
    // Update the credit balance directly since we may not have an RPC
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
