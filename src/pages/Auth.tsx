
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Watermark } from '@/components/Watermark';
import { ArrowLeft } from 'lucide-react';
import { detectCountryCode, formatPhoneNumber } from '@/utils/phoneUtils';

// Import the new components
import AuthHeader from '@/components/auth/AuthHeader';
import EmailSignIn from '@/components/auth/EmailSignIn';
import PhoneSignIn from '@/components/auth/PhoneSignIn';
import ErrorMessage from '@/components/auth/ErrorMessage';

const Auth = () => {
  const { user, signIn, signUp, signInWithPhone, verifyOTP } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPhoneSignIn, setIsPhoneSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [otpCode, setOtpCode] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (phone) {
      const detectedCode = detectCountryCode(phone);
      setCountryCode(detectedCode);
    }
  }, [phone]);

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

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  // Get appropriate title and description based on auth state
  const getHeaderProps = () => {
    if (isPhoneSignIn) {
      return showOtpInput 
        ? { title: 'Verify Your Phone', description: 'Enter the code sent to your phone' }
        : { title: 'Phone Sign In', description: 'Sign in with your phone number' };
    } else {
      return isSignUp 
        ? { title: 'Create Account', description: 'Sign up to get started with our AI assistant' }
        : { title: 'Welcome Back', description: 'Sign in to continue with your AI assistant' };
    }
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 overflow-hidden">
      <BackgroundDecoration />
      <Watermark />
      
      <Link 
        to="/" 
        className="fixed top-6 left-6 flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors z-50"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>
      
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
          <AuthHeader {...getHeaderProps()} />
          
          <ErrorMessage error={error} />

          {isPhoneSignIn ? (
            <PhoneSignIn 
              isLoading={isLoading}
              phone={phone}
              setPhone={setPhone}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              otpCode={otpCode}
              setOtpCode={setOtpCode}
              showOtpInput={showOtpInput}
              setShowOtpInput={setShowOtpInput}
              handleSubmit={handlePhoneSubmit}
            />
          ) : (
            <EmailSignIn
              isSignUp={isSignUp}
              isLoading={isLoading}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
              handleSubmit={handleEmailSubmit}
              toggleAuthMode={toggleAuthMode}
            />
          )}
          
          <motion.div 
            className="mt-6 flex items-center justify-center"
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
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
