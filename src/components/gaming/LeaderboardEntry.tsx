
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Trophy } from "lucide-react";
import VIPBadge from "@/components/profile/VIPBadge";

export interface LeaderboardEntryData {
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

interface LeaderboardEntryProps {
  entry: LeaderboardEntryData;
}

// Helper functions
export const getRankStyle = (rank: number) => {
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

export const getRankIcon = (rank: number) => {
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

const LeaderboardEntry = ({ entry }: LeaderboardEntryProps) => {
  return (
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
  );
};

export default LeaderboardEntry;
