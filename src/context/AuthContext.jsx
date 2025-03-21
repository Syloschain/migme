
// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiClient } from '@/services/ApiClient';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
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

  const signIn = async (email, password) => {
    try {
      const { session } = await ApiClient.signIn(email, password);
      return { success: true, session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email, password, username) => {
    try {
      const { user } = await ApiClient.signUp(email, password, username);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await ApiClient.signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      const updatedProfile = await ApiClient.updateProfile(user.id, updates);
      setProfile({...profile, ...updates});
      return { success: true, profile: updatedProfile };
    } catch (error) {
      return { success: false, error: error.message };
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
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
