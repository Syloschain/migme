
import { cn } from "@/lib/utils";
import { getUserRoleColor, formatRoleName, UserRole } from "@/utils/roleUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserRoleBadgeProps {
  roles?: UserRole[];
  username: string;
  className?: string;
  showTooltip?: boolean;
}

const UserRoleBadge = ({ 
  roles = ['user'], 
  username, 
  className,
  showTooltip = true
}: UserRoleBadgeProps) => {
  const color = getUserRoleColor(roles);
  
  const badgeContent = (
    <span 
      className={cn(
        "px-2 py-0.5 rounded-sm text-white font-medium",
        className
      )} 
      style={{ backgroundColor: color }}
    >
      {username}
    </span>
  );

  if (!showTooltip) {
    return badgeContent;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col">
            <span className="font-semibold">{username}</span>
            <span className="text-xs">
              {roles.map(formatRoleName).join(", ")}
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserRoleBadge;
