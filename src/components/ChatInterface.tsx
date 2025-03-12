
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Conversation, Message } from '@/types';
import { addMessageToConversation, deleteConversation, getConversations, saveConversation, createNewConversation } from '@/utils/historyManager';
import { detectCodeInResponse, generateResponse } from '@/utils/apiService';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { BackgroundDecoration } from './DecorativeElements';
import { Menu, X, ChevronDown, Bot, Mic, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from './ui/avatar';

const ChatInterface: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);

  // Get the user's name for welcome message
  const userName = user?.user_metadata?.username || 
                  (user?.email ? user.email.split('@')[0] : 'there');

  // Load conversations from localStorage on component mount
  useEffect(() => {
    const loadedConversations = getConversations();
    setConversations(loadedConversations);
    
    // If there are conversations, load the most recent one
    if (loadedConversations.length > 0) {
      setCurrentConversation(loadedConversations[0]);
      setShowWelcome(false);
    } else {
      // If no conversations exist, create a new one
      startNewConversation();
    }
  }, []);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  // Start a new conversation
  const startNewConversation = () => {
    const newConversation = createNewConversation();
    setCurrentConversation(newConversation);
    setConversations(prev => [newConversation, ...prev]);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Load an existing conversation
  const loadConversation = (id: string) => {
    const conversation = conversations.find(conv => conv.id === id) || null;
    setCurrentConversation(conversation);
    setShowWelcome(false);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Delete a conversation
  const handleDeleteConversation = (id: string) => {
    // Delete from localStorage
    deleteConversation(id);
    
    // Update state
    setConversations(prev => prev.filter(conv => conv.id !== id));
    
    // If the deleted conversation was the current one, load another or create new
    if (currentConversation?.id === id) {
      const remainingConversations = conversations.filter(conv => conv.id !== id);
      if (remainingConversations.length > 0) {
        setCurrentConversation(remainingConversations[0]);
      } else {
        startNewConversation();
      }
    }
    
    toast({
      title: "Conversation deleted",
      description: "The conversation has been permanently removed.",
    });
  };

  // Send a message and get a response
  const sendMessage = async (content: string) => {
    setShowWelcome(false);
    if (!currentConversation) return;
    
    setIsProcessing(true);
    
    try {
      // Add user message to conversation
      const conversationWithUserMessage = addMessageToConversation(
        currentConversation,
        content,
        'user'
      );
      
      // Update state with user message
      setCurrentConversation(conversationWithUserMessage);
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationWithUserMessage.id ? conversationWithUserMessage : conv
        )
      );
      
      // Add temporary loading message
      const loadingMessage: Message = {
        id: 'loading',
        content: '',
        role: 'assistant',
        timestamp: Date.now(),
        isLoading: true
      };
      
      setCurrentConversation(prev => prev ? {
        ...prev,
        messages: [...prev.messages, loadingMessage]
      } : null);
      
      // Generate response
      const responseText = await generateResponse(
        content, 
        conversationWithUserMessage.messages
      );
      
      // Remove loading message
      setCurrentConversation(prev => prev ? {
        ...prev,
        messages: prev.messages.filter(m => !m.isLoading)
      } : null);
      
      // Check if response contains code
      const containsCode = detectCodeInResponse(responseText);
      
      // Add assistant response to conversation
      const updatedConversation = addMessageToConversation(
        conversationWithUserMessage,
        responseText,
        'assistant',
        containsCode
      );
      
      // Update state with assistant response
      setCurrentConversation(updatedConversation);
      setConversations(prev => 
        prev.map(conv => 
          conv.id === updatedConversation.id ? updatedConversation : conv
        )
      );
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
      
      // Remove loading message
      setCurrentConversation(prev => prev ? {
        ...prev,
        messages: prev.messages.filter(m => !m.isLoading)
      } : null);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen flex bg-slate-900 text-white">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed md:relative inset-0 z-30 w-full max-w-[280px] md:block transition-all duration-300 bg-slate-800/90 backdrop-blur-md shadow-lg md:shadow-none border-r border-slate-700/70",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <Sidebar 
          conversations={conversations}
          currentConversationId={currentConversation?.id || null}
          onSelectConversation={loadConversation}
          onNewConversation={startNewConversation}
          onDeleteConversation={handleDeleteConversation}
        />
        
        {isMobile && (
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-700/80 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center px-4 md:px-6 border-b border-slate-700/70 bg-slate-800/70 backdrop-blur-md z-10">
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-3 p-2 rounded-md hover:bg-slate-700 text-slate-300"
            >
              <Menu size={20} />
            </button>
          )}
          
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 hover:bg-slate-700/50 px-3 py-1.5 rounded-full cursor-pointer">
              <h1 className="text-lg font-medium flex items-center gap-2">
                AI Assistant
              </h1>
              <ChevronDown size={16} className="text-slate-300" />
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <Avatar className="h-8 w-8 border border-slate-600">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white font-medium text-sm">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </div>
            </Avatar>
          </div>
        </header>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-slate-900 text-white">
          {showWelcome ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-md mx-auto"
              >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2">
                  Hello, {userName.toUpperCase()}
                </h1>
                <p className="text-slate-400 mt-6 text-lg">
                  How can I help you today?
                </p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <SuggestionPill 
                    text="Explain React hooks"
                    onClick={() => sendMessage("Explain React hooks and when to use them")} 
                  />
                  <SuggestionPill 
                    text="Create a countdown timer"
                    onClick={() => sendMessage("Write a countdown timer component in React")} 
                  />
                  <SuggestionPill 
                    text="Generate a color palette"
                    onClick={() => sendMessage("Suggest a modern color palette for a professional website")} 
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="p-4 md:p-6">
              {currentConversation?.messages.length ? (
                currentConversation.messages.map((message, index) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    isLast={index === currentConversation.messages.length - 1}
                  />
                ))
              ) : null}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="p-4 md:p-6 border-t border-slate-700/70 bg-slate-800/70 backdrop-blur-md">
          <div className="relative">
            <MessageInput 
              onSendMessage={sendMessage} 
              isProcessing={isProcessing}
            />
            <AnimatePresence>
              {!isProcessing && (
                <motion.div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button className="p-2 text-slate-400 hover:text-slate-100 transition-colors">
                    <Mic size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-2 text-xs text-center text-slate-500">
            <span>Powered by OpenAI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuggestionPill = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm hover:bg-slate-700 transition-all"
    >
      {text}
    </button>
  );
};

export default ChatInterface;
