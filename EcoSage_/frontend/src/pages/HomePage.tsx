import React from 'react';
import { Scan, Upload, Info } from 'lucide-react';
import StarsBackground from '../components/StarsBackground';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Scan,
      title: 'Camera Scan',
      description: 'Scan products instantly with your camera',
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-400',
      onClick: () => onNavigate('scan')
    },
    {
      icon: Upload,
      title: 'Upload Image',
      description: 'Analyze photos from your gallery',
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-400',
      onClick: () => onNavigate('upload')
    },
    {
      icon: Info,
      title: 'How It Works',
      description: 'Learn about our AI technology',
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      onClick: () => onNavigate('about')
    }
  ];

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <StarsBackground />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center pt-8 pb-12">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Scan className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              EcoSage
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Your AI-powered sustainability companion
              <span className="block text-purple-300 font-semibold mt-2">
                Discover the environmental impact of any product
              </span>
            </p>
          </div>
        </header>

        {/* Feature Cards */}
        <div className="max-w-md mx-auto space-y-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={feature.onClick}
              className="group cursor-pointer bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700 hover:border-purple-500/50 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold ${feature.textColor} mb-1`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
                <div className={`${feature.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="max-w-md mx-auto mt-12 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-1">500+</div>
              <div className="text-gray-400 text-sm">Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-1">95%</div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400 mb-1">24/7</div>
              <div className="text-gray-400 text-sm">AI Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;