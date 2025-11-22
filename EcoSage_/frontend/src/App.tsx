import { useState } from 'react';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import UploadPage from './pages/UploadPage';
import AboutPage from './pages/AboutPage';
import ResultsPage from './pages/ResultsPage';

interface AnalysisData {
  result: string;
  image: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'scan' | 'upload' | 'about' | 'results'>(() => {
    // Initialize State From LocalStorage
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('ecosage-currentPage');
      if (savedPage && ['home', 'scan', 'upload', 'about', 'results'].includes(savedPage)) {
        return savedPage as 'home' | 'scan' | 'upload' | 'about' | 'results';
      }
    }
    return 'home';
  });

  // Store analysis data for the results page
  const [analysisData, setAnalysisData] = useState<AnalysisData>(() => {
    // Try to load from sessionStorage (doesn't persist across browser closes)
    if (typeof window !== 'undefined') {
      const savedData = sessionStorage.getItem('ecosage-analysisData');
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (e) {
          console.error('Failed to parse saved analysis data:', e);
        }
      }
    }
    return { result: '', image: '' };
  });

  const handleNavigate = (page: string) => {
    const newPage = page as 'home' | 'scan' | 'upload' | 'about' | 'results';
    setCurrentPage(newPage);
    localStorage.setItem('ecosage-currentPage', newPage);
    
    // Clear analysis data when leaving results page
    if (page !== 'results') {
      sessionStorage.removeItem('ecosage-analysisData');
    }
  };

  // Handle analysis completion from ScanPage or UploadPage
  const handleAnalysisComplete = (result: string, image: string) => {
    const data: AnalysisData = { result, image };
    setAnalysisData(data);
    
    // Save to sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ecosage-analysisData', JSON.stringify(data));
    }
    
    // Navigate to results page
    handleNavigate('results');
  };

  const pageProps = {
    onNavigate: handleNavigate,
    currentPage
  };

  switch (currentPage) {
    case 'scan':
      return <ScanPage {...pageProps} onAnalysisComplete={handleAnalysisComplete} />;
    case 'upload':
      return <UploadPage {...pageProps} onAnalysisComplete={handleAnalysisComplete} />;
    case 'results':
      return (
        <ResultsPage 
          {...pageProps} 
          analysisResult={analysisData.result}
          capturedImage={analysisData.image}
        />
      );
    case 'about':
      return <AboutPage {...pageProps} />;
    default:
      return <HomePage {...pageProps} />;
  }
}

export default App;