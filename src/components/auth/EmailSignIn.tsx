
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, User, Lock, LogIn, UserPlus } from 'lucide-react';

interface EmailSignInProps {
  isSignUp: boolean;
  isLoading: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  username: string;
  setUsername: (username: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  toggleAuthMode: () => void;
}

const EmailSignIn: React.FC<EmailSignInProps> = ({
  isSignUp,
  isLoading,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  handleSubmit,
  toggleAuthMode,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isSignUp && (
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              required
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </motion.div>
      )}
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="pl-10"
            disabled={isLoading}
          />
        </div>
      </motion.div>
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="pl-10"
            disabled={isLoading}
          />
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isSignUp ? 'Creating account...' : 'Signing in...'}
            </>
          ) : (
            <>
              {isSignUp ? (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </>
          )}
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center">
        <button
          type="button"
          onClick={toggleAuthMode}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transform transition-transform hover:scale-105"
          disabled={isLoading}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </motion.div>
    </motion.form>
  );
};

export default EmailSignIn;
