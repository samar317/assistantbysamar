
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2, Sparkles } from 'lucide-react';
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
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
      <div className="relative flex items-center bg-white rounded-2xl pr-2 shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isProcessing}
          className={cn(
            "w-full py-3 px-4 pr-14 max-h-[200px] bg-transparent resize-none",
            "focus:outline-none focus:ring-0 placeholder:text-slate-400",
            "rounded-2xl text-slate-800",
            isProcessing && "opacity-70"
          )}
          rows={1}
        />
        <button
          type="submit"
          disabled={!message.trim() || isProcessing}
          className={cn(
            "absolute right-2 bg-blue-600 h-10 w-10 rounded-xl flex items-center justify-center transition-all",
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
      <div className="flex justify-center mt-2">
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <Sparkles size={12} /> Powered by Google Gemini
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
