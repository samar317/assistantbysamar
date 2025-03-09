
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();
  
  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.div
            className="absolute -top-10 -right-10 text-blue-500 dark:text-blue-400"
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
            <Sparkles size={32} />
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Your Personal AI Assistant
          </motion.h1>
        </motion.div>
        
        <motion.h2 
          className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white max-w-4xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Powered by Google Gemini
        </motion.h2>
        
        <motion.p 
          className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Get instant answers, creative ideas, helpful suggestions, and now generate amazing images with our advanced AI assistant.
        </motion.p>
        
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {user ? (
            <Link to="/chat">
              <Button size="lg" className="px-8 w-full sm:w-auto group">
                Go to Chat
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="px-8 w-full sm:w-auto group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </motion.div>
        
        <motion.div 
          className="mt-16 sm:mt-20 w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1596638787647-904d822d751e?q=80&w=2069&auto=format&fit=crop"
            alt="AI Assistant Demo" 
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-2xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
