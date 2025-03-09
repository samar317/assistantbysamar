
import React from 'react';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import { Watermark } from '@/components/Watermark';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import { useTheme } from '@/contexts/ThemeContext';

const Landing = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} overflow-x-hidden`}>
      <BackgroundDecoration />
      <Watermark dark={theme === 'dark'} />
      
      <Header />
      
      <main className="pt-24">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
