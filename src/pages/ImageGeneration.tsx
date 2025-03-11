
import React from 'react';
import ImageGeneratorTab from '@/components/image-generator/ImageGeneratorTab';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const ImageGeneration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <header className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Image Generator</h1>
        </motion.div>
      </header>
      
      <main className="container mx-auto px-4 pb-16">
        <ImageGeneratorTab />
      </main>
    </div>
  );
};

export default ImageGeneration;
