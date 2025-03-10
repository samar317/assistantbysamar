
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  error: string | null;
  onDismiss: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onDismiss }) => {
  if (!error) return null;
  
  const isBillingError = error.includes('billing limit') || error.includes('Billing hard limit');

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-4 rounded-md text-sm",
          isBillingError 
            ? "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800" 
            : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
        )}
      >
        {isBillingError ? (
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" />
            <div>
              <p className="font-medium mb-1">API Billing Limit Reached</p>
              <p>{error}</p>
              <p className="mt-2 text-xs">The OpenAI API account has reached its billing limit. Please try again later or contact the administrator to increase the limit.</p>
            </div>
          </div>
        ) : (
          error
        )}
      </motion.div>

      {isBillingError && (
        <Card className="mt-2">
          <CardHeader>
            <CardTitle>Unable to Generate Images</CardTitle>
            <CardDescription>
              The image generation service is currently unavailable due to billing limitations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The OpenAI API account has reached its billing limit. This is a temporary issue.
              You can try again later when the billing cycle resets or the limit is increased.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={onDismiss}>
              Dismiss
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ErrorDisplay;
