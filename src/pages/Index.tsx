
import Layout from "@/components/layout/Layout";
import Timeline from "@/components/social/TimeLine";
import FriendsList from "@/components/social/FriendsList";
import GamesList from "@/components/gaming/GamesList";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Gift, Gamepad2, Plus } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Timeline />
          
          <div className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Popular Games</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <GameButton
                    icon={<Gamepad2 className="h-6 w-6" />}
                    name="Trivia"
                    count={157}
                    color="bg-blue-500"
                  />
                  <GameButton
                    icon={<Gamepad2 className="h-6 w-6" />}
                    name="LowCards"
                    count={89}
                    color="bg-purple-500"
                  />
                  <GameButton
                    icon={<Gamepad2 className="h-6 w-6" />}
                    name="MigWars"
                    count={105}
                    color="bg-red-500"
                  />
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link to="/games" className="flex items-center gap-1">
                      <Plus size={16} />
                      <span>View All Games</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="space-y-6">
          <QuickLinks />
          <FriendsList />
        </div>
      </div>
    </Layout>
  );
};

const GameButton = ({ 
  icon, 
  name, 
  count, 
  color 
}: { 
  icon: React.ReactNode; 
  name: string; 
  count: number; 
  color: string; 
}) => {
  return (
    <Link to="/games">
      <div className="bg-muted rounded-lg p-4 text-center hover:bg-muted/80 transition-colors cursor-pointer">
        <div className={`h-14 w-14 ${color} rounded-full flex items-center justify-center mx-auto mb-3 text-white`}>
          {icon}
        </div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{count} playing</div>
      </div>
    </Link>
  );
};

const QuickLinks = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <LinkButton
          icon={<MessageSquare className="h-5 w-5" />}
          text="Chat Rooms"
          to="/chat"
        />
        <LinkButton
          icon={<Users className="h-5 w-5" />}
          text="Friends"
          to="/friends"
        />
        <LinkButton
          icon={<Gift className="h-5 w-5" />}
          text="Gift Store"
          to="/gifts"
        />
        <LinkButton
          icon={<Gamepad2 className="h-5 w-5" />}
          text="Games"
          to="/games"
        />
      </CardContent>
    </Card>
  );
};

const LinkButton = ({ 
  icon, 
  text, 
  to 
}: { 
  icon: React.ReactNode; 
  text: string; 
  to: string; 
}) => {
  return (
    <Button asChild variant="outline" className="h-20 flex flex-col gap-1 justify-center">
      <Link to={to}>
        {icon}
        <span>{text}</span>
      </Link>
    </Button>
  );
};

export default Index;
