
import { useState } from "react";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Info, Settings, MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageInput from "./MessageInput";
import SampleConversation from "./SampleConversation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface EnhancedChatRoomProps {
  roomName: string;
  roomDescription: string;
  onlineCount: number;
}

const EnhancedChatRoom = ({
  roomName,
  roomDescription,
  onlineCount
}: EnhancedChatRoomProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, message]);
    
    // Scroll to bottom would happen here with a useEffect
    
    // This is just a toast to show the message was "sent"
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the chat room.",
      duration: 1500,
    });
  };

  return (
    <>
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium text-migblue-dark">{roomName}</CardTitle>
            <CardDescription>{roomDescription}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Users size={14} />
              <span>{onlineCount}</span>
            </Button>
            <Button variant="outline" size="sm" className="p-0 w-8 h-8">
              <Info size={14} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="p-0 w-8 h-8">
                  <MoreHorizontal size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Member List</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Info className="mr-2 h-4 w-4" />
                  <span>Room Info</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(80vh-190px)]">
        <ScrollArea className="flex-grow">
          <SampleConversation />
          {messages.map((msg, index) => (
            <div key={index} className="px-4 py-2 text-right">
              <div className="inline-block bg-migblue text-white rounded-lg py-2 px-3 max-w-[75%]">
                {msg}
              </div>
            </div>
          ))}
        </ScrollArea>
        
        <MessageInput onSendMessage={handleSendMessage} />
      </CardContent>
    </>
  );
};

export default EnhancedChatRoom;
