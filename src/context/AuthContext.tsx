// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiClient } from '@/services/ApiClient';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/utils/roleUtils";

interface AuthContextType {
  user: any;
  session: any;
  profile: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, session?: any, error?: string }>;
  signUp: (email: string, password: string, username: string) => Promise<{ success: boolean, user?: any, error?: string }>;
  signOut: () => Promise<{ success: boolean, error?: string }>;
  updateProfile: (updates: any) => Promise<{ success: boolean, profile?: any, error?: string }>;
  hasRole: (role: UserRole) => boolean;
  isAdmin: () => boolean;
  isRoomModerator: (roomId: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Setup the auth state listener
    const { data: { subscription } } = ApiClient.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession);
        setSession(newSession);
        setUser(newSession?.user || null);
        
        // Fetch user profile when session changes
        if (newSession?.user) {
          try {
            const profileData = await ApiClient.getProfile(newSession.user.id);
            setProfile(profileData);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        } else {
          setProfile(null);
        }
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out",
          });
          navigate('/login');
        }
      }
    );

    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await ApiClient.getSession();
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        // Fetch user profile if session exists
        if (currentSession?.user) {
          try {
            const profileData = await ApiClient.getProfile(currentSession.user.id);
            setProfile(profileData);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setLoading(false);
      }
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const signIn = async (email: string, password: string) => {
    try {
      const { session } = await ApiClient.signIn(email, password);
      return { success: true, session };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { user } = await ApiClient.signUp(email, password, username);
      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await ApiClient.signOut();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      const updatedProfile = await ApiClient.updateProfile(user.id, updates);
      setProfile({...profile, ...updates});
      return { success: true, profile: updatedProfile };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  // Check if the current user has a specific role
  const hasRole = (role: UserRole): boolean => {
    if (!profile || !profile.roles) return false;
    return profile.roles.includes(role);
  };
  
  // Check if the current user is an admin
  const isAdmin = (): boolean => {
    return profile?.is_admin || false;
  };
  
  // Check if the current user is a moderator of a specific room
  const isRoomModerator = async (roomId: string): Promise<boolean> => {
    if (!user) return false;
    try {
      const result = await ApiClient.checkRoomRole(user.id, roomId);
      return result.is_moderator || result.is_owner || profile?.is_admin;
    } catch (error) {
      console.error('Error checking room role:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session,
        profile,
        loading,
        signIn, 
        signUp, 
        signOut,
        updateProfile,
        hasRole,
        isAdmin,
        isRoomModerator,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
