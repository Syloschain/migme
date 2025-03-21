
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type StatusType = "online" | "away" | "busy" | "offline";

interface UserAvatarProps {
  username: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
  status?: StatusType;
  showStatus?: boolean;
  level?: number;
  showLevel?: boolean;
}

const statusColors = {
  online: "bg-miggreen",
  away: "bg-amber-500",
  busy: "bg-migorange",
  offline: "bg-gray-400"
};

const UserAvatar = ({ 
  username, 
  avatarUrl, 
  size = "md", 
  status = "offline",
  showStatus = true,
  level,
  showLevel = false
}: UserAvatarProps) => {
  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14"
  };

  const levelBadgeSize = {
    sm: "text-[8px] h-3.5 w-3.5",
    md: "text-[10px] h-4 w-4",
    lg: "text-xs h-5 w-5"
  };

  const statusBadgeSize = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3"
  };

  const statusPosition = {
    sm: "-bottom-0.5 -right-0.5",
    md: "-bottom-0.5 -right-0.5",
    lg: "-bottom-1 -right-1"
  };

  const levelPosition = {
    sm: "-top-0.5 -right-0.5",
    md: "-top-0.5 -right-0.5",
    lg: "-top-1 -right-1"
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative inline-block">
            <Avatar className={`${sizeClasses[size]} bg-migblue-light`}>
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback className="bg-migblue text-white">
                {getInitials(username)}
              </AvatarFallback>
            </Avatar>
            
            {showStatus && (
              <span 
                className={`absolute ${statusPosition[size]} ${statusBadgeSize[size]} ${statusColors[status]} rounded-full border-2 border-background`}
                aria-label={`Status: ${status}`}
              />
            )}
            
            {showLevel && level !== undefined && (
              <span 
                className={`absolute ${levelPosition[size]} ${levelBadgeSize[size]} rounded-full bg-migorange text-white flex items-center justify-center font-bold border-2 border-background`}
                aria-label={`Level: ${level}`}
              >
                {level}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm font-medium">{username}</div>
          {showLevel && level !== undefined && <div className="text-xs">Level {level}</div>}
          {showStatus && <div className="text-xs capitalize">{status}</div>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserAvatar;
