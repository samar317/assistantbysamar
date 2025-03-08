
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { AccountMenu } from '@/components/AccountMenu';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/70">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
          </motion.div>
          <motion.span 
            className="text-xl sm:text-2xl font-semibold text-slate-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AI Assistant
          </motion.span>
        </div>

        {isMobile ? (
          <div className="flex items-center gap-4">
            <AccountMenu />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        ) : (
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/chat">
                  <Button>
                    Go to Chat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <AccountMenu />
              </div>
            ) : (
              <>
                <AccountMenu />
                <Link to="/auth">
                  <Button>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div 
          className={`bg-white shadow-lg px-4 py-3 ${mobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-3">
            {user ? (
              <Link to="/chat">
                <Button className="w-full justify-center">
                  Go to Chat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth" className="text-slate-600 hover:text-slate-900 font-medium py-2">
                  Sign In
                </Link>
                <Link to="/auth">
                  <Button className="w-full justify-center">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
