
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, UserCheck, UserMinus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Friend {
  id: string;
  username: string;
  status: "online" | "offline" | "busy";
  statusMessage?: string;
  lastSeen?: Date;
  level: number;
}

const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", username: "coolcat99", status: "online", statusMessage: "Let's chat!", level: 23 },
    { id: "2", username: "migstar42", status: "busy", statusMessage: "Studying, don't disturb", level: 17 },
    { id: "3", username: "chatmaster", status: "online", statusMessage: "Looking for trivia players", level: 28 },
    { id: "4", username: "luckygamer", status: "offline", lastSeen: new Date(Date.now() - 1000 * 60 * 45), level: 14 },
    { id: "5", username: "newbie123", status: "online", statusMessage: "Just joined migme!", level: 5 },
    { id: "6", username: "musiclover", status: "offline", lastSeen: new Date(Date.now() - 1000 * 60 * 120), level: 19 },
    { id: "7", username: "giftking", status: "online", statusMessage: "Sending gifts to everyone", level: 31 },
    { id: "8", username: "travelbug", status: "offline", lastSeen: new Date(Date.now() - 1000 * 60 * 15), level: 20 },
  ]);

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = filteredFriends.filter((friend) => friend.status === "online");
  const busyFriends = filteredFriends.filter((friend) => friend.status === "busy");
  const offlineFriends = filteredFriends.filter((friend) => friend.status === "offline");

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Friends</CardTitle>
          <Badge variant="outline" className="font-normal">
            {friends.filter(f => f.status !== "offline").length} Online
          </Badge>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search friends..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All ({filteredFriends.length})</TabsTrigger>
            <TabsTrigger value="online" className="flex-1">Online ({onlineFriends.length})</TabsTrigger>
            <TabsTrigger value="offline" className="flex-1">Offline ({offlineFriends.length + busyFriends.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4 space-y-2 max-h-[500px] overflow-y-auto">
            {filteredFriends.map((friend) => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
            {filteredFriends.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No friends found matching "{searchQuery}"
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="online" className="mt-4 space-y-2 max-h-[500px] overflow-y-auto">
            {onlineFriends.map((friend) => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
            {onlineFriends.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No online friends found
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="offline" className="mt-4 space-y-2 max-h-[500px] overflow-y-auto">
            {[...busyFriends, ...offlineFriends].map((friend) => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
            {busyFriends.length + offlineFriends.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No offline friends found
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const FriendItem = ({ friend }: { friend: Friend }) => {
  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-secondary transition-colors">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <div className="bg-primary/10 text-primary flex items-center justify-center h-full w-full text-sm font-bold">
              {friend.username.substring(0, 2).toUpperCase()}
            </div>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-background ${
            friend.status === "online" ? "bg-green-500" : 
            friend.status === "busy" ? "bg-orange-500" : "bg-gray-400"
          }`} />
        </div>
        <div>
          <div className="font-medium flex items-center gap-1">
            {friend.username}
            <span className="text-xs text-muted-foreground font-normal">
              Lvl {friend.level}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {friend.status === "offline" && friend.lastSeen
              ? `Last seen ${Math.floor((Date.now() - friend.lastSeen.getTime()) / (1000 * 60))}m ago`
              : friend.statusMessage || (friend.status === "online" ? "Online" : "Busy")}
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" title="Message">
          <MessageSquare size={16} />
        </Button>
        <Button variant="ghost" size="icon" title="View Profile">
          <UserCheck size={16} />
        </Button>
        <Button variant="ghost" size="icon" title="Remove Friend">
          <UserMinus size={16} />
        </Button>
      </div>
    </div>
  );
};

export default FriendsList;
