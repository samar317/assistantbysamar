
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ImageIcon, Download, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        body: { prompt: prompt.trim() }
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
        toast({
          title: "Image generated",
          description: "Your AI image has been successfully generated.",
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
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
            disabled={isGenerating}
          />
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full sm:w-auto group"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Generate
              </>
            )}
          </Button>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md text-sm"
          >
            {error}
          </motion.div>
        )}

        <div className={cn(
          "mt-6 flex flex-col items-center justify-center rounded-lg overflow-hidden transition-all duration-300",
          !generatedImage && "border-2 border-dashed border-slate-300 dark:border-slate-700 h-72"
        )}>
          <AnimatePresence mode="wait">
            {generatedImage ? (
              <motion.div 
                key="image"
                className="relative w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={generatedImage} 
                  alt="AI Generated" 
                  className="w-full rounded-lg object-cover"
                />
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
                    onClick={handleGenerate}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full p-6 text-center"
              >
                <div className="relative">
                  <ImageIcon className="h-12 w-12 text-slate-400 dark:text-slate-600 mb-3" />
                  <motion.div
                    className="absolute -top-4 -right-4"
                    animate={{ 
                      rotate: [0, 10, 0, 10, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 5, 
                      ease: "easeInOut", 
                      repeat: Infinity,
                      repeatDelay: 0
                    }}
                  >
                    <Sparkles className="h-5 w-5 text-blue-500" />
                  </motion.div>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  AI-generated images will appear here
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                  Try prompts like "sunset over mountains" or "futuristic city"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
