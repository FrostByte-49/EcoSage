import { useState } from 'react';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import UploadPage from './pages/UploadPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'scan' | 'upload' | 'about'>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as 'home' | 'scan' | 'upload' | 'about');
  };

  switch (currentPage) {
    case 'scan':
      return <ScanPage onNavigate={handleNavigate} />;
    case 'upload':
      return <UploadPage onNavigate={handleNavigate} />;
    case 'about':
      return <AboutPage onNavigate={handleNavigate} />;
    default:
      return <HomePage onNavigate={handleNavigate} />;
  }
}

export default App;