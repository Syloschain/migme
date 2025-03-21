
// Importing types
import { supabase } from "@/integrations/supabase/client";
import { ChatPartner } from "@/contexts/PrivateChatContext";

// Find or create a private chat between two users
export const findOrCreatePrivateChat = async (userOneId: string, userTwoId: string) => {
  // First, look for existing chats that include both users
  const { data: existingChats, error: fetchError } = await supabase
    .from("private_chat_participants")
    .select("chat_id")
    .eq("profile_id", userOneId);
  
  if (fetchError) throw fetchError;
  
  if (existingChats.length > 0) {
    const chatIds = existingChats.map(chat => chat.chat_id);
    
    const { data: matches, error: matchError } = await supabase
      .from("private_chat_participants")
      .select("chat_id")
      .eq("profile_id", userTwoId)
      .in("chat_id", chatIds);
    
    if (matchError) throw matchError;
    
    // If a chat exists between these users, return it
    if (matches && matches.length > 0) {
      const { data: existingChat, error: chatError } = await supabase
        .from("private_chats")
        .select("*")
        .eq("id", matches[0].chat_id)
        .single();
      
      if (chatError) throw chatError;
      return existingChat;
    }
  }
  
  // No existing chat found, create a new one
  const { data: newChat, error: createError } = await supabase
    .from("private_chats")
    .insert({})
    .select()
    .single();
  
  if (createError) throw createError;
  
  // Add both users to the chat
  const participantsToInsert = [
    { chat_id: newChat.id, profile_id: userOneId },
    { chat_id: newChat.id, profile_id: userTwoId }
  ];
  
  const { error: participantsError } = await supabase
    .from("private_chat_participants")
    .insert(participantsToInsert);
  
  if (participantsError) throw participantsError;
  
  return newChat;
};

// Get the other participant in a private chat
export const getPrivateChatPartner = async (chatId: string, currentUserId: string): Promise<ChatPartner | null> => {
  // Get all participants in the chat
  const { data: participants, error: participantsError } = await supabase
    .from("private_chat_participants")
    .select("profile_id")
    .eq("chat_id", chatId);
  
  if (participantsError) throw participantsError;
  
  // Find the participant who is not the current user
  const partnerIds = participants
    .filter(participant => participant.profile_id !== currentUserId)
    .map(participant => participant.profile_id);
  
  if (partnerIds.length === 0) return null;
  
  // Get the partner's profile information
  const { data: partner, error: profileError } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, status")
    .eq("id", partnerIds[0])
    .single();
  
  if (profileError) throw profileError;
  
  return partner as ChatPartner;
};

// Update or create user profile
export const updateUserProfile = async (userId: string, updates: {
  username?: string;
  avatar_url?: string;
  bio?: string;
  status?: string;
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  
  if (error) throw error;
  return data;
};

// Get user profile by ID
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

// Get multiple user profiles by IDs
export const getUserProfiles = async (userIds: string[]) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .in('id', userIds);
  
  if (error) throw error;
  return data;
};
