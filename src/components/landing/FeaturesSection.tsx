
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';

// Define features data
const features = [
  {
    icon: <Bot className="h-6 w-6 text-blue-600" />,
    title: 'AI Assistant',
    description: 'Get instant answers to your questions with our advanced AI assistant powered by Google Gemini.'
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-violet-600" />,
    title: 'Conversation History',
    description: 'Your chat history is saved so you can refer back to previous conversations anytime.'
  },
  {
    icon: <Sparkles className="h-6 w-6 text-amber-600" />,
    title: 'Smart Suggestions',
    description: 'Receive personalized suggestions based on your conversation context.'
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const featureVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut" 
      }
    })
  };

  return (
    <motion.div 
      className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow"
      custom={index}
      variants={featureVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
      <p className="text-slate-600">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-8 sm:mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Key Features
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
