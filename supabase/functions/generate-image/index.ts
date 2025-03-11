
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const HUGGING_FACE_TOKEN = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');

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
    if (!HUGGING_FACE_TOKEN) {
      console.error("Hugging Face token is not configured");
      return new Response(
        JSON.stringify({
          error: "Hugging Face token is not configured. Please set the HUGGING_FACE_ACCESS_TOKEN environment variable."
        }),
        { 
          status: 200,
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
    
    const { prompt, size = "1024x1024" } = requestData;
    
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
    console.log("Parameters:", { size });

    // Call Hugging Face API to generate an image - removed negative_prompt parameter
    const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Hugging Face API error: ${response.status}`, errorText);
      
      let errorMessage = "An error occurred while generating the image";
      
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) {
          errorMessage = errorJson.error;
        }
      } catch (e) {
        errorMessage = `Error ${response.status}: ${errorText.substring(0, 100)}`;
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get the image as a blob and convert to base64
    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const imageUrl = `data:image/jpeg;base64,${base64}`;

    console.log("Successfully generated image");

    // Return the base64 image data
    return new Response(
      JSON.stringify({ 
        imageUrl: imageUrl,
        model: "FLUX.1-schnell",
        size: size,
        quality: "high",
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

