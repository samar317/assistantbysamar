
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  isCode?: boolean;
  isLoading?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  timestamp: number;
  messages: Message[];
}

export interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  startNewConversation: () => void;
  loadConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  sendMessage: (message: string) => Promise<void>;
  isProcessing: boolean;
}
