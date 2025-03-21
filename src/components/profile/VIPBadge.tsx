
import { Crown } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface VIPBadgeProps {
  level?: number;
  className?: string;
}

const VIPBadge = ({ level = 1, className }: VIPBadgeProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
          <Crown size={12} className="text-yellow-600" />
          <span>VIP {level}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-semibold">VIP Member Benefits</h4>
          <ul className="text-sm space-y-1">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
              <span>Exclusive virtual gifts</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
              <span>Special profile badge</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
              <span>Priority support</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
              <span>Create up to 5 chat rooms</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
              <span>Daily bonus credits</span>
            </li>
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default VIPBadge;
