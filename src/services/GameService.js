
// GameService.js
import { supabase } from "@/integrations/supabase/client";

export const GameService = {
  async getAvailableGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*');

    if (error) throw error;
    return data;
  },

  async getFreeGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('game_type', 'free');

    if (error) throw error;
    return data;
  },

  async getPaidGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('game_type', 'paid');

    if (error) throw error;
    return data;
  },

  async getGameDetails(gameId) {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single();

    if (error) throw error;
    return data;
  },

  async createGameSession(gameId, creatorId) {
    const { data, error } = await supabase
      .from('game_sessions')
      .insert([{
        game_id: gameId
      }])
      .select()
      .single();

    if (error) throw error;

    // Add creator as first participant
    await this.joinGameSession(data.id, creatorId);

    return data;
  },

  async joinGameSession(sessionId, profileId) {
    // Check if game session exists and is active
    const { data: sessionData, error: sessionError } = await supabase
      .from('game_sessions')
      .select('status, game_id')
      .eq('id', sessionId)
      .single();

    if (sessionError) throw sessionError;
    if (sessionData.status !== 'active') throw new Error('This game session is no longer active');

    // Check if user has enough credits if it's a paid game
    const { data: gameData, error: gameError } = await supabase
      .from('games')
      .select('min_credits, game_type')
      .eq('id', sessionData.game_id)
      .single();

    if (gameError) throw gameError;

    if (gameData.game_type === 'paid' && gameData.min_credits > 0) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('credit_balance')
        .eq('id', profileId)
        .single();

      if (profileError) throw profileError;
      if (profileData.credit_balance < gameData.min_credits) {
        throw new Error(`You need at least ${gameData.min_credits} credits to join this game`);
      }

      // Deduct credits if needed
      await supabase
        .from('profiles')
        .update({
          credit_balance: profileData.credit_balance - gameData.min_credits
        })
        .eq('id', profileId);

      // Record transaction
      await supabase
        .from('credit_transactions')
        .insert([{
          profile_id: profileId,
          amount: -gameData.min_credits,
          transaction_type: 'game_entry',
          reference_id: sessionId,
          description: `Entry fee for game session`
        }]);
    }

    // Add participant
    const { data, error } = await supabase
      .from('game_participants')
      .insert([{
        session_id: sessionId,
        profile_id: profileId
      }]);

    if (error) throw error;
    return data;
  },

  async getActiveGameSessions(gameId) {
    const { data, error } = await supabase
      .from('game_sessions')
      .select(`
        *,
        game_participants(
          profiles(username, avatar_url)
        )
      `)
      .eq('game_id', gameId)
      .eq('status', 'active');

    if (error) throw error;
    return data;
  },

  async updateGameScore(sessionId, profileId, score) {
    const { data, error } = await supabase
      .from('game_participants')
      .update({ score })
      .eq('session_id', sessionId)
      .eq('profile_id', profileId);

    if (error) throw error;
    return data;
  },

  async endGameSession(sessionId, winnerId = null) {
    // Update session status
    const { error: sessionError } = await supabase
      .from('game_sessions')
      .update({
        status: 'completed',
        ended_at: new Date()
      })
      .eq('id', sessionId);

    if (sessionError) throw sessionError;

    // If there's a winner and it's a paid game, distribute rewards
    if (winnerId) {
      // Get participants and their scores
      const { data: participants, error: participantsError } = await supabase
        .from('game_participants')
        .select('profile_id, score')
        .eq('session_id', sessionId);

      if (participantsError) throw participantsError;

      // Get game details to check if it's paid
      const { data: sessionData, error: sessionDataError } = await supabase
        .from('game_sessions')
        .select('game_id')
        .eq('id', sessionId)
        .single();

      if (sessionDataError) throw sessionDataError;

      const { data: gameData, error: gameError } = await supabase
        .from('games')
        .select('game_type, min_credits')
        .eq('id', sessionData.game_id)
        .single();

      if (gameError) throw gameError;

      // If it's a paid game, calculate and distribute winnings
      if (gameData.game_type === 'paid' && gameData.min_credits > 0) {
        const totalPot = participants.length * gameData.min_credits;
        const winnerShare = Math.floor(totalPot * 0.9); // 10% platform fee

        // Award winner
        const { data: winnerData, error: winnerError } = await supabase
          .from('profiles')
          .select('credit_balance')
          .eq('id', winnerId)
          .single();

        if (!winnerError) {
          await supabase
            .from('profiles')
            .update({
              credit_balance: winnerData.credit_balance + winnerShare
            })
            .eq('id', winnerId);

          // Record win transaction
          await supabase
            .from('credit_transactions')
            .insert([{
              profile_id: winnerId,
              amount: winnerShare,
              transaction_type: 'game_win',
              reference_id: sessionId,
              description: `Game winnings`
            }]);
        }
      }
    }

    return true;
  }
};
