
import React from 'react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import CodeBlock from './CodeBlock';
import { extractCodeFromResponse } from '@/utils/apiService';
import { Bot, User, Code } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast = false }) => {
  const isUser = message.role === 'user';
  
  // Format timestamp
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Handle code blocks if present in assistant messages
  const renderContent = () => {
    if (message.isLoading) {
      return (
        <div className="flex space-x-2 items-center">
          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
        </div>
      );
    }

    if (isUser) {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
    }

    if (message.isCode) {
      const { code, language } = extractCodeFromResponse(message.content);
      return (
        <div>
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            <Code size={16} />
            <span className="text-sm font-medium">Code Sample</span>
          </div>
          <CodeBlock code={code} language={language} />
        </div>
      );
    }

    // Check for code blocks within the message
    if (message.content.includes('```')) {
      const parts = [];
      let lastIndex = 0;
      let match;
      const regex = /```(\w+)?\n([\s\S]*?)```/g;

      while ((match = regex.exec(message.content)) !== null) {
        // Add text before code block
        if (match.index > lastIndex) {
          parts.push(
            <p key={`text-${lastIndex}`} className="whitespace-pre-wrap mb-4">
              {message.content.slice(lastIndex, match.index)}
            </p>
          );
        }

        // Add code block
        const language = match[1] || 'javascript';
        const code = match[2];
        parts.push(
          <div key={`code-${match.index}`} className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <Code size={16} />
              <span className="text-sm font-medium">{language.charAt(0).toUpperCase() + language.slice(1)}</span>
            </div>
            <CodeBlock key={`code-${match.index}`} code={code} language={language} />
          </div>
        );

        lastIndex = match.index + match[0].length;
      }

      // Add any remaining text after the last code block
      if (lastIndex < message.content.length) {
        parts.push(
          <p key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {message.content.slice(lastIndex)}
          </p>
        );
      }

      return <>{parts}</>;
    }

    return <p className="whitespace-pre-wrap">{message.content}</p>;
  };

  return (
    <div 
      className={cn(
        "flex w-full mb-5 gap-4 message-appear max-w-4xl mx-auto",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600 flex-shrink-0 shadow-sm">
          <Bot size={20} />
        </div>
      )}
      
      <div 
        className={cn(
          "max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4",
          isUser 
            ? "bg-blue-600 text-white shadow-md" 
            : "bg-white border border-slate-200 text-slate-800 shadow-sm",
          isLast && "animate-in"
        )}
      >
        {renderContent()}
        <div 
          className={cn(
            "text-xs mt-2 text-right",
            isUser ? "text-blue-200" : "text-slate-500"
          )}
        >
          {formattedTime}
        </div>
      </div>

      {isUser && (
        <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-200 text-slate-600 flex-shrink-0 shadow-sm">
          <User size={20} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
