
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

interface PrivateChatContextType {
  chatPartners: ChatPartner[] | null;
  loadingPartners: boolean;
  activeChats: string[];
  startChat: (profileId: string) => Promise<string>;
  getChatPartner: (chatId: string) => Promise<ChatPartner | null>;
}

const PrivateChatContext = createContext<PrivateChatContextType>({
  chatPartners: null,
  loadingPartners: true,
  activeChats: [],
  startChat: async () => "",
  getChatPartner: async () => null,
});

export const usePrivateChat = () => useContext(PrivateChatContext);

export const PrivateChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [chatPartners, setChatPartners] = useState<ChatPartner[] | null>(null);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [activeChats, setActiveChats] = useState<string[]>([]);

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
      }}
    >
      {children}
    </PrivateChatContext.Provider>
  );
};
