
// This is a placeholder for the Google Gemini API integration
// In a real application, you would add your API key and use the Gemini SDK

import { Message } from '@/types';

// Function to detect if a response contains code
export const detectCodeInResponse = (text: string): boolean => {
  // Check for Markdown code blocks
  return /```[\s\S]*?```/.test(text);
};

// Function to extract code blocks from a response
export const extractCodeFromResponse = (text: string): { code: string, language: string } => {
  const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/;
  const match = text.match(codeBlockRegex);
  
  if (match) {
    const language = match[1] || 'javascript';
    const code = match[2].trim();
    return { code, language };
  }
  
  return { code: text, language: 'text' };
};

// Placeholder for Gemini API call
// In a real app, this would use the actual Gemini API
export const generateResponse = async (prompt: string, history: Message[] = []): Promise<string> => {
  console.log('Sending message to API:', prompt);
  console.log('With history:', history);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // This is a mock response for demonstration purposes
  if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi')) {
    return "Hello! I'm your personal web assistant powered by Google Gemini. How can I help you today?";
  }
  
  if (prompt.toLowerCase().includes('code') || prompt.toLowerCase().includes('function') || prompt.toLowerCase().includes('react')) {
    return "Here's a sample React component that displays a counter:\n\n```jsx\nimport React, { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div className=\"p-4 rounded-lg bg-white shadow-sm\">\n      <h2 className=\"text-lg font-medium\">Counter: {count}</h2>\n      <div className=\"mt-4 flex space-x-2\">\n        <button\n          onClick={() => setCount(count - 1)}\n          className=\"px-3 py-1 bg-red-100 text-red-700 rounded-md\"\n        >\n          Decrease\n        </button>\n        <button\n          onClick={() => setCount(count + 1)}\n          className=\"px-3 py-1 bg-green-100 text-green-700 rounded-md\"\n        >\n          Increase\n        </button>\n      </div>\n    </div>\n  );\n};\n\nexport default Counter;\n```\n\nYou can use this component in your React application to implement a simple counter with increase and decrease functionality.";
  }
  
  if (prompt.toLowerCase().includes('help') || prompt.toLowerCase().includes('can you')) {
    return "I'm a personal web assistant that can help you with various tasks:\n\n1. Answering questions about web development\n2. Generating code snippets\n3. Explaining programming concepts\n4. Providing guidance on best practices\n\nJust ask me what you need help with, and I'll do my best to assist you!";
  }
  
  return "I understand you're asking about \"" + prompt + "\". While I'm a demo version without a real API connection, in a fully implemented version, I would provide a helpful and informative response to your query using the Google Gemini API. To see some example responses, try asking about 'code', 'help', or just say 'hello'.";
};

// Function to add API key (would be used in a real implementation)
export const setApiKey = (apiKey: string): void => {
  localStorage.setItem('gemini_api_key', apiKey);
};

// Function to get API key (would be used in a real implementation)
export const getApiKey = (): string | null => {
  return localStorage.getItem('gemini_api_key');
};

// Function to check if API key exists
export const hasApiKey = (): boolean => {
  return !!localStorage.getItem('gemini_api_key');
};
