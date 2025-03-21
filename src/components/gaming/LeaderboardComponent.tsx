
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LeaderboardEntry, { LeaderboardEntryData } from "./LeaderboardEntry";

interface LeaderboardComponentProps {
  gameId?: string;
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ gameId }) => {
  // Mock data for leaderboard
  const getMockData = (): LeaderboardEntryData[] => {
    if (!gameId || gameId === 'all') return [];
    
    // This would be replaced with actual API calls in a real implementation
    return [
      { id: "1", rank: 1, username: "Player1", avatarUrl: "/placeholder.svg", score: 1250, level: 10 },
      { id: "2", rank: 2, username: "Player2", avatarUrl: "/placeholder.svg", score: 980, level: 8 },
      { id: "3", rank: 3, username: "Player3", avatarUrl: "/placeholder.svg", score: 810, level: 9 },
      { id: "4", rank: 4, username: "Player4", avatarUrl: "/placeholder.svg", score: 740, level: 7 },
      { id: "5", rank: 5, username: "Player5", avatarUrl: "/placeholder.svg", score: 620, level: 6 }
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
              key={entry.id}
              entry={entry}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardComponent;
