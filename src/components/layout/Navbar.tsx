
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react";

const Navbar = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const { isSmallScreen } = useMobileDetection();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  return (
    <nav className="bg-migblue text-white">
      
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold mr-6">Migme</Link>
          
          {!isSmallScreen && user && (
            <div className="flex space-x-4">
              <NavLink to="/chat">Chat</NavLink>
              <NavLink to="/friends">Friends</NavLink>
              <NavLink to="/gifts">Gifts</NavLink>
              <NavLink to="/games">Games</NavLink>
              <NavLink to="/store">Store</NavLink>
              {profile?.is_merchant && <NavLink to="/merchant">Merchant</NavLink>}
              {isAdmin() && <NavLink to="/admin">Admin</NavLink>}
            </div>
          )}
        </div>
        
        {user ? (
          <div className="flex items-center space-x-4">
            {!isSmallScreen && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} alt={profile?.username} />
                <AvatarFallback>{profile?.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            )}
            
            {!isSmallScreen && <span>{profile?.username}</span>}
            
            {!isSmallScreen && (
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Logout
              </Button>
            )}
            
            {isSmallScreen && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <AlignJustify className="h-[1.2rem] w-[1.2rem] rotate-0 sm:rotate-0" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="sm:w-64">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Navigate through the app
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <NavLink to="/chat" className="px-4 py-2 hover:bg-gray-100 rounded">Chat</NavLink>
                    <NavLink to="/friends" className="px-4 py-2 hover:bg-gray-100 rounded">Friends</NavLink>
                    <NavLink to="/gifts" className="px-4 py-2 hover:bg-gray-100 rounded">Gifts</NavLink>
                    <NavLink to="/games" className="px-4 py-2 hover:bg-gray-100 rounded">Games</NavLink>
                    <NavLink to="/store" className="px-4 py-2 hover:bg-gray-100 rounded">Store</NavLink>
                    {profile?.is_merchant && <NavLink to="/merchant" className="px-4 py-2 hover:bg-gray-100 rounded">Merchant</NavLink>}
                    {isAdmin() && <NavLink to="/admin" className="px-4 py-2 hover:bg-gray-100 rounded">Admin</NavLink>}
                    <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full">
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
      
    </nav>
  );
};

export default Navbar;
