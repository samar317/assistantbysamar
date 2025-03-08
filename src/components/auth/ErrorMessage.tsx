
import React from 'react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <motion.div 
      className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {error}
    </motion.div>
  );
};

export default ErrorMessage;
