
import React from 'react';
import { RefreshCw, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ImageMetadata } from './types';
import GenerationPlaceholder from './GenerationPlaceholder';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ImageDisplayProps {
  generatedImage: string | null;
  imageMetadata: ImageMetadata | null;
  onRegenerate: () => void;
  onDownload: () => void;
  isBillingError: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  generatedImage,
  imageMetadata,
  onRegenerate,
  onDownload,
  isBillingError
}) => {
  // Function to share image (basic implementation)
  const handleShare = async () => {
    if (!generatedImage) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI Generated Image',
          text: imageMetadata?.promptUsed || 'Check out this AI-generated image!',
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(generatedImage);
        alert('Image URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-center rounded-lg overflow-hidden transition-all duration-300">
      {generatedImage ? (
        <motion.div 
          key="image"
          className="relative w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
            <img 
              src={generatedImage} 
              alt={imageMetadata?.promptUsed || "AI Generated Image"} 
              className="w-full rounded-lg object-cover"
            />
          </div>
          
          {imageMetadata && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs p-2 rounded-md shadow-lg"
            >
              <p className="font-medium">Model: {imageMetadata.model}</p>
              <p>Size: {imageMetadata.size}</p>
              {imageMetadata.quality && <p>Quality: {imageMetadata.quality}</p>}
            </motion.div>
          )}
          
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
                    onClick={onRegenerate}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate a new image with the same prompt</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
                    onClick={onDownload}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save image to your device</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
      ) : !isBillingError ? (
        <GenerationPlaceholder />
      ) : null}
    </div>
  );
};

export default ImageDisplay;
