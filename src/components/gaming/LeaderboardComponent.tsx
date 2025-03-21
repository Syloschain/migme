
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star, Clock, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import VIPBadge from "@/components/profile/VIPBadge";

interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatarUrl?: string;
  score: number;
  isVIP?: boolean;
  level: number;
  games?: number;
  winRate?: number;
}

// Helper functions moved outside components so they can be used by all components
const getRankStyle = (rank: number) => {
  switch(rank) {
    case 1:
      return "bg-amber-100 text-amber-800";
    case 2:
      return "bg-slate-100 text-slate-800";
    case 3:
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRankIcon = (rank: number) => {
  switch(rank) {
    case 1:
      return <Crown className="h-4 w-4 text-amber-500" />;
    case 2:
      return <Trophy className="h-4 w-4 text-slate-500" />;
    case 3:
      return <Star className="h-4 w-4 text-orange-500" />;
    default:
      return null;
  }
};

const LeaderboardComponent = () => {
  const [activeTab, setActiveTab] = useState("daily");
  
  const generateLeaderboardData = (prefix: string): LeaderboardEntry[] => {
    const baseData: LeaderboardEntry[] = [
      {
        id: `${prefix}-1`,
        rank: 1,
        username: "GameMaster42",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 980 : prefix === "weekly" ? 4820 : 15750,
        isVIP: true,
        level: 30,
        games: prefix === "daily" ? 12 : prefix === "weekly" ? 47 : 189,
        winRate: 78
      },
      {
        id: `${prefix}-2`,
        rank: 2,
        username: "CardShark",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 820 : prefix === "weekly" ? 4350 : 14200,
        isVIP: false,
        level: 28,
        games: prefix === "daily" ? 10 : prefix === "weekly" ? 41 : 173,
        winRate: 73
      },
      {
        id: `${prefix}-3`,
        rank: 3,
        username: "TriviaMaster",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 790 : prefix === "weekly" ? 3890 : 13500,
        isVIP: true,
        level: 26,
        games: prefix === "daily" ? 9 : prefix === "weekly" ? 37 : 162,
        winRate: 71
      },
      {
        id: `${prefix}-4`,
        rank: 4,
        username: "QuizWhiz",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 710 : prefix === "weekly" ? 3560 : 12800,
        level: 24,
        games: prefix === "daily" ? 8 : prefix === "weekly" ? 32 : 147,
        winRate: 68
      },
      {
        id: `${prefix}-5`,
        rank: 5,
        username: "DiceRoller99",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 680 : prefix === "weekly" ? 3200 : 11900,
        level: 22,
        games: prefix === "daily" ? 7 : prefix === "weekly" ? 29 : 132,
        winRate: 64
      },
      {
        id: `${prefix}-6`,
        rank: 6,
        username: "MigPlayer1",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 530 : prefix === "weekly" ? 2780 : 10500,
        level: 19,
        games: prefix === "daily" ? 6 : prefix === "weekly" ? 25 : 119,
        winRate: 60
      },
      {
        id: `${prefix}-7`,
        rank: 7,
        username: "LuckyStrike",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 490 : prefix === "weekly" ? 2450 : 9800,
        level: 17,
        games: prefix === "daily" ? 5 : prefix === "weekly" ? 22 : 104,
        winRate: 56
      },
      {
        id: `${prefix}-8`,
        rank: 8,
        username: "Winner123",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 470 : prefix === "weekly" ? 2150 : 8900,
        isVIP: true,
        level: 16,
        games: prefix === "daily" ? 4 : prefix === "weekly" ? 19 : 97,
        winRate: 53
      },
      {
        id: `${prefix}-9`,
        rank: 9,
        username: "CurrentUser",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 350 : prefix === "weekly" ? 1840 : 7200,
        level: 14,
        games: prefix === "daily" ? 3 : prefix === "weekly" ? 16 : 85,
        winRate: 50
      },
      {
        id: `${prefix}-10`,
        rank: 10,
        username: "MigGamer456",
        avatarUrl: "/placeholder.svg",
        score: prefix === "daily" ? 320 : prefix === "weekly" ? 1680 : 6800,
        level: 12,
        games: prefix === "daily" ? 2 : prefix === "weekly" ? 14 : 75,
        winRate: 45
      }
    ];
    
    return baseData;
  };
  
  const dailyLeaderboard = generateLeaderboardData("daily");
  const weeklyLeaderboard = generateLeaderboardData("weekly");
  const allTimeLeaderboard = generateLeaderboardData("alltime");
  
  return (
    <Card className="shadow-md w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-migblue" />
          Game Leaderboards
        </CardTitle>
        <CardDescription>Top players across all migme games</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <LeaderboardList entries={dailyLeaderboard} />
          </TabsContent>
          
          <TabsContent value="weekly" className="space-y-4">
            <LeaderboardList entries={weeklyLeaderboard} />
          </TabsContent>
          
          <TabsContent value="alltime" className="space-y-4">
            <LeaderboardList entries={allTimeLeaderboard} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const LeaderboardList = ({ entries }: { entries: LeaderboardEntry[] }) => {
  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div 
          key={entry.id} 
          className={`flex items-center p-3 rounded-lg ${
            entry.username === "CurrentUser" ? "bg-migblue-light/20 border border-migblue-light" : "bg-gray-50"
          }`}
        >
          <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${getRankStyle(entry.rank)}`}>
            {getRankIcon(entry.rank) || entry.rank}
          </div>
          
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={entry.avatarUrl} alt={entry.username} />
            <AvatarFallback>{entry.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium">{entry.username}</span>
              {entry.isVIP && <VIPBadge className="ml-1 scale-75" />}
              {entry.username === "CurrentUser" && <Badge className="ml-2 text-xs">You</Badge>}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>Level {entry.level}</span>
              {entry.games && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{entry.games} games</span>
                </>
              )}
              {entry.winRate && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{entry.winRate}% win rate</span>
                </>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-semibold text-migblue">{entry.score.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">points</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardComponent;
