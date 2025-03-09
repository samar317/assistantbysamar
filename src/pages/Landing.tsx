
import React, { useEffect } from 'react';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import { Watermark } from '@/components/Watermark';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ImageGeneratorSection from '@/components/landing/ImageGeneratorSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, useScroll, useSpring } from 'framer-motion';

const Landing = () => {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    // Smooth scroll to sections when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    // Check for hash on initial load
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} overflow-x-hidden`}>
      <BackgroundDecoration />
      <Watermark dark={theme === 'dark'} />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Header />
      
      <motion.main 
        className="pt-24 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <HeroSection />
        <FeaturesSection />
        <ImageGeneratorSection />
        <CTASection />
      </motion.main>

      <Footer />
    </div>
  );
};

export default Landing;
