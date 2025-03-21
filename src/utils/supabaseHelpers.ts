
/**
 * Utility functions for working with Supabase
 */

import { supabase } from "@/integrations/supabase/client";

/**
 * Enable real-time notifications for a table
 * @param tableName The name of the table to enable real-time for
 */
export const enableRealtimeForTable = async (tableName: string) => {
  try {
    // Set replica identity to full to ensure we get complete rows in change events
    await supabase.rpc('set_replica_identity', { table: tableName, value: 'full' });
    
    // Add the table to the realtime publication
    await supabase.rpc('add_table_to_publication', { table: tableName });
    
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
    const { data, error, count } = await supabase
      .from(tableName)
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
