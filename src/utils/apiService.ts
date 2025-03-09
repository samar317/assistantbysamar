
import { Message } from '@/types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/use-toast';

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

// Call the Gemini API through our Supabase Edge Function
export const generateResponse = async (prompt: string, history: Message[] = []): Promise<string> => {
  console.log('Sending message to Gemini API:', prompt);
  console.log('With history:', history);

  try {
    // Call our Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('gemini-chat', {
      body: { prompt, history }
    });

    if (error) {
      console.error('Error calling Gemini API:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to the AI service. Please try again later.",
        variant: "destructive",
      });
      throw new Error(`Error calling Gemini API: ${error.message}`);
    }

    if (data && data.response) {
      return data.response;
    } else if (data && data.error) {
      toast({
        title: "API Error",
        description: data.error,
        variant: "destructive",
      });
      throw new Error(`API Error: ${data.error}`);
    } else {
      toast({
        title: "Unexpected Response",
        description: "Received an unexpected response format from the API.",
        variant: "destructive",
      });
      throw new Error('Unexpected response format from API');
    }
  } catch (error) {
    console.error('Error generating response:', error);
    
    // Return a more helpful error message that doesn't look like it's from the AI
    return "I couldn't process your request at the moment. There seems to be a connection issue with the AI service. Please check your network connection and try again in a few moments.";
  }
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
