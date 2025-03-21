
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, Gift, Smile } from "lucide-react";

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface ChatRoomProps {
  roomName: string;
  roomDescription?: string;
  onlineCount?: number;
}

const ChatRoom = ({ roomName, roomDescription = "Chat with friends", onlineCount = 24 }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      username: "mig_user1",
      content: "Hey everyone! What's up?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isCurrentUser: false,
    },
    {
      id: "2",
      username: "coolcat99",
      content: "Not much, just hanging out. Anyone want to play LowCards later?",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
      isCurrentUser: false,
    },
    {
      id: "3",
      username: "migstar42",
      content: "I'm in for LowCards! Let me finish this chat first.",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      isCurrentUser: false,
    },
    {
      id: "4",
      username: "You",
      content: "Count me in too! I just got some new credits.",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      isCurrentUser: true,
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const message: Message = {
      id: Date.now().toString(),
      username: "You",
      content: newMessage,
      timestamp: new Date(),
      isCurrentUser: true,
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="h-[calc(100vh-170px)] md:h-[calc(100vh-120px)] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{roomName}</CardTitle>
            <CardDescription>{roomDescription} • {onlineCount} online</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto pb-1">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className="h-8 w-8">
                  <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-xs font-bold">
                    {message.username.substring(0, 2).toUpperCase()}
                  </div>
                </Avatar>
                <div>
                  <div className={`text-xs mb-1 ${message.isCurrentUser ? "text-right" : "text-left"}`}>
                    {message.username} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div 
                    className={`p-3 rounded-lg ${
                      message.isCurrentUser 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Send gift">
            <Gift size={20} />
          </Button>
          <Button variant="ghost" size="icon" title="Add emoticon">
            <Smile size={20} />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={newMessage.trim() === ""} 
            size="icon"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatRoom;
