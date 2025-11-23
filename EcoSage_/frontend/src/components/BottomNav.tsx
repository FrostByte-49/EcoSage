import React from 'react';
import { Home, NotebookText, Scan, Upload, UserRound } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'scan', icon: Scan, label: 'Scan' },
    { id: 'upload', icon: Upload, label: 'Upload' },
    { id: 'about', icon: NotebookText, label: 'About' },
    { id: 'profile', icon: UserRound, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-black/90 backdrop-blur-lg border-t border-gray-400">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-gray-800'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
