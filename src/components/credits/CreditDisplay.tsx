
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

interface CreditDisplayProps {
  credits?: number;
  showBuyButton?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CreditDisplay = ({ showBuyButton = true, size = "md", className, credits: propCredits }: CreditDisplayProps) => {
  const { profile } = useAuth();
  const [credits, setCredits] = useState(propCredits || 0);

  useEffect(() => {
    if (profile && profile.credit_balance !== undefined) {
      setCredits(profile.credit_balance);
    } else if (propCredits !== undefined) {
      setCredits(propCredits);
    }
  }, [profile, propCredits]);

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className={`flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full ${sizeClasses[size]} font-medium cursor-help`}>
            <Coins size={iconSizes[size]} className="text-amber-600" />
            <span>{credits.toLocaleString()}</span>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-64">
          <div className="space-y-2">
            <h4 className="font-semibold">migCredits</h4>
            <p className="text-sm text-muted-foreground">
              Use credits to send gifts, play games, and purchase premium content.
            </p>
            <div className="text-sm">
              <div className="font-medium">Ways to earn credits:</div>
              <ul className="pl-5 list-disc space-y-1 mt-1 text-sm">
                <li>Daily login bonus</li>
                <li>Leveling up</li>
                <li>Winning games</li>
                <li>Referring friends</li>
              </ul>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      
      {showBuyButton && (
        <Button variant="outline" size="sm" className="h-7" asChild>
          <a href="/store">Buy Credits</a>
        </Button>
      )}
    </div>
  );
};

export default CreditDisplay;
