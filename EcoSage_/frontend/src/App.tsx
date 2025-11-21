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

  const pageProps = {
    onNavigate: handleNavigate,
    currentPage
  };

  switch (currentPage) {
    case 'scan':
      return <ScanPage {...pageProps} />;
    case 'upload':
      return <UploadPage {...pageProps} />;
    case 'about':
      return <AboutPage {...pageProps} />;
    default:
      return <HomePage {...pageProps} />;
  }
}

export default App;