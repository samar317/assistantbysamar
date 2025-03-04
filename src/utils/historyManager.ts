
import { Conversation, Message } from '@/types';

// Generate unique IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all conversations from localStorage
export const getConversations = (): Conversation[] => {
  const storedConversations = localStorage.getItem('conversations');
  return storedConversations ? JSON.parse(storedConversations) : [];
};

// Get a specific conversation by ID
export const getConversationById = (id: string): Conversation | null => {
  const conversations = getConversations();
  return conversations.find(conv => conv.id === id) || null;
};

// Save a conversation to localStorage
export const saveConversation = (conversation: Conversation): void => {
  const conversations = getConversations();
  
  const existingIndex = conversations.findIndex(conv => conv.id === conversation.id);
  
  if (existingIndex >= 0) {
    // Update existing conversation
    conversations[existingIndex] = conversation;
  } else {
    // Add new conversation
    conversations.unshift(conversation);
  }
  
  localStorage.setItem('conversations', JSON.stringify(conversations));
};

// Delete a conversation from localStorage
export const deleteConversation = (id: string): void => {
  const conversations = getConversations();
  const updatedConversations = conversations.filter(conv => conv.id !== id);
  localStorage.setItem('conversations', JSON.stringify(updatedConversations));
};

// Create a new empty conversation
export const createNewConversation = (): Conversation => {
  return {
    id: generateId(),
    title: 'New Conversation',
    timestamp: Date.now(),
    messages: [],
  };
};

// Add a message to a conversation
export const addMessageToConversation = (
  conversation: Conversation,
  content: string,
  role: 'user' | 'assistant',
  isCode: boolean = false
): Conversation => {
  // Generate a new message
  const newMessage: Message = {
    id: generateId(),
    content,
    role,
    timestamp: Date.now(),
    isCode,
  };
  
  // Update conversation with new message
  const updatedConversation = {
    ...conversation,
    messages: [...conversation.messages, newMessage],
    timestamp: Date.now(),
  };
  
  // If this is the first user message, set it as the conversation title
  if (role === 'user' && conversation.messages.length === 0) {
    updatedConversation.title = content.length > 60 
      ? content.substring(0, 57) + '...' 
      : content;
  }
  
  // Save the updated conversation to localStorage
  saveConversation(updatedConversation);
  
  return updatedConversation;
};
