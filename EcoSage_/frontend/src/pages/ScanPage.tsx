import React from 'react';
import { ArrowLeft } from 'lucide-react';
import StarsBackground from '../components/StarsBackground';

interface ScanPageProps {
  onNavigate: (page: string) => void;
}

const ScanPage: React.FC<ScanPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <StarsBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Camera Scan</h1>
          <p className="text-gray-300 mb-8">Coming soon - Camera functionality</p>
          
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-12 max-w-md mx-auto">
            <div className="text-gray-400">Camera preview will appear here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;