
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { handleApiError } from '@/utils/errorHandler';
import { findOrCreatePrivateChat } from '@/utils/supabaseHelpers';

// Define types for our private chat context
export type PrivateMessage = {
  id: string;
  content: string;
  sender_id: string;
  chat_id: string;
  created_at: string;
  message_type?: string;
  is_read?: boolean;
  sender?: {
    username: string;
    avatar_url?: string;
  };
};

type ChatPartner = {
  id: string;
  username: string;
  avatar_url?: string;
  status?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count?: number;
};

type PrivateChatContextType = {
  chatPartners: ChatPartner[];
  loadingChatPartners: boolean;
  currentChat: {
    id: string;
    partner: ChatPartner | null;
  } | null;
  messages: PrivateMessage[];
  loadingMessages: boolean;
  sendMessage: (content: string, type?: string) => Promise<void>;
  startChat: (userId: string) => Promise<void>;
  setCurrentChat: (chatId: string | null) => void;
};

// Create the context
const PrivateChatContext = createContext<PrivateChatContextType | undefined>(undefined);

// Provider component
export const PrivateChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [chatPartners, setChatPartners] = useState<ChatPartner[]>([]);
  const [loadingChatPartners, setLoadingChatPartners] = useState(true);
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [currentChat, setCurrentChatState] = useState<{
    id: string;
    partner: ChatPartner | null;
  } | null>(null);
  const [subscription, setSubscription] = useState<any>(null);

  // Fetch chat partners
  useEffect(() => {
    if (!user) return;
    
    const fetchChatPartners = async () => {
      try {
        setLoadingChatPartners(true);
        
        // Get all chats the user is part of
        const { data: chats, error: chatsError } = await supabase
          .from('private_chats')
          .select('*, user_one:profiles!private_chats_user_one_fkey(id, username, avatar_url, status), user_two:profiles!private_chats_user_two_fkey(id, username, avatar_url, status)')
          .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);
        
        if (chatsError) throw chatsError;
        
        if (!chats) {
          setChatPartners([]);
          return;
        }
        
        // For each chat, determine who the partner is
        const partners = chats.map(chat => {
          const partner = chat.user_one.id === user.id ? chat.user_two : chat.user_one;
          return {
            id: partner.id,
            username: partner.username,
            avatar_url: partner.avatar_url,
            status: partner.status,
            chatId: chat.id,
            // We'll fetch these later or through another query if needed
            last_message: "",
            last_message_time: chat.updated_at,
            unread_count: 0
          };
        });
        
        setChatPartners(partners);
      } catch (error) {
        handleApiError(error, { title: "Failed to load chat partners" });
      } finally {
        setLoadingChatPartners(false);
      }
    };

    fetchChatPartners();
  }, [user]);

  // Fetch messages when current chat changes
  useEffect(() => {
    if (!currentChat) return;
    
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const { data, error } = await supabase
          .from('private_messages')
          .select('*, profiles!private_messages_sender_id_fkey(username, avatar_url)')
          .eq('chat_id', currentChat.id)
          .order('created_at', { ascending: false })
          .limit(50);
        
        if (error) throw error;
        
        // Transform the data to match our PrivateMessage type
        const formattedMessages: PrivateMessage[] = data.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender_id: msg.sender_id,
          chat_id: msg.chat_id,
          created_at: msg.created_at,
          message_type: msg.message_type,
          is_read: msg.is_read,
          sender: msg.profiles
        }));
        
        setMessages(formattedMessages || []);
      } catch (error) {
        handleApiError(error, { title: "Failed to load messages" });
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
    setupSubscription(currentChat.id);

    return () => {
      unsubscribe();
    };
  }, [currentChat]);

  const setupSubscription = (chatId: string) => {
    unsubscribe();
    
    const newSubscription = supabase
      .channel(`private-chat:${chatId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'private_messages',
        filter: `chat_id=eq.${chatId}`
      }, async (payload) => {
        console.log('New private message received:', payload);
        
        // Fetch user info for the new message
        const { data: userData } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', payload.new.sender_id)
          .single();
        
        const newMessage: PrivateMessage = {
          id: payload.new.id,
          content: payload.new.content,
          sender_id: payload.new.sender_id,
          chat_id: payload.new.chat_id,
          created_at: payload.new.created_at,
          message_type: payload.new.message_type,
          is_read: payload.new.is_read,
          sender: userData
        };
        
        setMessages(prev => [newMessage, ...prev]);
      })
      .subscribe();
    
    setSubscription(newSubscription);
  };

  const unsubscribe = () => {
    if (subscription) {
      supabase.removeChannel(subscription);
      setSubscription(null);
    }
  };

  const sendMessage = async (content: string, type: string = 'text') => {
    if (!user || !currentChat) return;

    try {
      const { error } = await supabase
        .from('private_messages')
        .insert([{ 
          content, 
          sender_id: user.id, 
          chat_id: currentChat.id,
          message_type: type
        }]);
        
      if (error) throw error;
      
      // Update the chat's updated_at timestamp
      await supabase
        .from('private_chats')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentChat.id);
      
    } catch (error) {
      handleApiError(error, { title: "Failed to send message" });
    }
  };

  const startChat = async (partnerUserId: string) => {
    if (!user) return;
    
    try {
      const chat = await findOrCreatePrivateChat(user.id, partnerUserId);
      
      // Find the partner info
      const { data: partnerData, error: partnerError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, status')
        .eq('id', partnerUserId)
        .single();
      
      if (partnerError) throw partnerError;
      
      const partner: ChatPartner = {
        id: partnerData.id,
        username: partnerData.username,
        avatar_url: partnerData.avatar_url,
        status: partnerData.status
      };
      
      setCurrentChatState({
        id: chat.id,
        partner
      });
      
      // Add partner to the list if not already there
      setChatPartners(prev => {
        if (!prev.find(p => p.id === partner.id)) {
          return [...prev, { ...partner, chatId: chat.id }];
        }
        return prev;
      });
    } catch (error) {
      handleApiError(error, { title: "Failed to start chat" });
    }
  };

  const setCurrentChat = (chatId: string | null) => {
    if (!chatId) {
      setCurrentChatState(null);
      return;
    }
    
    const partner = chatPartners.find(p => p.chatId === chatId);
    if (partner) {
      setCurrentChatState({
        id: chatId,
        partner: {
          id: partner.id,
          username: partner.username,
          avatar_url: partner.avatar_url,
          status: partner.status
        }
      });
    }
  };

  return (
    <PrivateChatContext.Provider
      value={{
        chatPartners,
        loadingChatPartners,
        currentChat,
        messages,
        loadingMessages,
        sendMessage,
        startChat,
        setCurrentChat
      }}
    >
      {children}
    </PrivateChatContext.Provider>
  );
};

// Custom hook to use the private chat context
export const usePrivateChat = () => {
  const context = useContext(PrivateChatContext);
  if (context === undefined) {
    throw new Error('usePrivateChat must be used within a PrivateChatProvider');
  }
  return context;
};
