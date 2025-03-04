
import React from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="h-full flex flex-col">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
