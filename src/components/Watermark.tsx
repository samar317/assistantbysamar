
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WatermarkProps {
  className?: string;
  dark?: boolean;
}

export const Watermark: React.FC<WatermarkProps> = ({ className, dark = false }) => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 0.7, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      opacity: 1,
      scale: 1.05,
      textShadow: "0px 0px 8px rgba(255,255,255,0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className={cn(
        "fixed bottom-4 right-4 z-50",
        className
      )}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.p 
        className={cn(
          "text-sm font-medium tracking-wider opacity-70",
          dark ? "text-slate-800" : "text-white",
        )}
        variants={textVariants}
      >
        Crafted by{' '}
        <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Samar
        </span>
      </motion.p>
    </motion.div>
  );
};
