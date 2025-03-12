
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'outline',
  size = 'sm',
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={`relative overflow-hidden ${className}`}
      aria-label="Toggle theme"
    >
      <div className="relative z-10">
        <motion.div
          initial={{ rotate: 0, opacity: 1 }}
          animate={{ 
            rotate: theme === 'dark' ? 360 : 0,
            opacity: 1
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ display: theme === 'dark' ? 'none' : 'flex' }}
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
        
        <motion.div
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ 
            rotate: theme === 'dark' ? 0 : -360,
            opacity: 1
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ display: theme === 'dark' ? 'flex' : 'none' }}
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
        
        <span className="invisible">
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </span>
      </div>
    </Button>
  );
};
