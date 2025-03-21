
import Layout from "@/components/layout/Layout";
import ChatRoom from "@/components/chat/ChatRoom";
import ChatRoomList from "@/components/chat/ChatRoomList";

const ChatPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ChatRoomList />
        </div>
        <div className="md:col-span-2">
          <ChatRoom 
            roomName="Global Chat" 
            roomDescription="Chat with users from around the world" 
            onlineCount={145}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
