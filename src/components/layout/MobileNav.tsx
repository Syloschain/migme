
import { Link } from "react-router-dom";
import { User, MessageSquare, Users, Gift, Home, Gamepad2, Store } from "lucide-react";

const MobileNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground py-2 px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex flex-col items-center p-2">
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/chat" className="flex flex-col items-center p-2">
          <MessageSquare size={20} />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link to="/games" className="flex flex-col items-center p-2">
          <Gamepad2 size={20} />
          <span className="text-xs mt-1">Games</span>
        </Link>
        <Link to="/store" className="flex flex-col items-center p-2">
          <Store size={20} />
          <span className="text-xs mt-1">Store</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center p-2">
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
