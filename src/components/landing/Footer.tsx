
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart, Send, Twitter, Linkedin, Github } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`${isDark ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-slate-200'} py-10 relative overflow-hidden`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>AI Assistant</h3>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed`}>
              Powered by advanced AI to help you get things done with natural conversation.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Links</h3>
            <ul className="space-y-2">
              {['Home', 'Features', 'Pricing', 'About'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm transition-colors`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} text-sm transition-colors`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>
                <Twitter size={18} />
              </a>
              <a href="#" className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>
                <Linkedin size={18} />
              </a>
              <a href="#" className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>
                <Github size={18} />
              </a>
            </div>
            
            <div className={`flex items-center space-x-2 p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <input 
                type="email" 
                placeholder="Your email" 
                className={`flex-1 text-sm bg-transparent outline-none ${isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-800 placeholder:text-slate-400'}`}
              />
              <button className="p-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              © {currentYear} AI Assistant. Made with 
              <Heart className="h-3 w-3 mx-1 inline-block text-red-500" fill="currentColor" /> 
              All rights reserved.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 sm:mt-0"
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
