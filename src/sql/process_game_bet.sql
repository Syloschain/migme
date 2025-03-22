
CREATE OR REPLACE FUNCTION public.process_game_bet(
  user_id UUID, 
  game_type TEXT, 
  bet_amount INTEGER, 
  result TEXT
)
RETURNS SETOF PROFILES
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  win_amount INTEGER;
  user_record RECORD;
BEGIN
  -- Calculate the win/loss amount
  IF result = 'win' THEN
    win_amount := bet_amount;
  ELSIF result = 'lose' THEN
    win_amount := -bet_amount;
  ELSE -- draw
    win_amount := 0;
  END IF;
  
  -- Record the game transaction
  INSERT INTO public.credit_transactions (
    profile_id, 
    amount, 
    transaction_type, 
    description
  ) VALUES (
    user_id, 
    win_amount, 
    'game_bet', 
    game_type || ' game: ' || result
  );
    
  -- Update the user's credit balance
  UPDATE public.profiles 
  SET 
    credit_balance = credit_balance + win_amount,
    updated_at = now()
  WHERE id = user_id
  RETURNING * INTO user_record;
  
  -- Return the updated profile
  RETURN NEXT user_record;
END;
$$;
