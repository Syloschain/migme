
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import EnhancedChatRoom from "@/components/chat/EnhancedChatRoom";
import ChatRoomList from "@/components/chat/ChatRoomList";
import PrivateChatList from "@/components/chat/PrivateChatList";
import PrivateChat from "@/components/chat/PrivateChat";
import OnlineUserCounter from "@/components/home/OnlineUserCounter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ChatPage = () => {
  const [chatMode, setChatMode] = useState<"public" | "private">("public");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // Mock data for private chats
  const privateContacts = [
    { id: "1", name: "Sarah Johnson", status: "online" },
    { id: "2", name: "Michael Chen", status: "busy" },
    // ... more contacts could be added
  ];

  const handleSelectPrivateChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setChatMode("private");
  };

  const currentPrivateChat = privateContacts.find(contact => contact.id === selectedChatId);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-migblue-dark">Chat</h1>
          <OnlineUserCounter count={145} />
        </div>
        
        <Tabs defaultValue="rooms" className="w-full" onValueChange={(value) => {
          if (value === "rooms") setChatMode("public");
          if (value === "private") setChatMode("private");
        }}>
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="rooms">Chat Rooms</TabsTrigger>
            <TabsTrigger value="private">Private Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rooms" className="m-0 p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Card className="shadow-md border-migblue-light/30 h-[calc(80vh-170px)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center justify-between">
                      <span>Available Rooms</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="public" className="w-full">
                      <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="public">Public</TabsTrigger>
                        <TabsTrigger value="friends">Friends</TabsTrigger>
                        <TabsTrigger value="groups">Groups</TabsTrigger>
                      </TabsList>
                      <TabsContent value="public" className="m-0 p-0">
                        <div className="h-[calc(80vh-240px)] overflow-y-auto">
                          <ChatRoomList />
                        </div>
                      </TabsContent>
                      <TabsContent value="friends" className="m-0 p-0">
                        <div className="h-[calc(80vh-240px)] overflow-y-auto p-4">
                          <div className="text-center py-8 text-muted-foreground">
                            <p>Friend chats will appear here</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="groups" className="m-0 p-0">
                        <div className="h-[calc(80vh-240px)] overflow-y-auto p-4">
                          <div className="text-center py-8 text-muted-foreground">
                            <p>Group chats will appear here</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <Card className="shadow-md border-migblue-light/30 h-[calc(80vh-170px)]">
                  <EnhancedChatRoom 
                    roomName="Global Chat" 
                    roomDescription="Chat with users from around the world" 
                    onlineCount={145}
                  />
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="private" className="m-0 p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Card className="shadow-md border-migblue-light/30 h-[calc(80vh-170px)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center justify-between">
                      <span>Private Messages</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <PrivateChatList onSelectChat={handleSelectPrivateChat} />
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <Card className="shadow-md border-migblue-light/30 h-[calc(80vh-170px)]">
                  {selectedChatId && currentPrivateChat ? (
                    <PrivateChat 
                      userName={currentPrivateChat.name} 
                      status={currentPrivateChat.status as any}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center">
                      <div>
                        <p>Select a conversation to start chatting</p>
                        <p className="text-sm mt-2">Or search for a friend to message</p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ChatPage;
