
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Medal } from "lucide-react";

interface GameAchievementsProps {
  gameId?: string;
}

const GameAchievements: React.FC<GameAchievementsProps> = ({ gameId }) => {
  // This is a placeholder component that would be connected to your achievements system
  // For now, we'll render some mock achievements
  
  const getMockAchievements = () => {
    if (!gameId || gameId === 'all') return [];
    
    const achievements = [
      { id: 1, name: "First Win", description: "Win your first game", completed: true },
      { id: 2, name: "High Roller", description: "Bet 100 credits in a single game", completed: false },
    ];
    
    if (gameId === 'dice') {
      achievements.push({ id: 3, name: "Lucky Six", description: "Roll a 6 three times in a row", completed: false });
    } else if (gameId === 'lowcards') {
      achievements.push({ id: 4, name: "Royal Flush", description: "Win with the highest card 5 times", completed: true });
    } else if (gameId === 'cricket') {
      achievements.push({ id: 5, name: "Century Maker", description: "Score 100 runs in a single game", completed: false });
    }
    
    return achievements;
  };
  
  const achievements = getMockAchievements();
  
  if (!gameId || gameId === 'all' || achievements.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Achievements</h3>
      <div className="space-y-2">
        {achievements.map(achievement => (
          <div key={achievement.id} className="flex items-center gap-2">
            <Medal size={16} className={achievement.completed ? "text-yellow-500" : "text-gray-400"} />
            <span className="text-sm font-medium">{achievement.name}</span>
            {achievement.completed && <Badge variant="outline" className="ml-auto">Completed</Badge>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameAchievements;
