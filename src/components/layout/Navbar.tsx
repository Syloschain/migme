
import { Link } from "react-router-dom";
import { User, MessageSquare, Users, Gift, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreditDisplay from "../credits/CreditDisplay";
import NotificationIndicator from "./NotificationIndicator";

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground py-3 px-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">migme</h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="flex items-center gap-1 hover:text-primary-foreground/80">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/chat" className="flex items-center gap-1 hover:text-primary-foreground/80">
            <MessageSquare size={20} />
            <span>Chat</span>
          </Link>
          <Link to="/friends" className="flex items-center gap-1 hover:text-primary-foreground/80">
            <Users size={20} />
            <span>Friends</span>
          </Link>
          <Link to="/gifts" className="flex items-center gap-1 hover:text-primary-foreground/80">
            <Gift size={20} />
            <span>Gifts</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-1 hover:text-primary-foreground/80">
            <User size={20} />
            <span>Profile</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <CreditDisplay credits={500} size="sm" showBuyButton={false} className="hidden sm:flex" />
          <NotificationIndicator count={2} />
          <Button variant="secondary" size="sm" className="flex items-center gap-1">
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
