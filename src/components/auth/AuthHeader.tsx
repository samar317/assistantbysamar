
import React from 'react';
import { motion } from 'framer-motion';

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, description }) => {
  return (
    <motion.div className="text-center mb-6 sm:mb-8" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
        {title}
      </h1>
      <p className="text-slate-500 text-sm sm:text-base">
        {description}
      </p>
    </motion.div>
  );
};

export default AuthHeader;
