import React from 'react';
import ecoFactsData from '../data/EcoFacts.json';

const EcoFacts: React.FC = () => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">
      <h3 className="text-white font-semibold mb-4 flex items-center">
        <span className="mr-2">💡</span>
        Did You Know?
      </h3>
      
      <div className="space-y-4">
        {ecoFactsData.map((fact, index) => (
          <div key={fact.id} className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="text-gray-300 text-sm leading-relaxed">
                {fact.fact}
              </p>
              {fact.source && (
                <p className="text-gray-500 text-xs mt-1">- {fact.source}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcoFacts;