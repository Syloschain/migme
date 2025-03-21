
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users } from "lucide-react";

interface ChatRoomInfo {
  id: string;
  name: string;
  participants: number;
  isPopular?: boolean;
}

const ChatRoomList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<ChatRoomInfo[]>([
    { id: "1", name: "Global Chat", participants: 145, isPopular: true },
    { id: "2", name: "Syria Chat Room", participants: 37, isPopular: true },
    { id: "3", name: "Indonesia Hangout", participants: 89, isPopular: true },
    { id: "4", name: "Music Lovers", participants: 42 },
    { id: "5", name: "Gaming Squad", participants: 28 },
    { id: "6", name: "New Friends", participants: 63, isPopular: true },
    { id: "7", name: "Fashion Talk", participants: 19 },
    { id: "8", name: "Sports Chat", participants: 31 },
    { id: "9", name: "Movies Discussion", participants: 24 },
    { id: "10", name: "Food & Cooking", participants: 17 },
    { id: "11", name: "Tech Talk", participants: 22 },
    { id: "12", name: "Art & Design", participants: 15 },
  ]);

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Chat Rooms</CardTitle>
          <Button size="sm" className="flex items-center gap-1">
            <Plus size={16} />
            <span>New Room</span>
          </Button>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        <div className="space-y-1">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-secondary cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium flex items-center gap-1">
                    {room.name}
                    {room.isPopular && (
                      <span className="bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {room.participants} online
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </div>
          ))}
          {filteredRooms.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No rooms found matching "{searchQuery}"
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatRoomList;
