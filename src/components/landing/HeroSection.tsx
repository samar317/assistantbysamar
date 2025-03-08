
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-900 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          Your Personal AI Assistant Powered by Google Gemini
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-lg sm:text-xl text-slate-600 text-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Get instant answers, creative ideas, and helpful suggestions with our advanced AI assistant.
        </motion.p>
        
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants}
        >
          {user ? (
            <Link to="/chat">
              <Button size="lg" className="px-8 w-full sm:w-auto">
                Go to Chat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="px-8 w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </motion.div>
        
        <motion.div 
          className="mt-16 sm:mt-20 w-full max-w-4xl mx-auto bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1596638787647-904d822d751e?q=80&w=2069&auto=format&fit=crop"
            alt="AI Assistant Demo" 
            className="w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
