
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BarChart, Bot, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const bounceAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  }
};

const FeatureTag = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
  <motion.div 
    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
  >
    <Icon size={14} />
    <span>{text}</span>
  </motion.div>
);

const HeroSection = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-4"
        >
          <motion.div
            className="absolute -top-10 -right-10 text-blue-500 dark:text-blue-400 hidden sm:block"
            variants={bounceAnimation}
            initial="initial"
            animate="animate"
          >
            <Sparkles size={32} />
          </motion.div>
          
          <motion.div className="flex flex-wrap gap-2 justify-center mb-6">
            <FeatureTag icon={Bot} text="AI Powered" />
            <FeatureTag icon={BarChart} text="Data Analytics" />
            <FeatureTag icon={Zap} text="Fast Response" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 leading-tight tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Your Personal<br className="hidden xs:block sm:hidden" /> AI Assistant
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
          Get instant answers, creative ideas, helpful suggestions, and now generate amazing AI images with our advanced AI assistant.
        </motion.p>
        
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {user ? (
            <Link to="/chat">
              <Button size={isMobile ? "default" : "lg"} className="px-6 w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-xl">
                Go to Chat
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop" as const, 
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size={isMobile ? "default" : "lg"} className="px-6 w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-xl">
                Get Started Free
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop" as const,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </Link>
          )}
          
          {!isMobile && (
            <Link to={user ? "/chat" : "/auth"}>
              <Button variant="outline" size="lg" className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                Learn More
              </Button>
            </Link>
          )}
        </motion.div>
        
        {/* Added Samar's name with animation instead of the image */}
        <motion.div 
          className="mt-16 sm:mt-20 w-full max-w-4xl mx-auto relative text-center"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <motion.div
            className="py-10 px-6 bg-gradient-to-br from-blue-600/10 to-violet-600/10 dark:from-blue-900/20 dark:to-violet-900/20 backdrop-blur-sm rounded-2xl border border-blue-200/30 dark:border-blue-700/30 shadow-xl"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            >
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
                animate={{ 
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{ 
                  duration: 8, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Samar
              </motion.span>
            </motion.h2>
            
            <motion.div 
              className="mt-4 text-slate-600 dark:text-slate-300 text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              Building the future with AI
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-4 -left-4 text-blue-500 hidden md:block"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-16 w-16 rounded-full bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-lg flex items-center justify-center">
                <Bot className="h-8 w-8" />
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-3 -right-3 text-violet-500 hidden md:block"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-12 w-12 rounded-full bg-violet-500/10 dark:bg-violet-500/20 backdrop-blur-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
