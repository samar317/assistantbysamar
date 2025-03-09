
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ImageIcon, Download, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
      // Mock image generation with a placeholder
      // In a real implementation, this would call an AI image generation API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Using a random placeholder image for demonstration
      const placeholderImages = [
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format"
      ];
      
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      
      setGeneratedImage(randomImage);
      toast({
        title: "Image generated",
        description: "Your image has been successfully generated.",
      });
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image. Please try again.");
      toast({
        title: "Generation failed",
        description: "There was an error generating your image.",
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
    link.download = `generated-image-${Date.now()}.jpg`;
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
            className="w-full sm:w-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className={cn(
          "mt-6 flex flex-col items-center justify-center rounded-lg overflow-hidden transition-all duration-300",
          !generatedImage && "border-2 border-dashed border-slate-300 dark:border-slate-700 h-72"
        )}>
          {generatedImage ? (
            <motion.div 
              className="relative w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={generatedImage} 
                alt="Generated" 
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
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <ImageIcon className="h-12 w-12 text-slate-400 dark:text-slate-600 mb-3" />
              <p className="text-slate-500 dark:text-slate-400">
                Generated images will appear here
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                Try prompts like "sunset over mountains" or "futuristic city"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
