
import React from 'react';
import { Link } from 'react-router-dom';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Bot, MessageSquare, Sparkles } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <BackgroundDecoration />

      <header className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/70">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-slate-800">AI Assistant</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/chat">
                <Button>
                  Go to Chat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth" className="text-slate-600 hover:text-slate-900 font-medium">
                  Sign In
                </Link>
                <Link to="/auth">
                  <Button>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-900 max-w-4xl">
            Your Personal AI Assistant Powered by Google Gemini
          </h1>
          <p className="mt-6 text-xl text-slate-600 text-center max-w-2xl">
            Get instant answers, creative ideas, and helpful suggestions with our advanced AI assistant.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {user ? (
              <Link to="/chat">
                <Button size="lg" className="px-8">
                  Go to Chat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
          <div className="mt-20 w-full max-w-4xl mx-auto bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1596638787647-904d822d751e?q=80&w=2069&auto=format&fit=crop"
              alt="AI Assistant Demo" 
              className="w-full object-cover"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 mb-8">
          <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of users who are already using our AI assistant to simplify their work and get answers instantly.
            </p>
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
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© {new Date().getFullYear()} AI Assistant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
