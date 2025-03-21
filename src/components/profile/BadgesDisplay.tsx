
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Shield, Zap, Heart, ThumbsUp, Gift } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earnedDate?: string;
}

interface BadgesDisplayProps {
  badges: UserBadge[];
}

export const defaultBadges: UserBadge[] = [
  {
    id: "early-adopter",
    name: "Early Adopter",
    description: "Joined migme during the beta period",
    icon: <Star className="h-4 w-4" />,
    color: "bg-amber-100 text-amber-800 border-amber-200",
    earnedDate: "2023-01-15"
  },
  {
    id: "chatterbox",
    name: "Chatterbox",
    description: "Sent over 1,000 chat messages",
    icon: <Zap className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    earnedDate: "2023-02-22"
  },
  {
    id: "gift-master",
    name: "Gift Master",
    description: "Sent gifts to 50 different users",
    icon: <Gift className="h-4 w-4" />,
    color: "bg-pink-100 text-pink-800 border-pink-200",
    earnedDate: "2023-03-10"
  },
  {
    id: "popular",
    name: "Popular",
    description: "Received 100+ friend requests",
    icon: <Heart className="h-4 w-4" />,
    color: "bg-red-100 text-red-800 border-red-200",
    earnedDate: "2023-04-05"
  },
  {
    id: "supporter",
    name: "Supporter",
    description: "Became a VIP member for 3 months",
    icon: <ThumbsUp className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    earnedDate: "2023-05-18"
  },
  {
    id: "game-champion",
    name: "Game Champion",
    description: "Won 25 games of LowCards",
    icon: <Trophy className="h-4 w-4" />,
    color: "bg-green-100 text-green-800 border-green-200",
    earnedDate: "2023-06-30"
  },
  {
    id: "moderator",
    name: "Moderator",
    description: "Helped moderate chat rooms and keep the community safe",
    icon: <Shield className="h-4 w-4" />,
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    earnedDate: "2023-07-12"
  },
  {
    id: "verified",
    name: "Verified",
    description: "Identity verified by migme team",
    icon: <Award className="h-4 w-4" />,
    color: "bg-teal-100 text-teal-800 border-teal-200",
    earnedDate: "2023-08-25"
  }
];

const BadgesDisplay = ({ badges = defaultBadges }: BadgesDisplayProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Badges & Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3">
          {badges.map((badge) => (
            <HoverCard key={badge.id}>
              <HoverCardTrigger asChild>
                <div 
                  className={`${badge.color} border rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-help`}
                >
                  {badge.icon}
                  <span className="text-xs font-medium text-center">{badge.name}</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {badge.icon}
                    <h4 className="font-semibold">{badge.name}</h4>
                  </div>
                  {badge.earnedDate && (
                    <Badge variant="outline" className="text-xs">
                      Earned {new Date(badge.earnedDate).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {badge.description}
                </p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgesDisplay;
