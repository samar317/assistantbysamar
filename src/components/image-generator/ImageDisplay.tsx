
import React from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ImageMetadata } from './types';
import GenerationPlaceholder from './GenerationPlaceholder';

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
          <img 
            src={generatedImage} 
            alt="AI Generated" 
            className="w-full rounded-lg object-cover"
          />
          
          {imageMetadata && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded">
              <p>Model: {imageMetadata.model}</p>
              <p>Size: {imageMetadata.size}</p>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
              onClick={onRegenerate}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Regenerate
            </Button>
            <Button 
              size="sm" 
              className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
              onClick={onDownload}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </motion.div>
      ) : !isBillingError ? (
        <GenerationPlaceholder />
      ) : null}
    </div>
  );
};

export default ImageDisplay;
