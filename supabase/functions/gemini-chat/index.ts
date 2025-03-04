
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

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
    const { prompt, history = [] } = await req.json();
    
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
    
    // Call Gemini API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
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
