
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ChevronDown, LogIn, LogOut, UserCircle, Settings, User, Mail, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface AccountMenuProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ 
  variant: propVariant,
  className 
}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  
  // If variant is explicitly passed, use it, otherwise derive from theme
  const variant = propVariant || (theme === 'dark' ? 'dark' : 'light');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
    navigate('/');
  };

  const navigateToAuth = () => {
    closeMenu();
    navigate('/auth');
  };

  // Text and background colors based on variant
  const textColor = variant === 'dark' ? 'text-white' : 'text-slate-800';
  const menuBg = variant === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const menuItemHoverBg = variant === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-50';

  return (
    <div className={cn("relative", className)}>
      {user ? (
        // Logged in state
        <div className="relative">
          <motion.button
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors glow",
              variant === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-100',
              textColor
            )}
            onClick={toggleMenu}
            whileTap={{ scale: 0.97 }}
          >
            <Avatar className="h-8 w-8 border">
              <div className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600",
                "text-white font-medium text-sm"
              )}>
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
            </Avatar>
            <span className="text-sm font-medium hidden sm:block">
              {user.user_metadata?.username || user.email?.split('@')[0] || 'Account'}
            </span>
            <ChevronDown 
              className={cn("h-4 w-4 transition-transform", menuOpen ? "rotate-180" : "")} 
            />
          </motion.button>
          
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className={cn(
                  "absolute right-0 top-full mt-2 w-64 rounded-lg shadow-lg",
                  "border overflow-hidden z-50",
                  menuBg
                )}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="p-4 border-b border-slate-200/70 dark:border-slate-700/70">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white font-semibold">
                        {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                      </div>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={cn("font-medium truncate", textColor)}>
                        {user.user_metadata?.username || user.email?.split('@')[0] || 'User'}
                      </p>
                      {user.email && (
                        <p className={cn("text-xs truncate", variant === 'dark' ? 'text-slate-400' : 'text-slate-500')}>
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      closeMenu();
                      navigate('/chat');
                    }}
                    className={cn(
                      "flex w-full items-center px-4 py-2.5 text-sm",
                      textColor,
                      menuItemHoverBg
                    )}
                  >
                    <User className="mr-3 h-4 w-4" />
                    <span>Your Chat</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      closeMenu();
                      navigate('/image-generator');
                    }}
                    className={cn(
                      "flex w-full items-center px-4 py-2.5 text-sm",
                      textColor,
                      menuItemHoverBg
                    )}
                  >
                    <ImageIcon className="mr-3 h-4 w-4" />
                    <span>Image Generator</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      closeMenu();
                      // Profile functionality would go here
                    }}
                    className={cn(
                      "flex w-full items-center px-4 py-2.5 text-sm",
                      textColor,
                      menuItemHoverBg
                    )}
                  >
                    <UserCircle className="mr-3 h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      closeMenu();
                      // Settings functionality would go here
                    }}
                    className={cn(
                      "flex w-full items-center px-4 py-2.5 text-sm",
                      textColor,
                      menuItemHoverBg
                    )}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>
                
                <div className="border-t border-slate-200/70 dark:border-slate-700/70 py-1">
                  <button
                    onClick={handleSignOut}
                    className={cn(
                      "flex w-full items-center px-4 py-2.5 text-sm",
                      variant === 'dark' ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50',
                    )}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Logged out state
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button 
            onClick={navigateToAuth}
            variant={variant === 'dark' ? 'secondary' : 'default'}
            className="gap-2 font-medium glow"
            size="sm"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
};
