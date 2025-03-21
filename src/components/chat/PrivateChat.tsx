
import { useEffect, useRef, useState } from "react";
import { User, MoreHorizontal, Phone, Video } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MessageInput from "./MessageInput";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { usePrivateChat } from "@/contexts/PrivateChatContext";

interface PrivateChatProps {
  chatId: string;
  userName: string;
  status?: "online" | "offline" | "away" | "busy";
  avatarUrl?: string;
}

const PrivateChat = ({
  chatId,
  userName,
  status = "online",
  avatarUrl,
}: PrivateChatProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, loadingMessages, setCurrentChat } = usePrivateChat();

  useEffect(() => {
    if (chatId) {
      setCurrentChat(chatId);
    }
    
    // Cleanup function
    return () => setCurrentChat(null);
  }, [chatId, setCurrentChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (message: string, type: string = 'text', isLocked: boolean = false) => {
    if (message.trim() === "") return;
    sendMessage(message, type, isLocked);
  };

  const handleVoiceCall = () => {
    toast({
      title: "Voice Call",
      description: "Voice calls are coming soon!",
    });
  };

  const handleVideoCall = () => {
    toast({
      title: "Video Call",
      description: "Video calls are coming soon!",
    });
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
                  <img src={avatarUrl} alt={userName} />
                ) : (
                  <div className="bg-migblue text-white w-full h-full flex items-center justify-center">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
              </Avatar>
              <span className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[status]} rounded-full border-2 border-white`}></span>
            </div>
            <div>
              <CardTitle className="text-lg font-medium">{userName}</CardTitle>
              <div className="text-xs text-muted-foreground capitalize">{status}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleVoiceCall}
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleVideoCall}
            >
              <Video className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <span>Block User</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(80vh-190px)]">
        <ScrollArea className="flex-grow p-4">
          {loadingMessages ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin h-6 w-6 border-t-2 border-migblue rounded-full"></div>
            </div>
          ) : messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 flex ${msg.sender_id === user?.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    msg.sender_id === user?.id
                      ? "bg-migblue text-white rounded-tr-none"
                      : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
                  }`}
                >
                  {msg.content}
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No messages yet</p>
              <p className="text-sm mt-2">Start a conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
        
        <MessageInput onSendMessage={handleSendMessage} />
      </CardContent>
    </>
  );
};

export default PrivateChat;
