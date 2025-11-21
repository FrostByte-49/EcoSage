import React from 'react';
import { ArrowLeft, Brain, Shield, Zap } from 'lucide-react';
import StarsBackground from '../components/StarsBackground';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning analyzes product sustainability'
    },
    {
      icon: Shield,
      title: 'Data Privacy',
      description: 'Your images and data are completely secure'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get detailed sustainability reports in seconds'
    }
  ];

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <StarsBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">How It Works</h1>
          
          <div className="space-y-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-400 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Our Mission</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              EcoSage empowers consumers to make environmentally conscious choices 
              by providing instant sustainability analysis through cutting-edge AI technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;