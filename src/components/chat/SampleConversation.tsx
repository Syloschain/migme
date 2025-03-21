
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import ChatMessage from "./ChatMessage";
import { useChat } from "@/contexts/ChatContext";
import { Spinner } from "@/components/ui/spinner";

const RealTimeConversation = () => {
  const { user } = useAuth();
  const { messages, loadingMessages } = useChat();
  
  if (loadingMessages) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
        <span className="ml-2 text-muted-foreground">Loading messages...</span>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <p className="text-muted-foreground text-center">No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          id={message.id}
          content={message.content}
          timestamp={new Date(message.created_at)}
          sender={{
            id: message.sender_id,
            username: message.sender?.username || "Unknown User",
            avatarUrl: message.sender?.avatar_url,
            isVIP: message.sender?.is_vip || false,
            roles: message.sender?.roles || ['user'],
          }}
          isOwnMessage={message.sender_id === user?.id}
        />
      ))}
    </div>
  );
};

export default RealTimeConversation;
