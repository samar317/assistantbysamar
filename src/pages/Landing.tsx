import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Bot, MessageSquare, Sparkles, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { AccountMenu } from '@/components/AccountMenu';
import { Watermark } from '@/components/Watermark';

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

const Landing = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 overflow-x-hidden">
      <BackgroundDecoration />
      <Watermark />

      <header className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/70">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
            </motion.div>
            <motion.span 
              className="text-xl sm:text-2xl font-semibold text-slate-800"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              AI Assistant
            </motion.span>
          </div>

          {isMobile ? (
            <div className="flex items-center gap-4">
              <AccountMenu />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          ) : (
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/chat">
                    <Button>
                      Go to Chat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <AccountMenu />
                </div>
              ) : (
                <>
                  <AccountMenu />
                  <Link to="/auth">
                    <Button>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && (
          <motion.div 
            className={`bg-white shadow-lg px-4 py-3 ${mobileMenuOpen ? 'block' : 'hidden'}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: mobileMenuOpen ? 'auto' : 0,
              opacity: mobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-3">
              {user ? (
                <Link to="/chat">
                  <Button className="w-full justify-center">
                    Go to Chat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth" className="text-slate-600 hover:text-slate-900 font-medium py-2">
                    Sign In
                  </Link>
                  <Link to="/auth">
                    <Button className="w-full justify-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-900 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              Your Personal AI Assistant Powered by Google Gemini
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg sm:text-xl text-slate-600 text-center max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Get instant answers, creative ideas, and helpful suggestions with our advanced AI assistant.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
              variants={itemVariants}
            >
              {user ? (
                <Link to="/chat">
                  <Button size="lg" className="px-8 w-full sm:w-auto">
                    Go to Chat
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="px-8 w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </motion.div>
            
            <motion.div 
              className="mt-16 sm:mt-20 w-full max-w-4xl mx-auto bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1596638787647-904d822d751e?q=80&w=2069&auto=format&fit=crop"
                alt="AI Assistant Demo" 
                className="w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
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
              <motion.div 
                key={index}
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
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 mb-8">
          <motion.div 
            className="bg-blue-600 text-white rounded-2xl p-6 sm:p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to get started?
            </motion.h2>
            
            <motion.p 
              className="text-blue-100 max-w-2xl mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join thousands of users who are already using our AI assistant to simplify their work and get answers instantly.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {user ? (
                <Link to="/chat">
                  <Button size="lg" variant="secondary">
                    Go to Chat
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" variant="secondary">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            © {new Date().getFullYear()} AI Assistant. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
