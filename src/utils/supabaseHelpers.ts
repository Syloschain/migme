
/**
 * Utility functions for working with Supabase
 */

import { supabase } from "@/integrations/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Enable real-time notifications for a table
 * @param tableName The name of the table to enable real-time for
 */
export const enableRealtimeForTable = async (tableName: string) => {
  try {
    // Set replica identity to full to ensure we get complete rows in change events
    const { error: replicaError } = await supabase.rpc('set_replica_identity', { 
      table: tableName, 
      value: 'full' 
    } as any); // Using type assertion to bypass TypeScript's strict checking
    if (replicaError) throw replicaError;
    
    // Add the table to the realtime publication
    const { error: pubError } = await supabase.rpc('add_table_to_publication', { 
      table: tableName 
    } as any); // Using type assertion to bypass TypeScript's strict checking
    if (pubError) throw pubError;
    
    console.log(`Realtime enabled for table: ${tableName}`);
    return true;
  } catch (error) {
    console.error(`Failed to enable realtime for table ${tableName}:`, error);
    return false;
  }
};

/**
 * Checks if the current user has access to a specific resource
 * @param tableName The table to check permissions for
 * @param id The ID of the resource to check
 */
export const checkResourceAccess = async (tableName: string, id: string) => {
  try {
    // Use type assertion to bypass TypeScript's strict type checking for dynamic table access
    const { data, error, count } = await supabase
      .from(tableName as any)
      .select('*', { count: 'exact' })
      .eq('id', id)
      .limit(1);
      
    if (error) throw error;
    
    return count && count > 0;
  } catch (error) {
    console.error(`Failed to check access for ${tableName} ${id}:`, error);
    return false;
  }
};

/**
 * Find an existing private chat between two users
 * @param currentUserId The current user's ID
 * @param otherUserId The other user's ID
 */
export const findPrivateChat = async (currentUserId: string, otherUserId: string) => {
  try {
    // Find chats where both users are participants
    const { data: participantsData, error: participantsError } = await supabase
      .from('private_chat_participants')
      .select('chat_id')
      .eq('profile_id', currentUserId);
    
    if (participantsError) throw participantsError;
    
    if (!participantsData || participantsData.length === 0) {
      return null;
    }
    
    const chatIds = participantsData.map(p => p.chat_id);
    
    // Check if the other user is also a participant in any of these chats
    const { data: matchData, error: matchError } = await supabase
      .from('private_chat_participants')
      .select('chat_id')
      .eq('profile_id', otherUserId)
      .in('chat_id', chatIds);
    
    if (matchError) throw matchError;
    
    if (!matchData || matchData.length === 0) {
      return null;
    }
    
    // Return the first matching chat
    const { data: chatData, error: chatError } = await supabase
      .from('private_chats')
      .select('*')
      .eq('id', matchData[0].chat_id)
      .single();
    
    if (chatError) throw chatError;
    
    return chatData;
  } catch (error) {
    console.error('Failed to find private chat:', error);
    return null;
  }
};

/**
 * Create a new private chat between two users
 * @param currentUserId The current user's ID
 * @param otherUserId The other user's ID
 */
export const createPrivateChat = async (currentUserId: string, otherUserId: string) => {
  try {
    // Create a new chat
    const { data: chatData, error: chatError } = await supabase
      .from('private_chats')
      .insert({})
      .select()
      .single();
    
    if (chatError) throw chatError;
    
    // Add participants
    const participants = [
      { chat_id: chatData.id, profile_id: currentUserId },
      { chat_id: chatData.id, profile_id: otherUserId }
    ];
    
    const { error: participantsError } = await supabase
      .from('private_chat_participants')
      .insert(participants);
    
    if (participantsError) throw participantsError;
    
    return chatData;
  } catch (error) {
    console.error('Failed to create private chat:', error);
    throw error;
  }
};

/**
 * Find or create a private chat between two users
 * @param currentUserId The current user's ID
 * @param otherUserId The other user's ID
 */
export const findOrCreatePrivateChat = async (currentUserId: string, otherUserId: string) => {
  try {
    // First try to find existing chat
    const existingChat = await findPrivateChat(currentUserId, otherUserId);
    
    if (existingChat) {
      return existingChat;
    }
    
    // Create new chat if none exists
    return await createPrivateChat(currentUserId, otherUserId);
  } catch (error) {
    console.error('Failed to find or create private chat:', error);
    throw error;
  }
};

/**
 * Get the other participant in a private chat
 * @param chatId The chat ID
 * @param currentUserId The current user's ID
 */
export const getPrivateChatPartner = async (chatId: string, currentUserId: string) => {
  try {
    // Get all participants for this chat
    const { data, error } = await supabase
      .from('private_chat_participants')
      .select(`
        profiles:profile_id(
          id, 
          username, 
          avatar_url, 
          status
        )
      `)
      .eq('chat_id', chatId);
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return null;
    }
    
    // Filter out the current user to find the partner
    const partner = data.find(p => p.profiles.id !== currentUserId);
    
    return partner ? partner.profiles : null;
  } catch (error) {
    console.error('Failed to get chat partner:', error);
    return null;
  }
};
