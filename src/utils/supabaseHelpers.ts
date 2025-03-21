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
 * Find or create a private chat between two users
 * @param currentUserId The current user's ID
 * @param otherUserId The other user's ID
 */
export const findOrCreatePrivateChat = async (currentUserId: string, otherUserId: string) => {
  try {
    // First check if a chat already exists
    const { data: existingChat, error: fetchError } = await supabase
      .from('private_chats')
      .select('*')
      .or(`user_one.eq.${currentUserId},user_two.eq.${currentUserId}`)
      .or(`user_one.eq.${otherUserId},user_two.eq.${otherUserId}`)
      .limit(1);
    
    if (fetchError) throw fetchError;
    
    // If a chat exists, return it
    if (existingChat && existingChat.length > 0) {
      return existingChat[0];
    }
    
    // Otherwise, create a new chat
    const { data: newChat, error: insertError } = await supabase
      .from('private_chats')
      .insert({
        user_one: currentUserId,
        user_two: otherUserId
      })
      .select()
      .single();
    
    if (insertError) throw insertError;
    return newChat;
  } catch (error) {
    console.error('Failed to find or create private chat:', error);
    throw error;
  }
};
