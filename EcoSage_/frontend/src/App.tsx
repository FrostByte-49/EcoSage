import { useState } from 'react';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import UploadPage from './pages/UploadPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'scan' | 'upload' | 'about'>(() => {
    // Initialize State From LocalStorage
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('ecosage-currentPage');
      if (savedPage && ['home', 'scan', 'upload', 'about'].includes(savedPage)) {
        return savedPage as 'home' | 'scan' | 'upload' | 'about';
      }
    }
    return 'home';
  });

  const handleNavigate = (page: string) => {
    const newPage = page as 'home' | 'scan' | 'upload' | 'about';
    setCurrentPage(newPage);
    localStorage.setItem('ecosage-currentPage', newPage);
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