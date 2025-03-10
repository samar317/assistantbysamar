
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
      console.error("OpenAI API key is not configured");
      return new Response(
        JSON.stringify({
          error: "OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable."
        }),
        { 
          status: 200, // Return 200 even for configuration errors
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const requestData = await req.json().catch(error => {
      console.error("Error parsing request JSON:", error);
      return null;
    });
    
    if (!requestData) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const { prompt, size = "1024x1024", model = "dall-e-3", quality = "standard" } = requestData;
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "No prompt provided in the request" }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    console.log("Received request with prompt:", prompt);
    console.log("Parameters:", { size, model, quality });

    // Call OpenAI's DALL-E API to generate an image
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        model: model,
        n: 1,
        size: size,
        quality: quality,
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
      
      // Return a 200 status code even for OpenAI API errors
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const data = await response.json();
    console.log("Received response from OpenAI API");

    // Return the image URL and other metadata
    return new Response(
      JSON.stringify({ 
        imageUrl: data.data[0].url,
        model: model,
        size: size,
        quality: quality,
        promptUsed: prompt,
        timestamp: new Date().toISOString()
      }), 
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error in generate-image function:", error);
    
    // Return a 200 status code even for unexpected errors
    return new Response(
      JSON.stringify({ 
        error: error.message || "An error occurred while generating the image" 
      }), 
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
