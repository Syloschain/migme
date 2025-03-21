
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
