
import { useState } from "react";
import { usePrivateChat } from "@/contexts/PrivateChatContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PrivateChatListProps {
  onSelectChat: (chatId: string) => void;
}

const PrivateChatList = ({ onSelectChat }: PrivateChatListProps) => {
  const { chatPartners, loadingChatPartners } = usePrivateChat();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPartners = chatPartners.filter(partner => 
    partner.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  if (loadingChatPartners) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="h-10 w-10" />
        </div>
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(80vh-230px)]">
      <div className="p-4 border-b flex gap-2">
        <Input
          className="flex-1"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
        />
        <Button size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {filteredPartners.length > 0 ? (
          filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors"
              onClick={() => onSelectChat(partner.chatId)}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  {partner.avatar_url ? (
                    <AvatarImage src={partner.avatar_url} alt={partner.username} />
                  ) : (
                    <AvatarFallback className="bg-migblue text-white">
                      {partner.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 w-2 h-2 ${
                    statusColors[partner.status as keyof typeof statusColors] || statusColors.offline
                  } rounded-full border-2 border-white`}
                />
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">{partner.username}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {partner.last_message || "No messages yet"}
                </div>
              </div>
              
              <div className="flex flex-col items-end text-xs">
                {partner.last_message_time && (
                  <span className="text-muted-foreground">
                    {new Date(partner.last_message_time).toLocaleDateString()}
                  </span>
                )}
                {partner.unread_count && partner.unread_count > 0 && (
                  <span className="bg-migblue text-white px-2 py-1 rounded-full">
                    {partner.unread_count}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
            <p>No conversations found</p>
            {searchTerm ? (
              <p className="text-sm mt-2">Try a different search term</p>
            ) : (
              <p className="text-sm mt-2">Start a new conversation</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateChatList;
