
import { useState } from "react";
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

interface PrivateChatProps {
  userName: string;
  status?: "online" | "offline" | "away" | "busy";
  avatarUrl?: string;
}

const PrivateChat = ({
  userName,
  status = "online",
  avatarUrl,
}: PrivateChatProps) => {
  const [messages, setMessages] = useState<{text: string; isFromUser: boolean}[]>([
    { text: "Hey there! How are you doing today?", isFromUser: false },
  ]);
  const { toast } = useToast();

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, { text: message, isFromUser: true }]);
    
    // Simulate a response from the friend after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm just a demo response, real messaging coming soon!", isFromUser: false },
      ]);
    }, 1000);
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
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${msg.isFromUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[75%] ${
                  msg.isFromUser
                    ? "bg-migblue text-white rounded-tr-none"
                    : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </ScrollArea>
        
        <MessageInput onSendMessage={handleSendMessage} />
      </CardContent>
    </>
  );
};

export default PrivateChat;
