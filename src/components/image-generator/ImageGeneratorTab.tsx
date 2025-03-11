
import React from 'react';
import { motion } from 'framer-motion';
import ImageGenerator from '@/components/image-generator/ImageGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, MessageSquare, Image } from 'lucide-react';

const ImageGeneratorTab: React.FC = () => {
  return (
    <div className="w-full py-4">
      <Tabs defaultValue="generator" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="about" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>About</span>
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>Generator</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="about" className="mt-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div 
                className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Sparkles className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </motion.div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-4 text-slate-900 dark:text-white">AI Image Generator</h2>
            
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                Our AI Image Generator uses state-of-the-art machine learning models to create unique, 
                high-quality images based on your text descriptions. Simply type what you want to see, 
                and our AI will bring your imagination to life.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">How It Works</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Enter a detailed text description of the image you want to create</li>
                  <li>Choose image size and quality settings (optional)</li>
                  <li>Click "Create Image" and watch the AI generate your image</li>
                  <li>Download or share your creation when it's ready</li>
                </ol>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Tips for Great Results</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Be specific and descriptive in your prompts</li>
                  <li>Include details about style, lighting, and composition</li>
                  <li>Try adding artistic styles like "watercolor," "oil painting," or "3D render"</li>
                  <li>Experiment with different settings for varied results</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="generator" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <ImageGenerator />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageGeneratorTab;
