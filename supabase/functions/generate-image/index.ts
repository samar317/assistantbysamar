
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

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
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.");
    }

    const { prompt } = await req.json();
    
    if (!prompt) {
      throw new Error("No prompt provided in the request");
    }
    
    console.log("Received request with prompt:", prompt);

    // Call OpenAI's DALL-E API to generate an image
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status}`, errorText);
      
      let errorMessage = "An error occurred while generating the image";
      
      try {
        // Try to parse error message from OpenAI's API response
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
    console.log("Received response from OpenAI API");

    // Return the image URL
    return new Response(JSON.stringify({ 
      imageUrl: data.data[0].url 
    }), {
      headers: { 
        ...corsHeaders,
        "Content-Type": "application/json" 
      }
    });
    
  } catch (error) {
    console.error("Error in generate-image function:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message || "An error occurred while generating the image" 
    }), {
      status: 500,
      headers: { 
        ...corsHeaders,
        "Content-Type": "application/json" 
      }
    });
  }
});
