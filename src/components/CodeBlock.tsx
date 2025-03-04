
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, ClipboardCopy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, className }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <div 
      className={cn(
        'relative my-4 rounded-lg overflow-hidden border border-slate-200 bg-slate-50',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
        <div className="text-sm font-medium text-slate-600">{language}</div>
        <button
          onClick={copyCode}
          className="flex items-center justify-center h-8 w-8 rounded-md transition-colors hover:bg-slate-200"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <ClipboardCopy size={16} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-slate-800">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
