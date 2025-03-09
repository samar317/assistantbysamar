
import React from 'react';
import { motion } from 'framer-motion';
import ImageGenerator from '@/components/ImageGenerator';
import { Sparkles } from 'lucide-react';

const ImageGeneratorSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div 
          className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 15, 0, -15, 0],
              scale: [1, 1.2, 1, 1.2, 1]
            }}
            transition={{ 
              duration: 5, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </motion.div>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          AI Image Generator
        </motion.h2>
        
        <motion.p 
          className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Create stunning, unique images with our AI-powered image generator. 
          Simply describe what you want to see and watch the magic happen!
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative"
      >
        <motion.div
          className="absolute -top-6 -left-6 md:-top-10 md:-left-10 text-pink-500 dark:text-pink-400 z-10 hidden md:block"
          animate={{ 
            rotate: [0, -10, 0, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 5, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <Sparkles size={32} />
        </motion.div>
        
        <ImageGenerator />
      </motion.div>
    </section>
  );
};

export default ImageGeneratorSection;
