import React from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import StarsBackground from '../components/StarsBackground';

interface UploadPageProps {
  onNavigate: (page: string) => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <StarsBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Upload Image</h1>
          <p className="text-gray-300 mb-8">Upload product photos for analysis</p>
          
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-12 max-w-md mx-auto border-dashed hover:border-blue-500/50 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <div className="text-blue-400 font-semibold">Click to upload image</div>
            <div className="text-gray-400 text-sm mt-2">JPG, PNG, WEBP (max 5MB)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;