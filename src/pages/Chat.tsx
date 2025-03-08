
import React from 'react';
import { Navigate } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';
import { AccountMenu } from '@/components/AccountMenu';
import { Watermark } from '@/components/Watermark';

const Chat = () => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-pulse text-lg text-blue-600 font-medium">Loading...</div>
      </div>
    );
  }
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="fixed top-4 right-4 z-50">
        <AccountMenu />
      </div>
      <Watermark dark />
      <div className="h-full flex flex-col">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;
