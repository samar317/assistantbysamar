
import React from 'react';
import { Conversation } from '@/types';
import { cn } from '@/lib/utils';
import { MessageSquare, Plus, Trash2, Bot, MessageSquareDashed } from 'lucide-react';

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}) => {
  // Format conversation timestamp to be human-readable
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If today, show time only
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Otherwise, show date
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full h-full flex flex-col bg-transparent backdrop-blur-sm">
      <div className="p-4 border-b border-slate-200/70">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-4">
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-500 text-white">
            <Bot size={22} />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-slate-800">AI Assistant</h2>
            <p className="text-xs text-slate-500">Powered by Google Gemini</p>
          </div>
        </div>
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>New Conversation</span>
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto scrollbar-hidden px-2">
        {conversations.length === 0 ? (
          <div className="text-center py-8 px-4 text-slate-500">
            <MessageSquareDashed className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>No conversations yet</p>
            <p className="text-sm">Start a new conversation to begin</p>
          </div>
        ) : (
          <div className="py-3">
            <h3 className="text-xs font-medium text-slate-500 uppercase px-3 pb-2">Recent Conversations</h3>
            <ul className="space-y-1">
              {conversations.map((conversation) => (
                <li key={conversation.id} className="px-1">
                  <div
                    className={cn(
                      "flex items-start justify-between px-3 py-2.5 rounded-xl cursor-pointer gap-2 group",
                      currentConversationId === conversation.id
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : "hover:bg-slate-50 text-slate-800"
                    )}
                    onClick={() => onSelectConversation(conversation.id)}
                  >
                    <div className="flex-shrink-0">
                      <div className={cn(
                        "h-9 w-9 rounded-lg flex items-center justify-center",
                        currentConversationId === conversation.id
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-100 text-slate-600"
                      )}>
                        <MessageSquare size={16} />
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="font-medium truncate">{conversation.title}</div>
                      <div className="text-xs opacity-70 mt-0.5">{formatDate(conversation.timestamp)}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conversation.id);
                      }}
                      className={cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md",
                        currentConversationId === conversation.id
                          ? "hover:bg-blue-200 text-blue-600"
                          : "hover:bg-slate-200 text-slate-600"
                      )}
                      aria-label="Delete conversation"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-slate-200/70 text-xs text-center text-slate-500">
        Personal Web Assistant v1.0
      </div>
    </div>
  );
};

export default Sidebar;
