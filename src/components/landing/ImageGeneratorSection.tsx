
import React from 'react';
import { motion } from 'framer-motion';
import ImageGenerator from '@/components/ImageGenerator';
import { Sparkles } from 'lucide-react';

const ImageGeneratorSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
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
          <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
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
          Create stunning images with our AI-powered image generator. Just describe what you want to see!
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <ImageGenerator />
      </motion.div>
    </section>
  );
};

export default ImageGeneratorSection;
