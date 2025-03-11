
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Sparkles, Image, Palette, Zap, LayoutGrid } from 'lucide-react';

// Define enhanced features data
const features = [
  {
    icon: <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    title: 'AI Assistant',
    description: 'Get instant answers to your questions with our advanced AI assistant powered by Google Gemini.',
    color: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-violet-600 dark:text-violet-400" />,
    title: 'Conversation History',
    description: 'Your chat history is saved so you can refer back to previous conversations anytime.',
    color: 'bg-violet-100 dark:bg-violet-900/30',
    textColor: 'text-violet-600 dark:text-violet-400'
  },
  {
    icon: <Image className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
    title: 'Image Generation',
    description: 'Create stunning images with just a text description using our powerful AI image generator with DALL-E 3.',
    color: 'bg-emerald-100 dark:bg-emerald-900/30',
    textColor: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    icon: <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
    title: 'Smart Suggestions',
    description: 'Receive personalized suggestions based on your conversation context and past interactions.',
    color: 'bg-amber-100 dark:bg-amber-900/30',
    textColor: 'text-amber-600 dark:text-amber-400'
  },
  {
    icon: <Palette className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
    title: 'Style Customization',
    description: 'Choose from multiple image styles and customize the output to match your creative vision.',
    color: 'bg-rose-100 dark:bg-rose-900/30',
    textColor: 'text-rose-600 dark:text-rose-400'
  },
  {
    icon: <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
    title: 'Fast Generation',
    description: 'Our optimized AI models deliver high-quality results in seconds with minimal waiting time.',
    color: 'bg-indigo-100 dark:bg-indigo-900/30',
    textColor: 'text-indigo-600 dark:text-indigo-400'
  },
  {
    icon: <LayoutGrid className="h-6 w-6 text-teal-600 dark:text-teal-400" />,
    title: 'Multiple Formats',
    description: 'Generate images in different sizes and aspect ratios to fit your specific needs and projects.',
    color: 'bg-teal-100 dark:bg-teal-900/30',
    textColor: 'text-teal-600 dark:text-teal-400'
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 }
      }}
    >
      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${feature.color} mb-6 transform transition-transform duration-300 hover:rotate-6`}>
        {feature.icon}
      </div>
      <h3 className={`text-xl font-semibold ${feature.textColor} mb-3`}>{feature.title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <motion.div 
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Key Features</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Discover what makes our AI assistant stand out from the rest
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {features.slice(0, 4).map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
      
      <motion.div 
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl md:text-2xl font-semibold text-center text-slate-800 dark:text-slate-200 mb-8">Additional Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {features.slice(4).map((feature, index) => (
            <FeatureCard key={index + 4} feature={feature} index={index + 4} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
