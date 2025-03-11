
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { ImageMetadata, GenerationSettings } from './types';
import AdvancedSettings from './AdvancedSettings';
import ErrorDisplay from './ErrorDisplay';
import ImageDisplay from './ImageDisplay';

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | null>(null);
  
  // Advanced settings state
  const [settings, setSettings] = useState<GenerationSettings>({
    size: "1024x1024",
    model: "FLUX.1-schnell", // Updated model name
    quality: "high"
  });

  const handleSettingChange = (setting: keyof GenerationSettings, value: string) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description for the image you want to generate.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Call our Supabase Edge Function to generate the image
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: prompt.trim(),
          size: settings.size,
        }
      });

      if (error) {
        console.error('Error calling image generation API:', error);
        throw new Error(`Error: ${error.message}`);
      }

      if (data && data.error) {
        throw new Error(data.error);
      }

      if (data && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        // Store metadata
        setImageMetadata({
          promptUsed: data.promptUsed || prompt,
          model: data.model || settings.model,
          size: data.size || settings.size,
          quality: data.quality || settings.quality,
          timestamp: data.timestamp || new Date().toISOString()
        });
        
        toast({
          title: "Image generated successfully!",
          description: "Your AI image has been created and is ready to view.",
        });
      } else {
        throw new Error('Unexpected response format from API');
      }
    } catch (err: any) {
      console.error("Error generating image:", err);
      setError(err.message || "Failed to generate image. Please try again.");
      toast({
        title: "Generation failed",
        description: err.message || "There was an error generating your image.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    // Create anchor element and trigger download
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your image is being downloaded.",
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Describe your dream image (e.g., 'sunset over mountains in cyberpunk style')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 text-lg py-6"
            disabled={isGenerating}
          />
          <div className="flex gap-2">
            <AdvancedSettings 
              settings={settings}
              onSettingsChange={handleSettingChange}
              disabled={isGenerating}
            />
            
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="group bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Image...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
        </div>

        <ErrorDisplay 
          error={error} 
          onDismiss={() => setError(null)} 
        />

        <div className="min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <ImageDisplay 
              generatedImage={generatedImage}
              imageMetadata={imageMetadata}
              onRegenerate={handleGenerate}
              onDownload={handleDownload}
              isBillingError={false}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
