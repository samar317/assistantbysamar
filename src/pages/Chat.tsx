
import React from 'react';
import { Navigate } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';
import { AccountMenu } from '@/components/AccountMenu';
import { Watermark } from '@/components/Watermark';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion } from 'framer-motion';

const Chat = () => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-pulse text-lg text-blue-400 font-medium">Loading...</div>
      </div>
    );
  }
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-slate-900"
    >
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <AccountMenu variant="dark" />
      </div>
      <Watermark dark />
      <div className="h-full flex flex-col">
        <ChatInterface />
      </div>
    </motion.div>
  );
};

export default Chat;
