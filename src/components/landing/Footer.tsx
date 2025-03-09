
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <footer className={`${isDark ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-slate-200'} py-6 sm:py-8`}>
      <div className="container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={isDark ? 'text-slate-400' : 'text-slate-500'}
        >
          © {new Date().getFullYear()} AI Assistant. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
