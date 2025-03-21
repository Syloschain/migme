
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/context/AuthContext";
import { usePresence } from "@/hooks/use-presence";
import { UserRole } from "@/utils/roleUtils";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface EnhancedChatRoomProps {
  roomId?: string;
  roomName: string;
  roomDescription?: string;
  onlineCount?: number;
}

interface MessageSender {
  id?: string;
  username: string;
  avatar_url?: string;
  avatarUrl?: string;
  is_vip?: boolean;
  roles?: UserRole[];
}

const EnhancedChatRoom = ({
  roomId,
  roomName,
  roomDescription,
  onlineCount = 0
}: EnhancedChatRoomProps) => {
  const { messages, loadingMessages, sendMessage, muteUser, kickUser, banUser } = useChat();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { onlineUsers } = usePresence(roomId);
  const [revealedMessages, setRevealedMessages] = useState<string[]>([]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (message: string, type: string = 'text', isLocked: boolean = false) => {
    if (message.trim()) {
      sendMessage(message, type, isLocked);
    }
  };

  const handleUnlockMessage = (messageId: string) => {
    setRevealedMessages(prev => [...prev, messageId]);
  };

  const isCurrentUserModerator = () => {
    if (!user) return false;
    const currentUserRoles = user.user_metadata?.roles as UserRole[] || [];
    return currentUserRoles.some(role => ['admin', 'moderator', 'owner'].includes(role));
  };

  const handleModeration = (action: 'mute' | 'kick' | 'ban', userId?: string) => {
    if (!userId) return;
    
    switch (action) {
      case 'mute':
        muteUser(userId);
        break;
      case 'kick':
        kickUser(userId);
        break;
      case 'ban':
        banUser(userId);
        break;
    }
  };

  return (
    <>
      <CardHeader className="border-b bg-card px-4 py-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">{roomName}</CardTitle>
            {roomDescription && (
              <p className="text-xs text-muted-foreground">{roomDescription}</p>
            )}
          </div>
          <div className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
            {onlineUsers.length || onlineCount} online
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
              <div key={message.id} className="relative">
                <ChatMessage
                  id={message.id}
                  content={
                    message.is_locked && !revealedMessages.includes(message.id) 
                    ? "🔒 This message is locked. Click to unlock." 
                    : message.content
                  }
                  timestamp={new Date(message.created_at)}
                  sender={{
                    id: message.sender_id,
                    username: message.sender?.username || "Unknown User",
                    avatarUrl: message.sender?.avatar_url,
                    isVIP: message.sender?.is_vip || false,
                    roles: message.sender?.roles as UserRole[] || ['user'],
                  }}
                  isOwnMessage={message.sender_id === user?.id}
                  isLocked={message.is_locked && !revealedMessages.includes(message.id)}
                  onUnlock={() => handleUnlockMessage(message.id)}
                />
                
                {isCurrentUserModerator() && message.sender_id !== user?.id && (
                  <div className="absolute top-0 right-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Shield className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleModeration('mute', message.sender_id)}>
                          Mute User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleModeration('kick', message.sender_id)}>
                          Kick User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleModeration('ban', message.sender_id)}>
                          Ban User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No messages yet</p>
              <p className="text-sm mt-2">Be the first to say something!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </CardContent>
    </>
  );
};

export default EnhancedChatRoom;
