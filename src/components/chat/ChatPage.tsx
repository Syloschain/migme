
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import ChatRoomList from "./ChatRoomList";
import EnhancedChatRoom from "./EnhancedChatRoom";
import PrivateChatList from "./PrivateChatList";
import PrivateChatRoom from "./PrivateChatRoom";

const ChatPage = () => {
  const { user } = useAuth();
  const { currentRoom, setCurrentRoom } = useChat();
  const [selectedPrivateChat, setSelectedPrivateChat] = useState<{
    id: string;
    userName: string;
    status?: string;
    avatarUrl?: string;
  } | null>(null);

  const handleRoomSelect = (roomId: string) => {
    // If we have a current room and it's different from the selected one, 
    // we need to "leave" the current room
    if (currentRoom && currentRoom.id !== roomId) {
      setCurrentRoom(null);
    }
    // Set the new room (this is equivalent to "joining" it)
    setCurrentRoom({ id: roomId, name: "", description: "" });
    setSelectedPrivateChat(null);
  };

  const handlePrivateChatSelect = (chatData: {
    id: string;
    userName: string;
    status?: string;
    avatarUrl?: string;
  }) => {
    setSelectedPrivateChat(chatData);
    if (currentRoom) {
      setCurrentRoom(null);
    }
  };

  return (
    <div className="container mx-auto my-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Chat &amp; Messaging</h1>

      <Tabs defaultValue="public" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="public">Public Chat Rooms</TabsTrigger>
          <TabsTrigger value="private">Private Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="md:col-span-1">
              <ChatRoomList onSelectRoom={handleRoomSelect} />
            </Card>
            
            <Card className="md:col-span-3">
              {currentRoom ? (
                <EnhancedChatRoom
                  roomId={currentRoom.id}
                  roomName={currentRoom.name}
                  roomDescription={currentRoom.description}
                />
              ) : (
                <div className="flex items-center justify-center h-80">
                  <p className="text-muted-foreground">
                    Select a chat room to start messaging
                  </p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="private" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="md:col-span-1">
              <PrivateChatList onSelectChat={handlePrivateChatSelect} />
            </Card>
            
            <Card className="md:col-span-3">
              {selectedPrivateChat ? (
                <PrivateChatRoom
                  chatId={selectedPrivateChat.id}
                  userName={selectedPrivateChat.userName}
                  status={selectedPrivateChat.status}
                  avatarUrl={selectedPrivateChat.avatarUrl}
                />
              ) : (
                <div className="flex items-center justify-center h-80">
                  <p className="text-muted-foreground">
                    Select a contact to start a private conversation
                  </p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatPage;
