
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Gift, Gamepad2, CreditCard } from "lucide-react";
import LevelProgress from "@/components/profile/LevelProgress";
import CreditBalanceWidget from "@/components/credits/CreditBalanceWidget";
import FeaturedContent from "@/components/home/FeaturedContent"; 
import OnlineUserCounter from "@/components/home/OnlineUserCounter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-migblue-dark">Welcome to migme</h1>
              <p className="text-slate-600">Meet friends, chat and have fun!</p>
            </div>
            <OnlineUserCounter />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <FeaturedContent />
            </div>
            <div className="space-y-4">
              <CreditBalanceWidget />
              <Card className="shadow-md">
                <CardContent className="p-4">
                  <LevelProgress
                    level={7}
                    currentPoints={350}
                    nextLevelPoints={500}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="shadow-md">
            <CardContent className="p-4 flex flex-col items-center text-center gap-3">
              <MessageSquare className="h-8 w-8 text-migblue" />
              <div>
                <h3 className="font-semibold">Chat Rooms</h3>
                <p className="text-sm text-muted-foreground">Join chat rooms and meet new friends</p>
              </div>
              <Button variant="outline" className="w-full hover:bg-migblue hover:text-white border-migblue text-migblue" asChild>
                <Link to="/chat">Start Chatting</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4 flex flex-col items-center text-center gap-3">
              <Users className="h-8 w-8 text-migblue" />
              <div>
                <h3 className="font-semibold">Friends</h3>
                <p className="text-sm text-muted-foreground">Connect with your network</p>
              </div>
              <Button variant="outline" className="w-full hover:bg-migblue hover:text-white border-migblue text-migblue" asChild>
                <Link to="/friends">View Friends</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4 flex flex-col items-center text-center gap-3">
              <Gift className="h-8 w-8 text-migblue" />
              <div>
                <h3 className="font-semibold">Gift Store</h3>
                <p className="text-sm text-muted-foreground">Send virtual gifts to friends</p>
              </div>
              <Button variant="outline" className="w-full hover:bg-migblue hover:text-white border-migblue text-migblue" asChild>
                <Link to="/gifts">Browse Gifts</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4 flex flex-col items-center text-center gap-3">
              <Gamepad2 className="h-8 w-8 text-migblue" />
              <div>
                <h3 className="font-semibold">Games</h3>
                <p className="text-sm text-muted-foreground">Play games and win credits</p>
              </div>
              <Button variant="outline" className="w-full hover:bg-migblue hover:text-white border-migblue text-migblue" asChild>
                <Link to="/games">Play Games</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-4 flex flex-col items-center text-center gap-3">
              <CreditCard className="h-8 w-8 text-migblue" />
              <div>
                <h3 className="font-semibold">Merchant</h3>
                <p className="text-sm text-muted-foreground">Become a credit reseller</p>
              </div>
              <Button variant="outline" className="w-full hover:bg-migblue hover:text-white border-migblue text-migblue" asChild>
                <Link to="/merchant">Join Program</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* News and Updates Section */}
        <Card className="shadow-md">
          <CardHeader className="migme-header-gradient text-white">
            <CardTitle>Latest Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="border-l-4 border-migblue pl-4 py-2">
              <div className="font-medium">New Merchant Program Launched!</div>
              <div className="text-sm text-muted-foreground">Become a credit reseller and earn commissions on sales</div>
            </div>
            <div className="border-l-4 border-migblue pl-4 py-2">
              <div className="font-medium">New Trivia Categories Added!</div>
              <div className="text-sm text-muted-foreground">Check out our new music and movie trivia games</div>
            </div>
            <div className="border-l-4 border-migblue pl-4 py-2">
              <div className="font-medium">Weekend XP Boost Event</div>
              <div className="text-sm text-muted-foreground">Earn double XP points this weekend across all activities</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
