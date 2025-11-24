import React from 'react';
import { Brain, Shield, Zap, Heart, Target, Users, Mail, Github, Globe, Linkedin, Sparkles } from 'lucide-react';
import StarsBackground from '../components/StarsBackground';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, currentPage }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning analyzes product sustainability using Google Gemini API'
    },
    {
      icon: Shield,
      title: 'Data Privacy First',
      description: 'Your images and data are processed securely and never stored'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get detailed sustainability reports in seconds, not hours'
    },
    {
      icon: Heart,
      title: 'Eco-Conscious',
      description: 'Designed to promote sustainable consumer choices'
    }
  ];

  const developerInfo = {
    name: "Pranav Khalate",
    role: "Student",
    image: "https://res.cloudinary.com/dhn92qb61/image/upload/v1763803739/Me__ctkwrq.jpg",
    bio: "My comfort zone has WiFi & dark mode...",
    email: "pranav.kh25@gmail.com",
    socials: [
      { icon: Github, url: "https://github.com/FrostByte-49", target: "_blank", rel: "noreferrer noopener", label: "GitHub" },
      { icon: Linkedin, url: "https://www.linkedin.com/in/pranav-kh", target: "_blank", rel: "noreferrer noopener", label: "LinkedIn" },
      { icon: Globe, url: "https://pranavkhalate.netlify.app/", target: "_blank", rel: "noreferrer noopener", label: "Website" }
    ]
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-black">
      <StarsBackground />
      
      <div className="relative z-10 pb-20">
        <Header />
        
        <div className="max-w-md mx-auto px-6 py-8">
          <h1 className="text-3xl font-extrabold text-center text-white mt-4 mb-0.5 uppercase">About Us</h1>
            {/* Line Animation */}
            <div className="flex justify-center items-center gap-2 mb-8">
              <div className="h-0.5 w-20 bg-gradient-to-r from-white/40 to-white/20 rounded-full" />
              <span className="text-lg text-white font-light">✦</span>
              <div className="h-0.5 w-20 bg-gradient-to-r from-white/20 to-white/40 rounded-full" />
            </div>
          {/* App Introduction */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 mb-6">
            
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              EcoSage was born from a simple belief: every purchase decision is a vote for the world we want to live in. 
              We're here to make sustainability accessible to everyone through the power of artificial intelligence.
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">The Vision</h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              We envision a world where consumers have instant access to environmental impact data, 
              empowering them to make informed choices that benefit both people and the planet.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">1</div>
                <p className="text-gray-300 text-sm">Scan products with your camera or upload images</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">2</div>
                <p className="text-gray-300 text-sm">AI analyzes materials, packaging, and brand practices</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">3</div>
                <p className="text-gray-300 text-sm">Receive instant sustainability scores and alternatives</p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">What Makes EcoSage Unique</h2>
            </div>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Developer Info */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold text-white mt-3 mb-8 text-center">About The Developer</h2>
            
            <div className="text-center mb-4">
              <div className="w-32 h-32 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
                <img 
                  src={developerInfo.image} 
                  alt={developerInfo.name} 
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <h3 className="text-white font-semibold">{developerInfo.name}</h3>
              <p className="text-gray-400 text-sm">{developerInfo.role}</p>
            </div>


            <p className="text-gray-300 text-sm text-center leading-relaxed mb-4 capitalize">
              {developerInfo.bio}
            </p>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">{developerInfo.email}</span>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              {developerInfo.socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    title={social.label}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default AboutPage;