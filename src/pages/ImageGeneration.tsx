
import React from 'react';
import ImageGeneratorTab from '@/components/image-generator/ImageGeneratorTab';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AccountMenu } from '@/components/AccountMenu';

const ImageGeneration = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800"
    >
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Image Generator</h1>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </header>
      
      <main className="container mx-auto px-4 pb-20 flex-1">
        <div className="max-w-6xl mx-auto">
          <ImageGeneratorTab />
        </div>
      </main>
    </motion.div>
  );
};

export default ImageGeneration;
