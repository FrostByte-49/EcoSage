import React from 'react';
import { History } from 'lucide-react';
import recentScansData from '../data/RecentScans.json';

interface RecentScansProps {
  onScanClick?: (scan: typeof recentScansData[0]) => void;
}

const RecentScans: React.FC<RecentScansProps> = ({ onScanClick }) => {
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-400';
    if (score >= 4) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">
      <h3 className="text-white font-semibold mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <History className="w-5 h-5 text-yellow-400 mr-2" />
          <span>Recent Scans</span>
        </div>
        <span className="text-gray-400 text-sm font-normal">{recentScansData.length} items</span>
      </h3>
      
      <div className="space-y-3">
        {recentScansData.map((scan) => (
          <div
            key={scan.id}
            onClick={() => onScanClick?.(scan)}
            className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{scan.image}</span>
              <div>
                <div className="text-white text-sm font-medium mb-1">{scan.name}</div>
                <div className="text-gray-400 text-xs">{scan.timestamp}</div>
              </div>
            </div>
            <div className={`text-lg font-bold ${getScoreColor(scan.score)}`}>
              {scan.score}/10
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentScans;