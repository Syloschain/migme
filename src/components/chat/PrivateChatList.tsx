
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivateChatContact {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away" | "busy";
  lastMessage?: string;
  unreadCount?: number;
  lastActive?: string;
}

interface PrivateChatListProps {
  onSelectChat: (chatId: string) => void;
}

const PrivateChatList = ({ onSelectChat }: PrivateChatListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for demonstration
  const contacts: PrivateChatContact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      status: "online",
      lastMessage: "See you tomorrow!",
      unreadCount: 2,
      lastActive: "5m"
    },
    {
      id: "2",
      name: "Michael Chen",
      status: "busy",
      lastMessage: "Can we talk about the project?",
      lastActive: "30m"
    },
    {
      id: "3",
      name: "Aisha Patel",
      status: "away",
      lastMessage: "I sent you the photos",
      lastActive: "2h"
    },
    {
      id: "4",
      name: "Carlos Rodriguez",
      status: "offline",
      lastMessage: "Thanks for the help!",
      lastActive: "1d"
    },
    {
      id: "5",
      name: "Emma Wilson",
      status: "online",
      lastMessage: "Hey, are you available for a chat?",
      lastActive: "15m"
    }
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search friends..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="space-y-1 p-2">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              className="w-full text-left p-2 rounded-lg hover:bg-accent flex items-center space-x-3"
              onClick={() => onSelectChat(contact.id)}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  {contact.avatar ? (
                    <img src={contact.avatar} alt={contact.name} />
                  ) : (
                    <div className="bg-migblue text-white w-full h-full flex items-center justify-center">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${statusColors[contact.status]} rounded-full border-2 border-white`}></span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-medium truncate">{contact.name}</p>
                  <span className="text-xs text-muted-foreground">{contact.lastActive}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.lastMessage}
                  </p>
                  {contact.unreadCount && contact.unreadCount > 0 && (
                    <span className="bg-migblue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PrivateChatList;
