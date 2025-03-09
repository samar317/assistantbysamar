
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable.");
    }

    const { prompt, history = [] } = await req.json();
    
    if (!prompt) {
      throw new Error("No prompt provided in the request");
    }
    
    console.log("Received request with prompt:", prompt);
    console.log("History items:", history.length);

    // Prepare conversation history for Gemini API
    const messages = [];
    
    // Format history into Gemini-compatible format
    for (const message of history) {
      if (message.role === 'user') {
        messages.push({
          role: "user",
          parts: [{ text: message.content }]
        });
      } else if (message.role === 'assistant') {
        messages.push({
          role: "model",
          parts: [{ text: message.content }]
        });
      }
    }
    
    // Add the current user message
    messages.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    // Prepare the request to Gemini API
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    
    const payload = {
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log("Sending request to Gemini API");
    
    // Add a timeout for the API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      // Call Gemini API with timeout
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId); // Clear timeout if request completed
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error: ${response.status}`, errorText);
        
        let errorMessage = "An error occurred while processing your request";
        
        try {
          // Try to parse error message from Google's API response
          const errorJson = JSON.parse(errorText);
          if (errorJson.error && errorJson.error.message) {
            errorMessage = errorJson.error.message;
          }
        } catch (e) {
          // If parsing fails, use the raw error text
          errorMessage = `Error ${response.status}: ${errorText.substring(0, 100)}`;
        }
        
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      console.log("Received response from Gemini API");
  
      // Extract the generated text from Gemini response
      let generatedText = "No response generated";
      
      if (data.candidates && data.candidates.length > 0 && 
          data.candidates[0].content && 
          data.candidates[0].content.parts && 
          data.candidates[0].content.parts.length > 0) {
        generatedText = data.candidates[0].content.parts[0].text;
      }
  
      // Return the response
      return new Response(JSON.stringify({ 
        response: generatedText 
      }), {
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        }
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        throw new Error("Request to Gemini API timed out. Please try again later.");
      }
      
      throw fetchError;
    }
    
  } catch (error) {
    console.error("Error in gemini-chat function:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred while processing your request" 
    }), {
      status: 500,
      headers: { 
        ...corsHeaders,
        "Content-Type": "application/json" 
      }
    });
  }
});
