
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Phone, User, Lock, LogIn, UserPlus, RotateCcw, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Watermark } from '@/components/Watermark';
import { countryCodes, detectCountryCode, formatPhoneNumber } from '@/utils/phoneUtils';

const Auth = () => {
  const { user, signIn, signUp, signInWithPhone, verifyOTP } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPhoneSignIn, setIsPhoneSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Animation variants
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

  // Country selection dropdown animation
  const dropdownVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    if (phone) {
      const detectedCode = detectCountryCode(phone);
      setCountryCode(detectedCode);
    }
  }, [phone]);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, username);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formattedPhone = formatPhoneNumber(phone, countryCode);
      
      if (showOtpInput) {
        await verifyOTP(formattedPhone, otpCode);
      } else {
        await signInWithPhone(formattedPhone);
        setShowOtpInput(true);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setShowOtpInput(false);
    setOtpCode('');
    setPhone('');
    setEmail('');
    setPassword('');
    setUsername('');
    setError(null);
  };

  const toggleAuthMethod = () => {
    resetForm();
    setIsPhoneSignIn(!isPhoneSignIn);
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    setShowCountryDropdown(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 overflow-hidden">
      <BackgroundDecoration />
      <Watermark />
      
      <motion.div 
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/60"
          variants={itemVariants}
        >
          <motion.div className="text-center mb-6 sm:mb-8" variants={itemVariants}>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              {isPhoneSignIn 
                ? (showOtpInput ? 'Verify Your Phone' : 'Phone Sign In') 
                : (isSignUp ? 'Create Account' : 'Welcome Back')}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              {isPhoneSignIn 
                ? (showOtpInput ? 'Enter the code sent to your phone' : 'Sign in with your phone number') 
                : (isSignUp ? 'Sign up to get started with our AI assistant' : 'Sign in to continue with your AI assistant')}
            </p>
          </motion.div>

          {error && (
            <motion.div 
              className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm"
              variants={itemVariants}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          {isPhoneSignIn ? (
            <motion.form 
              onSubmit={handlePhoneSubmit} 
              className="space-y-4"
              variants={containerVariants}
            >
              {!showOtpInput ? (
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-28 flex justify-between items-center"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        disabled={isLoading}
                      >
                        {countryCode} <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                      <AnimatePresence>
                        {showCountryDropdown && (
                          <motion.div
                            className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border border-slate-200 max-h-60 overflow-y-auto"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {countryCodes.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                className="w-full text-left px-4 py-2 hover:bg-slate-100 flex justify-between items-center"
                                onClick={() => handleCountrySelect(country.code)}
                              >
                                <span>{country.name}</span>
                                <span className="font-semibold">{country.code}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        required
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    We'll automatically detect your country code from the number format
                  </p>
                </motion.div>
              ) : (
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="otp">Verification Code</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="otp"
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter verification code"
                      required
                      className="pl-10 text-lg tracking-widest font-mono"
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>
              )}
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {showOtpInput ? 'Verifying...' : 'Sending code...'}
                    </>
                  ) : (
                    <>
                      {showOtpInput ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Verify Code
                        </>
                      ) : (
                        <>
                          <Phone className="mr-2 h-4 w-4" />
                          Send Verification Code
                        </>
                      )}
                    </>
                  )}
                </Button>
              </motion.div>

              {showOtpInput && (
                <motion.div 
                  className="text-center"
                  variants={itemVariants}
                >
                  <button
                    type="button"
                    onClick={() => setShowOtpInput(false)}
                    className="text-blue-600 text-sm font-medium flex items-center justify-center mx-auto"
                    disabled={isLoading}
                  >
                    <RotateCcw className="mr-1 h-3 w-3" />
                    Try a different phone number
                  </button>
                </motion.div>
              )}
            </motion.form>
          ) : (
            <motion.form 
              onSubmit={handleEmailSubmit} 
              className="space-y-4"
              variants={containerVariants}
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
            </motion.form>
          )}
          
          <motion.div 
            className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0"
            variants={itemVariants}
          >
            <button
              type="button"
              onClick={toggleAuthMethod}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transform transition-transform hover:scale-105"
              disabled={isLoading}
            >
              {isPhoneSignIn ? 'Sign in with Email' : 'Sign in with Phone'}
            </button>

            {!isPhoneSignIn && (
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transform transition-transform hover:scale-105"
                disabled={isLoading}
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
