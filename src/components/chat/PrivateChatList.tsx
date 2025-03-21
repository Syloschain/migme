
import React, { useState, useEffect, ChangeEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePrivateChat } from "@/contexts/PrivateChatContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/profile/UserAvatar";
import { Search } from "lucide-react";

interface PrivateChatListProps {
  onSelectChat: (chatData: {
    id: string;
    userName: string;
    status?: string;
    avatarUrl?: string;
  }) => void;
}

const PrivateChatList = ({ onSelectChat }: PrivateChatListProps) => {
  const { user } = useAuth();
  const { chatPartners, startChat } = usePrivateChat();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (chatPartners) {
      setIsLoading(false);
    }
  }, [chatPartners]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPartners = chatPartners
    ? chatPartners.filter((partner) =>
        partner.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleStartChat = async (profileId: string, username: string, status?: string, avatarUrl?: string) => {
    if (!user?.id) return;
    
    try {
      const chatId = await startChat(profileId);
      onSelectChat({
        id: chatId,
        userName: username,
        status,
        avatarUrl
      });
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Private Chats</h3>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <Separator className="my-2" />
      
      <ScrollArea className="flex-grow">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Loading contacts...</p>
          </div>
        ) : filteredPartners.length > 0 ? (
          <div className="space-y-2">
            {filteredPartners.map((partner) => (
              <Button
                key={partner.id}
                variant="ghost"
                className="w-full justify-start px-2 py-6 h-auto"
                onClick={() => handleStartChat(
                  partner.id,
                  partner.username,
                  partner.status,
                  partner.avatar_url
                )}
              >
                <UserAvatar
                  username={partner.username}
                  avatarUrl={partner.avatar_url}
                  status={partner.status as "online" | "away" | "busy" | "offline"}
                  showStatus
                  size="sm"
                />
                <div className="ml-3 text-left">
                  <p className="font-medium">{partner.username}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {partner.status || "offline"}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">
              {searchTerm ? "No contacts found" : "No contacts yet"}
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default PrivateChatList;
