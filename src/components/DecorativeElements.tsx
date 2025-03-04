
import React from 'react';
import { cn } from '@/lib/utils';

export const GradientOrb = ({ 
  className, 
  color = "from-blue-400/30 to-indigo-400/20"
}: { 
  className?: string, 
  color?: string 
}) => {
  return (
    <div className={cn(
      "absolute rounded-full blur-3xl opacity-30 bg-gradient-to-br",
      color,
      className
    )} />
  );
};

export const BackgroundDecoration = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <GradientOrb className="w-[500px] h-[500px] -top-40 -left-20" />
      <GradientOrb className="w-[600px] h-[600px] top-1/3 -right-40" color="from-purple-400/20 to-pink-400/10" />
      <GradientOrb className="w-[400px] h-[400px] bottom-0 left-1/3" color="from-cyan-400/20 to-blue-400/10" />
    </div>
  );
};

export const ImageDecoration = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative rounded-xl overflow-hidden shadow-lg", className)}>
      <img 
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format" 
        alt="Technology" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
};
