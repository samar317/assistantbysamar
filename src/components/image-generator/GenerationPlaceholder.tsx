
import React from 'react';
import { ImageIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const GenerationPlaceholder: React.FC = () => {
  return (
    <motion.div 
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
  );
};

export default GenerationPlaceholder;
