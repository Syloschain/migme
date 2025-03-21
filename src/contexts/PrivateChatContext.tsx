
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { findOrCreatePrivateChat, getPrivateChatPartner } from "@/utils/supabaseHelpers";
import { useToast } from "@/hooks/use-toast";

export interface ChatPartner {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
}

interface PrivateMessage {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender?: {
    username: string;
    avatar_url?: string;
  };
}

interface PrivateChatContextType {
  chatPartners: ChatPartner[] | null;
  loadingPartners: boolean;
  activeChats: string[];
  startChat: (profileId: string) => Promise<string>;
  getChatPartner: (chatId: string) => Promise<ChatPartner | null>;
  messages: PrivateMessage[];
  loadingMessages: boolean;
  sendMessage: (message: string, type?: string) => void;
  currentChat: { id: string; partner?: ChatPartner } | null;
  setCurrentChat: (chatId: string | null) => void;
}

const PrivateChatContext = createContext<PrivateChatContextType>({
  chatPartners: null,
  loadingPartners: true,
  activeChats: [],
  startChat: async () => "",
  getChatPartner: async () => null,
  messages: [],
  loadingMessages: true,
  sendMessage: () => {},
  currentChat: null,
  setCurrentChat: () => {},
});

export const usePrivateChat = () => useContext(PrivateChatContext);

export const PrivateChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [chatPartners, setChatPartners] = useState<ChatPartner[] | null>(null);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [currentChat, setCurrentChatState] = useState<{ id: string; partner?: ChatPartner } | null>(null);

  // Fetch all possible chat partners (all users except current user)
  useEffect(() => {
    if (user) {
      const fetchChatPartners = async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("id, username, avatar_url, status")
            .neq("id", user.id);

          if (error) throw error;
          setChatPartners(data as ChatPartner[]);
        } catch (error) {
          console.error("Error fetching chat partners:", error);
          toast({
            title: "Error",
            description: "Failed to load contacts. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setLoadingPartners(false);
        }
      };

      fetchChatPartners();
    }
  }, [user, toast]);

  // Fetch active chats for the current user
  useEffect(() => {
    if (user) {
      const fetchActiveChats = async () => {
        try {
          const { data, error } = await supabase
            .from("private_chat_participants")
            .select("chat_id")
            .eq("profile_id", user.id);

          if (error) throw error;
          setActiveChats(data.map((item) => item.chat_id));
        } catch (error) {
          console.error("Error fetching active chats:", error);
        }
      };

      fetchActiveChats();

      // Set up realtime subscription for new chats
      const subscription = supabase
        .channel("private-chat-changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "private_chat_participants",
            filter: `profile_id=eq.${user.id}`,
          },
          (payload) => {
            setActiveChats((prev) => [...prev, payload.new.chat_id]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [user]);

  // Fetch messages for current chat
  useEffect(() => {
    if (!currentChat || !user) return;

    setLoadingMessages(true);
    setMessages([]);

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("private_messages")
          .select(`
            id, 
            content, 
            sender_id, 
            created_at, 
            sender:profiles(username, avatar_url)
          `)
          .eq("chat_id", currentChat.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMessages(data as PrivateMessage[]);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error",
          description: "Failed to load messages. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();

    // Set up realtime subscription for new messages
    const subscription = supabase
      .channel(`private-messages-${currentChat.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "private_messages",
          filter: `chat_id=eq.${currentChat.id}`,
        },
        async (payload) => {
          // Fetch the sender info for the new message
          const { data: senderData } = await supabase
            .from("profiles")
            .select("username, avatar_url")
            .eq("id", payload.new.sender_id)
            .single();

          const newMessage = {
            ...payload.new,
            sender: senderData
          } as PrivateMessage;

          setMessages((prev) => [newMessage, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentChat, user, toast]);

  // Set current chat and fetch partner info
  const setCurrentChat = async (chatId: string | null) => {
    if (!chatId) {
      setCurrentChatState(null);
      return;
    }

    setCurrentChatState({ id: chatId });

    if (user) {
      try {
        const partner = await getPrivateChatPartner(chatId, user.id);
        if (partner) {
          setCurrentChatState({ id: chatId, partner });
        }
      } catch (error) {
        console.error("Error getting chat partner:", error);
      }
    }
  };

  // Send a message in the current chat
  const sendMessage = async (message: string, type: string = 'text') => {
    if (!currentChat || !user) return;

    try {
      const { error } = await supabase.from("private_messages").insert({
        chat_id: currentChat.id,
        sender_id: user.id,
        content: message,
        message_type: type,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Start or find an existing chat with a user
  const startChat = async (profileId: string): Promise<string> => {
    if (!user) {
      throw new Error("You must be logged in to start a chat");
    }

    try {
      const chat = await findOrCreatePrivateChat(user.id, profileId);
      return chat.id;
    } catch (error) {
      console.error("Error starting chat:", error);
      toast({
        title: "Error",
        description: "Failed to start chat. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Get the other participant in a chat
  const getChatPartner = async (chatId: string): Promise<ChatPartner | null> => {
    if (!user) return null;

    try {
      const partner = await getPrivateChatPartner(chatId, user.id);
      return partner;
    } catch (error) {
      console.error("Error getting chat partner:", error);
      return null;
    }
  };

  return (
    <PrivateChatContext.Provider
      value={{
        chatPartners,
        loadingPartners,
        activeChats,
        startChat,
        getChatPartner,
        messages,
        loadingMessages,
        sendMessage,
        currentChat,
        setCurrentChat,
      }}
    >
      {children}
    </PrivateChatContext.Provider>
  );
};
