
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Send, Twitter, Linkedin, Github } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const currentYear = new Date().getFullYear();
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <footer className={`${isDark ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-slate-200'} py-12 relative overflow-hidden`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>AI Assistant</h3>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed`}>
              Powered by advanced AI to help you get things done with natural conversation.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Links</h3>
            <ul className="space-y-2">
              {['Home', 'Features', 'Image Generator', 'About'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm transition-colors relative group`}
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm transition-colors relative group`}
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Stay Connected</h3>
            <div className="flex space-x-4 mb-6">
              <motion.a 
                href="#" 
                className={`${isDark ? 'text-slate-400 hover:text-white bg-slate-800' : 'text-slate-600 hover:text-slate-900 bg-slate-100'} p-2.5 rounded-full transition-all hover:scale-110`}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                className={`${isDark ? 'text-slate-400 hover:text-white bg-slate-800' : 'text-slate-600 hover:text-slate-900 bg-slate-100'} p-2.5 rounded-full transition-all hover:scale-110`}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                className={`${isDark ? 'text-slate-400 hover:text-white bg-slate-800' : 'text-slate-600 hover:text-slate-900 bg-slate-100'} p-2.5 rounded-full transition-all hover:scale-110`}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <Github size={18} />
              </motion.a>
            </div>
            
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} transition-colors group`}>
              <input 
                type="email" 
                placeholder="Your email" 
                className={`flex-1 text-sm bg-transparent outline-none ${isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-800 placeholder:text-slate-400'}`}
              />
              <motion.button 
                className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center mb-4 sm:mb-0">
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              © {currentYear} AI Assistant. Made with 
              <Heart className="h-3 w-3 mx-1 inline-block text-red-500 animate-pulse" fill="currentColor" /> 
              All rights reserved.
            </p>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ThemeToggle />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
