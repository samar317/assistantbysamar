
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isProcessing,
  placeholder = "Ask me anything..." 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center surface-glass rounded-full pr-1">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isProcessing}
          className={cn(
            "w-full py-3 px-4 pr-12 max-h-[200px] bg-transparent resize-none",
            "focus:outline-none focus:ring-0 placeholder:text-slate-400",
            "rounded-full text-slate-800",
            isProcessing && "opacity-70"
          )}
          rows={1}
        />
        <button
          type="submit"
          disabled={!message.trim() || isProcessing}
          className={cn(
            "absolute right-1 bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-all",
            "text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed",
          )}
        >
          {isProcessing ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <ArrowUp size={18} />
          )}
        </button>
      </div>
      <div className="h-6"></div>
    </form>
  );
};

export default MessageInput;
