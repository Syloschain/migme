
// AppWrapper.jsx - Container for the authenticated app
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ApiClient } from '@/services/ApiClient';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';

const AppWrapper = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user) {
      // Update user status to online when they log in
      const updateStatus = async () => {
        try {
          await ApiClient.updateProfile(user.id, { status: 'online' });
        } catch (error) {
          console.error('Failed to update status:', error);
        }
      };
      
      updateStatus();
      
      // Set status to offline when leaving
      const handleBeforeUnload = () => {
        // Use sendBeacon for more reliable delivery
        const status = { status: 'offline' };
        navigator.sendBeacon(
          `${import.meta.env.SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`,
          JSON.stringify(status)
        );
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        // Update status to offline when component unmounts
        ApiClient.updateProfile(user.id, { status: 'offline' })
          .catch(error => console.error('Failed to update status:', error));
      };
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-migblue"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return <Layout>{children}</Layout>;
};

export default AppWrapper;
