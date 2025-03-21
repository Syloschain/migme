
import Layout from "@/components/layout/Layout";
import EnhancedChatRoom from "@/components/chat/EnhancedChatRoom";
import ChatRoomList from "@/components/chat/ChatRoomList";
import OnlineUserCounter from "@/components/home/OnlineUserCounter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ChatPage = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-migblue-dark">Chat Rooms</h1>
          <OnlineUserCounter count={145} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Card className="shadow-md border-migblue-light/30 h-[calc(80vh-120px)]">
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
                    <div className="h-[calc(80vh-190px)] overflow-y-auto">
                      <ChatRoomList />
                    </div>
                  </TabsContent>
                  <TabsContent value="friends" className="m-0 p-0">
                    <div className="h-[calc(80vh-190px)] overflow-y-auto p-4">
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Friend chats will appear here</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="groups" className="m-0 p-0">
                    <div className="h-[calc(80vh-190px)] overflow-y-auto p-4">
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
            <Card className="shadow-md border-migblue-light/30 h-[calc(80vh-120px)]">
              <EnhancedChatRoom 
                roomName="Global Chat" 
                roomDescription="Chat with users from around the world" 
                onlineCount={145}
              />
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
