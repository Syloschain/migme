
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, MessageSquare, Gift, Users, Gamepad2 } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  progress?: number;
}

const StatItem = ({ icon, label, value, color, progress }: StatItemProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1.5">
        <div className={`${color} p-1.5 rounded`}>
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="font-semibold">{value}</div>
    </div>
    {progress !== undefined && (
      <Progress value={progress} className="h-1" />
    )}
  </div>
);

interface UserStatsProps {
  chatStats?: {
    messagesCount: number;
    chatRoomsJoined: number;
    activeStreak: number;
  };
  socialStats?: {
    friends: number;
    friendsThisWeek: number;
    friendsOnline: number;
  };
  giftStats?: {
    givenCount: number;
    receivedCount: number;
    favoriteGift: string;
  };
  gameStats?: {
    gamesPlayed: number;
    gamesWon: number;
    favoriteGame: string;
  };
}

const UserStats = ({
  chatStats = {
    messagesCount: 2489,
    chatRoomsJoined: 15,
    activeStreak: 7
  },
  socialStats = {
    friends: 248,
    friendsThisWeek: 12,
    friendsOnline: 23
  },
  giftStats = {
    givenCount: 135,
    receivedCount: 567,
    favoriteGift: "Diamond"
  },
  gameStats = {
    gamesPlayed: 78,
    gamesWon: 42,
    favoriteGame: "LowCards"
  }
}: UserStatsProps) => {
  const winRate = gameStats ? Math.round((gameStats.gamesWon / gameStats.gamesPlayed) * 100) : 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Activity Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <StatItem 
          icon={<MessageSquare className="h-4 w-4 text-white" />}
          label="Messages Sent"
          value={chatStats.messagesCount.toLocaleString()}
          color="bg-blue-500"
        />
        
        <StatItem 
          icon={<Users className="h-4 w-4 text-white" />}
          label="Friends"
          value={`${socialStats.friends} (${socialStats.friendsOnline} online)`}
          color="bg-green-500"
        />
        
        <StatItem 
          icon={<Gift className="h-4 w-4 text-white" />}
          label="Gifts Exchanged"
          value={`${giftStats.givenCount} given · ${giftStats.receivedCount} received`}
          color="bg-pink-500"
        />
        
        <StatItem 
          icon={<Gamepad2 className="h-4 w-4 text-white" />}
          label="Game Win Rate"
          value={`${winRate}%`}
          color="bg-purple-500"
          progress={winRate}
        />
        
        <StatItem 
          icon={<Trophy className="h-4 w-4 text-white" />}
          label="Active Streak"
          value={`${chatStats.activeStreak} days`}
          color="bg-amber-500"
          progress={Math.min(chatStats.activeStreak * 10, 100)}
        />
      </CardContent>
    </Card>
  );
};

export default UserStats;
