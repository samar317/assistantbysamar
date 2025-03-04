import React from 'react';
import { Conversation } from '@/types';
import { cn } from '@/lib/utils';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';

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
    <div className="w-full h-full flex flex-col bg-white border-r border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={18} />
          <span>New Conversation</span>
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto scrollbar-hidden">
        {conversations.length === 0 ? (
          <div className="text-center py-8 px-4 text-slate-500">
            <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>No conversations yet</p>
            <p className="text-sm">Start a new conversation to begin</p>
          </div>
        ) : (
          <ul className="py-2">
            {conversations.map((conversation) => (
              <li key={conversation.id} className="px-2 py-1">
                <div
                  className={cn(
                    "flex items-start justify-between px-3 py-2.5 rounded-lg cursor-pointer gap-2 group",
                    currentConversationId === conversation.id
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-slate-100 text-slate-800"
                  )}
                  onClick={() => onSelectConversation(conversation.id)}
                >
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
        )}
      </div>
      
      <div className="p-3 border-t border-slate-200 text-xs text-center text-slate-500">
        Personal Web Assistant
      </div>
    </div>
  );
};

export default Sidebar;
