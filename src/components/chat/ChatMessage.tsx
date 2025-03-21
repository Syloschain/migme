
import { format } from "date-fns";
import UserAvatar from "../profile/UserAvatar";
import UserRoleBadge from "../profile/UserRoleBadge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Heart } from "lucide-react";
import { useState } from "react";
import { UserRole } from "@/utils/roleUtils";

interface ChatMessageProps {
  id: string;
  content: string;
  timestamp: Date;
  sender: {
    id?: string; // Add sender id to determine if this message is from the current user
    username: string;
    avatarUrl?: string;
    level?: number;
    roles?: UserRole[];
    isVIP?: boolean;
  };
  isOwnMessage?: boolean;
}

const ChatMessage = ({
  id,
  content,
  timestamp,
  sender,
  isOwnMessage = false,
}: ChatMessageProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const toggleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className={`flex gap-2 mb-4 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-shrink-0 pt-1">
        <UserAvatar 
          username={sender.username} 
          avatarUrl={sender.avatarUrl}
          level={sender.level}
          showLevel
          status={isOwnMessage ? "online" : "offline"}
        />
      </div>
      
      <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div className="flex items-center gap-2 mb-1">
          <div className={`text-sm font-medium flex items-center gap-1 ${isOwnMessage ? 'order-2' : 'order-1'}`}>
            <UserRoleBadge 
              username={sender.username} 
              roles={sender.roles || ['user']}
              showTooltip={true}
              className="text-xs py-0 px-1"
              userId={sender.id} // Pass sender ID to determine if this is the current user
            />
            {sender.isVIP && (
              <span className="bg-migorange text-white text-[10px] px-1 py-0.5 rounded-sm font-bold">
                VIP
              </span>
            )}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={`text-xs text-muted-foreground ${isOwnMessage ? 'order-1 mr-1' : 'order-2 ml-1'}`}>
                  {format(timestamp, 'h:mm a')}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                {format(timestamp, 'PPP p')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div 
          className={`rounded-lg py-2 px-3 break-words ${
            isOwnMessage 
              ? 'bg-migblue text-white rounded-tr-none' 
              : 'bg-muted rounded-tl-none'
          }`}
        >
          {content}
        </div>
        
        {likeCount > 0 && (
          <div className="flex items-center gap-1 mt-1 text-xs">
            <Heart className="h-3 w-3 fill-migorange text-migorange" />
            <span>{likeCount}</span>
          </div>
        )}
        
        <div className="flex mt-1">
          <button 
            onClick={toggleLike}
            className="text-xs text-muted-foreground hover:text-migblue flex items-center gap-1"
          >
            <Heart className={`h-3 w-3 ${liked ? 'fill-migorange text-migorange' : ''}`} />
            {liked ? 'Liked' : 'Like'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
