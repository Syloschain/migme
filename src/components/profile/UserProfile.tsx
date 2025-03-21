
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Gift, UserPlus, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserProfileProps {
  username?: string;
  isCurrentUser?: boolean;
}

const UserProfile = ({ username = "migUser42", isCurrentUser = true }: UserProfileProps) => {
  const userLevel = 15;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-primary/20">
                <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-2xl font-bold">
                  {username.substring(0, 2).toUpperCase()}
                </div>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{username}</CardTitle>
                  <Badge variant="outline" className="text-xs py-0 border-primary/20 text-primary">
                    Level {userLevel}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  Life is a game, I'm just playing to win 🎮
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Chatterbox
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Gift Master
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Early Adopter
                  </Badge>
                </div>
              </div>
            </div>
            {isCurrentUser ? (
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Edit size={16} />
                <span>Edit Profile</span>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Gift size={16} />
                  <span>Send Gift</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <UserPlus size={16} />
                  <span>Add Friend</span>
                </Button>
                <Button size="sm" className="flex items-center gap-1">
                  <MessageSquare size={16} />
                  <span>Message</span>
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <div className="text-2xl font-semibold">248</div>
              <div className="text-sm text-muted-foreground">Friends</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">3.2K</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">567</div>
              <div className="text-sm text-muted-foreground">Gifts</div>
            </div>
          </div>
          
          <Tabs defaultValue="posts">
            <TabsList className="w-full">
              <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
              <TabsTrigger value="photos" className="flex-1">Photos</TabsTrigger>
              <TabsTrigger value="gifts" className="flex-1">Gifts</TabsTrigger>
              <TabsTrigger value="badges" className="flex-1">Badges</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-10 w-10">
                        <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-sm font-bold">
                          {username.substring(0, 2).toUpperCase()}
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">{username}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          Posted 2 hours ago
                        </div>
                        <p>Just reached level 15! Who wants to play some LowCards to celebrate? 🎉</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-10 w-10">
                        <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-sm font-bold">
                          {username.substring(0, 2).toUpperCase()}
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">{username}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          Posted yesterday
                        </div>
                        <p>Thanks for all the gifts, friends! You're all amazing. ❤️</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="photos" className="mt-4">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-md" />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="gifts" className="mt-4">
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square bg-primary/10 rounded-md flex items-center justify-center">
                    <Gift className="text-primary h-6 w-6" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="badges" className="mt-4">
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Badge key={i} variant="outline" className="flex items-center justify-center h-12">
                    Achievement {i}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
