
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ChevronDown, LogIn, LogOut, UserCircle, Settings, User, Mail, ImageIcon, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
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

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    if (menuOpen) setMenuOpen(false);
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
                  <motion.button
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                  </motion.button>
                  
                  <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
                    <PopoverTrigger asChild>
                      <motion.button
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={toggleSettings}
                        className={cn(
                          "flex w-full items-center px-4 py-2.5 text-sm",
                          textColor,
                          menuItemHoverBg,
                          settingsOpen && (variant === 'dark' ? 'bg-slate-700' : 'bg-slate-100')
                        )}
                      >
                        <Settings className={cn(
                          "mr-3 h-4 w-4 transition-transform duration-300",
                          settingsOpen && "rotate-90"
                        )} />
                        <span>Settings</span>
                      </motion.button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className={cn(
                        "w-56 p-0 -mt-px",
                        menuBg
                      )}
                    >
                      <div className="p-3">
                        <h4 className={cn("font-medium mb-2", textColor)}>Theme</h4>
                        <div className="flex items-center justify-between">
                          <span className={cn("text-sm", variant === 'dark' ? 'text-slate-400' : 'text-slate-600')}>
                            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                          </span>
                          <motion.button
                            onClick={toggleTheme}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                              "relative overflow-hidden rounded-full p-1",
                              variant === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                            )}
                          >
                            <div className="relative">
                              <AnimatePresence mode="wait">
                                {theme === 'light' ? (
                                  <motion.div
                                    key="sun-settings"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Sun className="h-4 w-4" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="moon-settings"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Moon className="h-4 w-4" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.button>
                        </div>
                      </div>
                      <div className={cn("border-t", variant === 'dark' ? 'border-slate-700' : 'border-slate-200')}>
                        <motion.button
                          whileHover={{ backgroundColor: variant === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                          className="flex w-full items-center p-3 text-sm"
                          onClick={() => {
                            setSettingsOpen(false);
                            // Language settings would go here
                          }}
                        >
                          <span className={textColor}>Language</span>
                          <span className={cn("ml-auto text-xs", variant === 'dark' ? 'text-slate-400' : 'text-slate-500')}>English</span>
                        </motion.button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="border-t border-slate-200/70 dark:border-slate-700/70 py-1">
                  <motion.button
                    whileHover={{ x: 5, color: variant === 'dark' ? '#ff6b6b' : '#e53e3e' }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={handleSignOut}
                    className={cn(
                      "flex w-full items-center px-4 py-2.5 text-sm",
                      variant === 'dark' ? 'text-red-400' : 'text-red-600',
                    )}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Sign out</span>
                  </motion.button>
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
