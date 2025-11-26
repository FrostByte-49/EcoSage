import React from 'react';
import { Scan, Upload, Map, Zap, TrendingUp, Shield, Sparkles, Workflow, Calculator, Leaf } from 'lucide-react';
import StarsBackground from '../components/StarsBackground';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import SustainabilityTips from '../components/SustainabilityTips';
import EcoFacts from '../components/EcoFacts';

interface HomePageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, currentPage }) => {
  const features = [
    {
      icon: Scan,
      title: 'Quick Scan',
      description: 'Instant camera analysis',
      onClick: () => onNavigate('scan'),
      gradient: 'from-white to-gray-200'
    },
    {
      icon: Upload,
      title: 'Upload & Analyze',
      description: 'Use existing photos',
      onClick: () => onNavigate('upload'),
      gradient: 'from-white to-gray-200'
    },
    {
      icon: Map,
      title: 'Recyling Centers',
      description: 'Find Recycle Locations',
      onClick: () => onNavigate('recycle'),
      gradient: 'from-white to-gray-200'
    },
    {
      icon: Calculator,
      title: 'Carbon Calculator',
      description: 'Caluclate Carbon',
      onClick: () => onNavigate('carbon'),
      gradient: 'from-white to-gray-200'
    },
    {
      icon: Leaf,
      title: 'Alternative Finder',
      description: 'Find Smart Alternative',
      onClick: () => onNavigate('alternative'),
      gradient: 'from-white to-gray-200'
    }
  ];

  const stats = [
    { icon: Zap, value: 'Instant', label: 'Analysis' },
    { icon: TrendingUp, value: '95%', label: 'Accuracy' },
    { icon: Shield, value: 'Secure', label: 'Privacy' }
  ];

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <StarsBackground />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        <Header />
        
        {/* Enhanced Hero Section */}
        <section className="px-6 pt-12">
          <div className="max-w-md mx-auto text-center">

            <div className="inline-flex items-center gap-2 mb-9 px-5 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg mb-5">
              <Sparkles className="w-4 h-4 text-gray-300" />
              <span className="text-sm font-medium text-gray-200 tracking-wide">
                ようこそ • Welcome
              </span>
            </div>

            {/* Logo & Title */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-200 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Scan className="w-8 h-8 text-black" />
              </div>
              <h1 className="text-4xl font-bold text-white">
                EcoSage
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-md leading-relaxed max-w-xs mx-auto capitalize">
              Your AI-powered companion for making eco-friendly choices
            </p>

            {/* Line Animation */}
            <div className="flex justify-center items-center gap-4 m-8">
              <div className="h-1 w-28 bg-gradient-to-r from-white/40 to-white/20 rounded-full" />
              <span className="text-xl text-white font-light">✦</span>
              <div className="h-1 w-28 bg-gradient-to-r from-white/20 to-white/40 rounded-full" />
            </div>

          </div>
        </section>

        {/* Feature Cards */}
        <section className="px-6 mb-6">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Get Started</h2>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    onClick={feature.onClick}
                    className="group cursor-pointer bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-gray-800 hover:border-gray-600 p-5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-white font-semibold text-center mb-2 text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-xs text-center leading-tight capitalize">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 mb-6">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="group">
                      <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-700 transition-colors">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-xs">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Tips Carousel */}
        <section className="px-6 mb-6">
          <div className="max-w-md mx-auto">
            <SustainabilityTips />
          </div>
        </section>

        {/* Eco Facts Section */}
        <section className="px-6 mb-6">
          <div className="max-w-md mx-auto">
            <EcoFacts />
          </div>
        </section>

        {/* How It Works Section */}
       <section className="px-6 pb-6">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Workflow className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-white font-bold">How It Works?</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <p className="text-gray-300 text-sm capitalize">Scan or upload product image</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <p className="text-gray-300 text-sm capitalize">AI analyzes sustainability factors</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <p className="text-gray-300 text-sm capitalize">Get instant eco-friendly insights</p>
              </div>
            </div>
          </div>
        </div>
       </section>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default HomePage;