import { useState } from 'react'

// Home Page Component
const HomePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
    {/* Header */}
    <header className="text-center pt-16 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-lg">
          🌍
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          EcoSage
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your AI-powered sustainability companion. 
          <span className="block text-green-600 font-semibold mt-2">
            Scan any product and discover its environmental impact instantly.
          </span>
        </p>
      </div>
    </header>

    {/* Feature Cards */}
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Scan Card */}
        <div 
          onClick={() => onNavigate('scan')}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
            <div className="text-white text-6xl group-hover:scale-110 transition-transform duration-300">
              📷
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Camera Scan</h3>
            <p className="text-gray-600 mb-4">
              Point your camera at any product for instant sustainability analysis
            </p>
            <div className="flex items-center text-green-600 font-semibold">
              <span>Start Scanning</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>

        {/* Upload Card */}
        <div 
          onClick={() => onNavigate('upload')}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
            <div className="text-white text-6xl group-hover:scale-110 transition-transform duration-300">
              📁
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Upload Image</h3>
            <p className="text-gray-600 mb-4">
              Upload product photos from your gallery for detailed analysis
            </p>
            <div className="flex items-center text-blue-600 font-semibold">
              <span>Choose File</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>

        {/* About Card */}
        <div 
          onClick={() => onNavigate('about')}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
            <div className="text-white text-6xl group-hover:scale-110 transition-transform duration-300">
              ❤️
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">How It Works</h3>
            <p className="text-gray-600 mb-4">
              Learn about our AI technology and sustainability mission
            </p>
            <div className="flex items-center text-purple-600 font-semibold">
              <span>Learn More</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Products Analyzed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">AI Analysis</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Placeholder pages for navigation
const ScanPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Camera Scan Page</h2>
      <button 
        onClick={() => onNavigate('home')}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        ← Back to Home
      </button>
    </div>
  </div>
);

const UploadPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Upload Page</h2>
      <button 
        onClick={() => onNavigate('home')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        ← Back to Home
      </button>
    </div>
  </div>
);

const AboutPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">About Page</h2>
      <button 
        onClick={() => onNavigate('home')}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        ← Back to Home
      </button>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'scan' | 'upload' | 'about'>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as 'home' | 'scan' | 'upload' | 'about');
  };

  // Render current page
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