
// Country codes for phone number validation and formatting
export interface CountryCode {
  code: string;
  name: string;
  regex: RegExp;
  format: string;
}

export const countryCodes: CountryCode[] = [
  { 
    code: '+1', 
    name: 'United States/Canada', 
    regex: /^(\+?1)?[2-9]\d{9}$/, 
    format: '+1 XXX-XXX-XXXX' 
  },
  { 
    code: '+44', 
    name: 'United Kingdom', 
    regex: /^(\+?44)?[7-9]\d{9}$/, 
    format: '+44 XXXX XXXXXX' 
  },
  { 
    code: '+91', 
    name: 'India', 
    regex: /^(\+?91)?[6-9]\d{9}$/, 
    format: '+91 XXXXX XXXXX' 
  },
  { 
    code: '+61', 
    name: 'Australia', 
    regex: /^(\+?61)?4\d{8}$/, 
    format: '+61 XXX XXX XXX' 
  },
  { 
    code: '+49', 
    name: 'Germany', 
    regex: /^(\+?49)?[1-9]\d{10}$/, 
    format: '+49 XXXX XXXXXXX' 
  },
];

export function detectCountryCode(phoneNumber: string): string {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Check if the number starts with any country code
  for (const country of countryCodes) {
    const codeDigits = country.code.replace(/\D/g, '');
    if (digits.startsWith(codeDigits)) {
      return country.code;
    }
  }
  
  // If there's no full country code but the input has started,
  // try to match the beginning of the phone number to country patterns
  if (digits.length > 0) {
    if (digits.startsWith('1') || digits.length === 10) {
      return '+1'; // US/Canada
    } else if (digits.startsWith('44')) {
      return '+44'; // UK
    } else if (digits.startsWith('91') || (digits.length > 0 && '6789'.includes(digits[0]))) {
      return '+91'; // India
    } else if (digits.startsWith('61')) {
      return '+61'; // Australia
    } else if (digits.startsWith('49')) {
      return '+49'; // Germany
    }
  }
  
  // Default to +1 if no code can be detected
  return '+1';
}

export function formatPhoneNumber(phoneNumber: string, countryCode: string): string {
  // If the phone number already starts with the country code, return it
  if (phoneNumber.startsWith(countryCode)) {
    return phoneNumber;
  }
  
  // Remove any existing country code or non-digit characters
  let cleaned = phoneNumber.replace(/\D/g, '');
  
  // Remove country code digits if they are at the beginning without the '+'
  const codeDigits = countryCode.replace(/\D/g, '');
  if (cleaned.startsWith(codeDigits)) {
    cleaned = cleaned.substring(codeDigits.length);
  }
  
  // Add the country code
  return `${countryCode}${cleaned}`;
}
