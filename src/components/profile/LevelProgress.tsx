
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface LevelProgressProps {
  level: number;
  currentPoints: number;
  nextLevelPoints: number;
  className?: string;
}

const LevelProgress = ({ level, currentPoints, nextLevelPoints, className }: LevelProgressProps) => {
  const progressPercentage = Math.min(Math.round((currentPoints / nextLevelPoints) * 100), 100);
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-help">
              <div className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-semibold">
                Level {level}
              </div>
              <span className="text-xs text-muted-foreground">
                {currentPoints}/{nextLevelPoints} XP
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-semibold">migLevel Benefits</h4>
              <p className="text-sm text-muted-foreground">
                Reach higher levels to unlock more features!
              </p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Level 10: Become a moderator</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Level 20: Create chat groups</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Level 30: Special profile badge</span>
                </li>
              </ul>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default LevelProgress;
