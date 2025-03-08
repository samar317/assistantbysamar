
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 sm:py-8">
      <div className="container mx-auto px-4 text-center text-slate-500">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          © {new Date().getFullYear()} AI Assistant. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
