
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Notification {
  id: string;
  message: string;
  time: Date;
  read: boolean;
  type: "friend" | "gift" | "game" | "system";
}

interface NotificationIndicatorProps {
  count?: number;
}

const NotificationIndicator = ({ count = 0 }: NotificationIndicatorProps) => {
  const notifications: Notification[] = [
    {
      id: "1",
      message: "coolcat99 sent you a friend request",
      time: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      type: "friend",
    },
    {
      id: "2",
      message: "migstar42 sent you a gift",
      time: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      type: "gift",
    },
    {
      id: "3",
      message: "You earned 50 XP from Trivia game",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
      type: "game",
    },
    {
      id: "4",
      message: "Welcome to migme! Complete your profile to get started.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      type: "system",
    },
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b">
          <div className="font-semibold">Notifications</div>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 ${notification.read ? "" : "bg-muted/40"}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(notification.time)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
        <div className="p-2 border-t text-center">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationIndicator;
