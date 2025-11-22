import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download, Sparkles } from 'lucide-react';
import StarsBackground from '../components/StarsBackground';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

interface ResultsPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  analysisResult: string;
  capturedImage: string;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  onNavigate,
  currentPage,
  analysisResult,
  capturedImage,
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Product Sustainability Analysis',
        text: 'Check out this sustainability analysis from EcoSage!',
      }).catch(console.error);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([analysisResult], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `sustainability-analysis-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-black">
      <StarsBackground />

      <div className="relative z-10 pb-20">
        <Header title="Analysis Results" />

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => onNavigate('scan')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>New Scan</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Image Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 p-4"
          >
            <img
              src={capturedImage}
              alt="Analyzed product"
              className="w-full max-h-64 object-contain rounded-xl"
            />
          </motion.div>

          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-400">
              AI-Powered Analysis by Gemini
            </span>
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 md:p-8"
          >
            <pre className="whitespace-pre-wrap font-sans text-sm md:text-base text-gray-200 leading-relaxed">
              {analysisResult}
            </pre>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <button
              onClick={() => onNavigate('scan')}
              className="py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-100 active:scale-[0.98] transition-all"
            >
              Scan Another Product
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 active:scale-[0.98] transition-all border border-gray-700"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default ResultsPage;