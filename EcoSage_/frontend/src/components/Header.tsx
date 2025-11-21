import React from 'react';
import { Scan } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false, onBack }) => {
  return (
    <header className="relative z-20 px-4 py-4 border-b border-gray-800 bg-black/80 backdrop-blur-lg">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button 
              onClick={onBack}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <span className="text-white text-lg">←</span>
            </button>
          )}
          {/* App Icon */}
          <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
            <Scan className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-white">EcoSage</h1>
        </div>
        
        {title && (
          <span className="text-white font-medium">{title}</span>
        )}
        
        {/* Spacer for balance */}
        {!title && <div className="w-8"></div>}
      </div>
    </header>
  );
};

export default Header;