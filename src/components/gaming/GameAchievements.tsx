
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Star, Medal, Target, Flame, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  completed: boolean;
  reward: string;
  category: "beginner" | "intermediate" | "advanced";
}

const GameAchievements = () => {
  const achievements: Achievement[] = [
    {
      id: "a1",
      name: "First Win",
      description: "Win your first game",
      icon: <Trophy className="h-5 w-5 text-migblue" />,
      progress: 100,
      completed: true,
      reward: "10 Credits",
      category: "beginner"
    },
    {
      id: "a2",
      name: "Trivia Master",
      description: "Get a perfect score in Trivia",
      icon: <Star className="h-5 w-5 text-amber-500" />,
      progress: 60,
      completed: false,
      reward: "50 Credits",
      category: "intermediate"
    },
    {
      id: "a3",
      name: "Card Shark",
      description: "Win 10 LowCard games",
      icon: <Award className="h-5 w-5 text-green-500" />,
      progress: 40,
      completed: false,
      reward: "30 Credits + Card Shark Badge",
      category: "intermediate"
    },
    {
      id: "a4",
      name: "Winning Streak",
      description: "Win 5 games in a row",
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      progress: 20,
      completed: false,
      reward: "100 Credits",
      category: "advanced"
    },
    {
      id: "a5",
      name: "Lucky Seven",
      description: "Get a score of 777 in Dice game",
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      progress: 0,
      completed: false,
      reward: "77 Credits + Lucky Dice Badge",
      category: "advanced"
    },
    {
      id: "a6",
      name: "Game Explorer",
      description: "Play each game at least once",
      icon: <Medal className="h-5 w-5 text-blue-500" />,
      progress: 75,
      completed: false,
      reward: "25 Credits",
      category: "beginner"
    }
  ];

  // Group achievements by category
  const beginnerAchievements = achievements.filter(a => a.category === "beginner");
  const intermediateAchievements = achievements.filter(a => a.category === "intermediate");
  const advancedAchievements = achievements.filter(a => a.category === "advanced");

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-migblue" />
          Game Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AchievementCategory 
          title="Beginner" 
          achievements={beginnerAchievements} 
        />
        
        <AchievementCategory 
          title="Intermediate" 
          achievements={intermediateAchievements} 
        />
        
        <AchievementCategory 
          title="Advanced" 
          achievements={advancedAchievements} 
        />
      </CardContent>
    </Card>
  );
};

const AchievementCategory = ({ 
  title, 
  achievements 
}: { 
  title: string;
  achievements: Achievement[];
}) => {
  return (
    <div>
      <h3 className="font-medium text-sm text-muted-foreground mb-3">{title}</h3>
      <div className="space-y-4">
        {achievements.map(achievement => (
          <div key={achievement.id} className="relative">
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                {achievement.icon}
                <span className={`font-medium ${achievement.completed ? 'text-migblue' : ''}`}>
                  {achievement.name}
                </span>
                {achievement.completed && (
                  <Badge variant="outline" className="ml-2 border-green-500 text-green-600 text-xs">
                    Completed
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{achievement.reward}</div>
            </div>
            <div className="text-xs text-muted-foreground mb-2">{achievement.description}</div>
            <Progress value={achievement.progress} className="h-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameAchievements;
