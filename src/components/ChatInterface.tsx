
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
import { Menu, X } from 'lucide-react';

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
    <div className="h-full flex">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed md:static inset-0 z-20 w-full max-w-[280px] md:block transition-transform duration-300 bg-white shadow-md md:shadow-none",
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
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="h-14 flex items-center px-4 border-b border-slate-200 bg-white">
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-3 p-2 rounded-md hover:bg-slate-100 text-slate-600"
            >
              <Menu size={20} />
            </button>
          )}
          <h1 className="text-lg font-medium">{currentConversation?.title || 'New Conversation'}</h1>
        </header>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
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
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-slate-800 mb-2">Welcome to your Personal Assistant</h2>
              <p className="text-slate-500 max-w-md">
                Ask me questions, request code examples, or get help with your web development projects.
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <MessageInput 
            onSendMessage={sendMessage} 
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
