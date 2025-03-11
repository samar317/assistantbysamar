
import React from 'react';
import { ImageIcon, Sparkles, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const GenerationPlaceholder: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full p-6 text-center bg-gradient-to-br from-slate-50/50 to-blue-50/50 dark:from-slate-900/50 dark:to-slate-800/50 rounded-lg"
    >
      <div className="relative mb-2">
        <motion.div
          className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ImageIcon className="h-12 w-12 text-blue-500 dark:text-blue-400" />
        </motion.div>
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ 
            rotate: [0, 15, 0, 15, 0],
            scale: [1, 1.2, 1, 1.2, 1]
          }}
          transition={{ 
            duration: 5, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <Sparkles className="h-6 w-6 text-amber-500" />
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -left-2"
          animate={{ 
            rotate: [0, -15, 0, -15, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 4, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 1
          }}
        >
          <Palette className="h-5 w-5 text-purple-500" />
        </motion.div>
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        Samar's AI Image Generator
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mb-4 max-w-md">
        Create stunning, unique images with our AI-powered generator
      </p>
      <motion.div 
        className="text-slate-500 dark:text-slate-400 text-sm mt-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg max-w-sm bg-white/70 dark:bg-slate-800/70"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <p className="font-medium mb-2">Try prompts like:</p>
        <ul className="space-y-1 text-left">
          <li>• "A sunset over mountains in watercolor style"</li>
          <li>• "Cyberpunk city with neon lights and flying cars"</li>
          <li>• "Portrait of a fantasy character with magical elements"</li>
          <li>• "Futuristic landscape with floating islands and waterfalls"</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default GenerationPlaceholder;
