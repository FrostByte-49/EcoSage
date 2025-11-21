import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import sustainabilityTipsData from '../data/SustainabilityTips.json';

const SustainabilityTips: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTip = () => {
    setCurrentIndex((prev) => (prev + 1) % sustainabilityTipsData.length);
  };

  const prevTip = () => {
    setCurrentIndex((prev) => (prev - 1 + sustainabilityTipsData.length) % sustainabilityTipsData.length);
  };

  if (sustainabilityTipsData.length === 0) return null;

  const currentTip = sustainabilityTipsData[currentIndex];

  return (
    <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Sustainability Tip</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevTip}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <span className="text-gray-400 text-sm">
            {currentIndex + 1}/{sustainabilityTipsData.length}
          </span>
          <button
            onClick={nextTip}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
            {currentTip.category}
          </span>
        </div>
        <h4 className="text-white font-medium text-sm">{currentTip.title}</h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {currentTip.description}
        </p>
      </div>
    </div>
  );
};

export default SustainabilityTips;