
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { handleApiError } from '@/utils/errorHandler';

// Define types for our chat context
export type Message = {
  id: string;
  content: string;
  sender_id: string;
  room_id: string;
  created_at: string;
  message_type?: string;
  sender?: {
    username: string;
    avatar_url?: string;
  };
};

type ChatRoom = {
  id: string;
  name: string;
  description?: string;
  is_public: boolean;
  online_count: number;
};

type ChatContextType = {
  // Chat rooms
  rooms: ChatRoom[];
  currentRoom: ChatRoom | null;
  setCurrentRoom: (room: ChatRoom | null) => void;
  loadingRooms: boolean;
  
  // Messages
  messages: Message[];
  loadingMessages: boolean;
  sendMessage: (content: string, type?: string) => Promise<void>;
  
  // Subscriptions
  subscribeToRoom: (roomId: string) => void;
  unsubscribeFromRoom: () => void;
};

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);

  // Fetch chat rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoadingRooms(true);
        const { data, error } = await supabase
          .from('chat_rooms')
          .select('*')
          .eq('is_public', true)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setRooms(data || []);
      } catch (error) {
        handleApiError(error, { title: "Failed to load chat rooms" });
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchRooms();
  }, []);

  // Fetch messages when current room changes
  useEffect(() => {
    if (currentRoom) {
      fetchMessages(currentRoom.id);
      subscribeToRoom(currentRoom.id);
    }

    return () => {
      unsubscribeFromRoom();
    };
  }, [currentRoom]);

  const fetchMessages = async (roomId: string) => {
    if (!roomId) return;
    
    try {
      setLoadingMessages(true);
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*, profiles!chat_messages_sender_id_fkey(username, avatar_url)')
        .eq('room_id', roomId)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (error) throw error;
      
      // Transform the data to match our Message type
      const formattedMessages: Message[] = data.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        room_id: msg.room_id,
        created_at: msg.created_at,
        message_type: msg.message_type,
        sender: msg.profiles
      }));
      
      setMessages(formattedMessages || []);
    } catch (error) {
      handleApiError(error, { title: "Failed to load messages" });
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async (content: string, type: string = 'text') => {
    if (!user || !currentRoom) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{ 
          content, 
          sender_id: user.id, 
          room_id: currentRoom.id,
          message_type: type
        }]);
        
      if (error) throw error;
    } catch (error) {
      handleApiError(error, { title: "Failed to send message" });
    }
  };

  const subscribeToRoom = (roomId: string) => {
    // Unsubscribe from previous room if any
    unsubscribeFromRoom();
    
    // Subscribe to new room
    const newSubscription = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${roomId}`
      }, async (payload) => {
        console.log('New message received:', payload);
        
        // Fetch user info for the new message
        const { data: userData } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', payload.new.sender_id)
          .single();
        
        const newMessage: Message = {
          id: payload.new.id,
          content: payload.new.content,
          sender_id: payload.new.sender_id,
          room_id: payload.new.room_id,
          created_at: payload.new.created_at,
          message_type: payload.new.message_type,
          sender: userData
        };
        
        setMessages(prev => [newMessage, ...prev]);
      })
      .subscribe();
    
    setSubscription(newSubscription);
  };

  const unsubscribeFromRoom = () => {
    if (subscription) {
      supabase.removeChannel(subscription);
      setSubscription(null);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        rooms,
        currentRoom,
        setCurrentRoom,
        loadingRooms,
        messages,
        loadingMessages,
        sendMessage,
        subscribeToRoom,
        unsubscribeFromRoom
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
