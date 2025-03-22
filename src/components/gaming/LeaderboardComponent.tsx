
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LeaderboardEntry, { LeaderboardEntryData } from "./LeaderboardEntry";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface LeaderboardComponentProps {
  gameId?: string;
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ gameId }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntryData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!gameId || gameId === 'all') {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Query game_participants table instead of game_leaderboards since it's related to game sessions
        const { data, error } = await supabase
          .from('game_participants')
          .select(`
            score,
            profile_id,
            profiles:profile_id (
              id, username, avatar_url, level
            ),
            session:session_id (
              id, game_id
            )
          `)
          .eq('session:game_id', gameId)
          .order('score', { ascending: false })
          .limit(10);
          
        if (error) throw error;
        
        // Transform the data to match our LeaderboardEntryData format
        const transformedData = data ? data.map((entry, index) => ({
          id: entry.profile_id, // Using profile_id as a unique identifier
          rank: index + 1,
          username: entry.profiles?.username || 'Unknown Player',
          avatarUrl: entry.profiles?.avatar_url || '/placeholder.svg',
          score: entry.score || 0,
          level: entry.profiles?.level || 1
        })) : [];
        
        setLeaderboardData(transformedData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [gameId]);
  
  if (!gameId || gameId === 'all') {
    return null;
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ))}
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No leaderboard data available yet
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboardData.map((entry) => (
              <LeaderboardEntry
                key={entry.id}
                entry={entry}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaderboardComponent;
