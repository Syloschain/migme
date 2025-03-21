
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OnlineUserCounterProps {
  count?: number;
}

const OnlineUserCounter = ({ count = 1284 }: OnlineUserCounterProps) => {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="flex gap-1.5 items-center py-1 px-2 border-migblue bg-migblue bg-opacity-20">
        <div className="h-2 w-2 rounded-full bg-miggreen animate-pulse" />
        <span className="text-migblue-dark font-medium flex items-center">
          <Users className="h-3.5 w-3.5 mr-1" /> {count.toLocaleString()} Online
        </span>
      </Badge>
    </div>
  );
};

export default OnlineUserCounter;
