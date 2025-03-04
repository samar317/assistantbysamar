
import React from 'react';
import { Navigate } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';

const Chat = () => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking auth
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="h-full flex flex-col">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;
