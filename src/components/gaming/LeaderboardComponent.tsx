
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LeaderboardEntry from "./LeaderboardEntry";

interface LeaderboardComponentProps {
  gameId?: string;
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ gameId }) => {
  // Mock data for leaderboard
  const getMockData = () => {
    if (!gameId || gameId === 'all') return [];
    
    // This would be replaced with actual API calls in a real implementation
    return [
      { rank: 1, username: "Player1", avatar: "/placeholder.svg", score: 1250 },
      { rank: 2, username: "Player2", avatar: "/placeholder.svg", score: 980 },
      { rank: 3, username: "Player3", avatar: "/placeholder.svg", score: 810 },
      { rank: 4, username: "Player4", avatar: "/placeholder.svg", score: 740 },
      { rank: 5, username: "Player5", avatar: "/placeholder.svg", score: 620 }
    ];
  };
  
  const leaderboardData = getMockData();
  
  if (!gameId || gameId === 'all' || leaderboardData.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((entry) => (
            <LeaderboardEntry
              key={entry.rank}
              rank={entry.rank}
              username={entry.username}
              avatar={entry.avatar}
              score={entry.score}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardComponent;
