
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Phone, Lock, Check, ChevronDown, RotateCcw } from 'lucide-react';
import { countryCodes } from '@/utils/phoneUtils';

interface PhoneSignInProps {
  isLoading: boolean;
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  otpCode: string;
  setOtpCode: (code: string) => void;
  showOtpInput: boolean;
  setShowOtpInput: (show: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const PhoneSignIn: React.FC<PhoneSignInProps> = ({
  isLoading,
  phone,
  setPhone,
  countryCode,
  setCountryCode,
  otpCode,
  setOtpCode,
  showOtpInput,
  setShowOtpInput,
  handleSubmit,
}) => {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

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

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    }
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    setShowCountryDropdown(false);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
  );
};

export default PhoneSignIn;
