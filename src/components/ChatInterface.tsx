
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
import { BackgroundDecoration, ImageDecoration } from './DecorativeElements';
import { Menu, X, MessageSquareDashed, Bot, Sparkles } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Load conversations from localStorage on component mount
  useEffect(() => {
    const loadedConversations = getConversations();
    setConversations(loadedConversations);
    
    // If there are conversations, load the most recent one
    if (loadedConversations.length > 0) {
      setCurrentConversation(loadedConversations[0]);
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
    <div className="h-screen flex">
      <BackgroundDecoration />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed md:relative inset-0 z-30 w-full max-w-[280px] md:block transition-all duration-300 bg-white/90 backdrop-blur-md shadow-lg md:shadow-none border-r border-slate-200/70",
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
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-slate-600 hover:bg-white hover:text-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center px-4 md:px-6 border-b border-slate-200/70 bg-white/70 backdrop-blur-md z-10">
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-3 p-2 rounded-md hover:bg-slate-100 text-slate-600"
            >
              <Menu size={20} />
            </button>
          )}
          <h1 className="text-lg font-medium flex items-center gap-2">
            <span className="hidden sm:inline">{currentConversation?.title || 'New Conversation'}</span>
            <span className="inline sm:hidden">Chat</span>
          </h1>
        </header>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-transparent">
          {currentConversation?.messages.length ? (
            currentConversation.messages.map((message, index) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isLast={index === currentConversation.messages.length - 1}
              />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="max-w-2xl mx-auto grid md:grid-cols-5 gap-8 items-center">
                <div className="col-span-3 space-y-6 text-center md:text-left order-2 md:order-1">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Sparkles size={28} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">Your Personal AI Assistant</h2>
                  <p className="text-slate-500 text-lg">
                    Ask me questions, request code examples, or get help with your web development projects.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
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
                </div>
                <div className="hidden md:block md:col-span-2 order-1 md:order-2">
                  <ImageDecoration className="w-full aspect-square md:aspect-video" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-4 md:p-6 border-t border-slate-200/70 bg-white/70 backdrop-blur-md">
          <MessageInput 
            onSendMessage={sendMessage} 
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

const SuggestionPill = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-full text-sm shadow-sm hover:shadow transition-all"
    >
      {text}
    </button>
  );
};

export default ChatInterface;
