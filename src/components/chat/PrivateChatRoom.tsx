import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import { usePrivateChat } from "@/contexts/PrivateChatContext";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/utils/roleUtils";

interface PrivateChatRoomProps {
  chatId: string;
  userName: string;
  status?: string;
  avatarUrl?: string;
}

interface MessageSender {
  id?: string;
  username: string;
  avatar_url?: string;
  avatarUrl?: string;
  is_vip?: boolean;
  roles?: UserRole[];
}

const PrivateChatRoom = ({
  chatId,
  userName,
  status = "offline",
  avatarUrl
}: PrivateChatRoomProps) => {
  const { messages, loadingMessages, sendMessage, setCurrentChat } = usePrivateChat();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentChat(chatId);
    return () => setCurrentChat(null);
  }, [chatId, setCurrentChat]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (message: string, type: string = 'text') => {
    if (message.trim()) {
      sendMessage(message, type);
    }
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  return (
    <>
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-migblue text-white">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <span 
                className={`absolute bottom-0 right-0 w-3 h-3 ${
                  statusColors[status as keyof typeof statusColors] || statusColors.offline
                } rounded-full border-2 border-white`}
              />
            </div>
            <div>
              <CardTitle className="text-lg font-medium">{userName}</CardTitle>
              <div className="text-xs text-muted-foreground capitalize">{status}</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-[calc(80vh-230px)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loadingMessages ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-start gap-3 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-16 w-[200px] sm:w-[350px]" />
                  </div>
                </div>
              ))
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                id={message.id}
                content={message.content}
                timestamp={new Date(message.created_at)}
                sender={{
                  id: message.sender_id,
                  username: message.sender?.username || "Unknown User",
                  avatarUrl: message.sender?.avatar_url,
                  roles: message.sender?.roles || ['user'],
                  isVIP: message.sender?.is_vip || false,
                }}
                isOwnMessage={message.sender_id === user?.id}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No messages yet</p>
              <p className="text-sm mt-2">Start a conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </CardContent>
    </>
  );
};

export default PrivateChatRoom;
