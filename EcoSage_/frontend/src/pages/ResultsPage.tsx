import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Sparkles,
  Package,
  Leaf,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Factory,
  Recycle,
  Droplet,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import StarsBackground from '../components/StarsBackground';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { AnalysisSchema } from '../services/AnalysisParser';
import type { AnalysisData } from '../services/AnalysisParser';

interface ResultsPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  analysisResult: string;
  capturedImage: string;
}

// Helper function to get emoji from score
const getScoreEmoji = (score: number): string => {
  if (score >= 8) return '🌱';
  if (score >= 6) return '👍';
  if (score >= 4) return '⚠️';
  return '❌';
};

// Helper to format score description
const getScoreDescription = (score: number): string => {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Fair';
  return 'Poor';
};

const ResultsPage: React.FC<ResultsPageProps> = ({
  onNavigate,
  currentPage,
  analysisResult,
  capturedImage,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['overview', 'score', 'alternatives', 'pros-cons', 'tips', 'verdict'])
  );

  // Parse analysis using useMemo to avoid re-parsing on every render
  const parsedData = useMemo<AnalysisData | null>(() => {
    try {
      return AnalysisSchema.parse(analysisResult);
    } catch (err) {
      console.error('Invalid analysis format', err);
      return null;
    }
  }, [analysisResult]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleShare = () => {
    if (navigator.share && parsedData) {
      navigator.share({
        title: `${parsedData.product.name} - Sustainability Analysis`,
        text: `Sustainability Score: ${parsedData.score.total}/10 - ${parsedData.verdict}`,
      }).catch(console.error);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([analysisResult], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${parsedData?.product.name || 'product'}-analysis-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'from-green-600 to-green-400';
    if (score >= 5) return 'from-yellow-600 to-yellow-400';
    return 'from-red-600 to-red-400';
  };

  if (!parsedData) {
    return (
      <div className="min-h-screen relative text-white overflow-hidden bg-black flex items-center justify-center">
        <StarsBackground />
        <div className="relative z-10">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Analyzing results...</p>
        </div>
      </div>
    );
  }

  // Extract values for easier access
  const scoreEmoji = getScoreEmoji(parsedData.score.total);
  const scoreDescription = getScoreDescription(parsedData.score.total);
  const formattedScore = Math.round(parsedData.score.total * 10) / 10;

  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-black">
      <StarsBackground />

      <div className="relative z-10 pb-20">
        <Header title="Analysis Results" />

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => onNavigate('scan')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">New Scan</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2.5 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2.5 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-800 p-6 md:p-8 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="w-full md:w-48 h-48 flex-shrink-0">
                <img
                  src={capturedImage}
                  alt={parsedData.product.name}
                  className="w-full h-full object-contain rounded-2xl bg-black/20"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {parsedData.product.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300">
                        {parsedData.product.brand}
                      </span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300">
                        {parsedData.product.category}
                      </span>
                    </div>
                  </div>
                  <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0" />
                </div>

                {/* Score Display */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Sustainability Score</span>
                    <span className="text-sm text-gray-400">{scoreDescription}</span>
                  </div>
                  <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(parsedData.score.total / 10) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${getScoreColor(formattedScore)}`}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-3xl font-bold">{parsedData.score.total}/10</span>
                    <span className="text-4xl">{scoreEmoji}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 overflow-hidden"
          >
            <button
              onClick={() => toggleSection('breakdown')}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold">Score Breakdown</h2>
              </div>
              {expandedSections.has('breakdown') ? <ChevronUp /> : <ChevronDown />}
            </button>

            <AnimatePresence>
              {expandedSections.has('breakdown') && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-800"
                >
                  <div className="p-6 grid md:grid-cols-2 gap-4">
                    {[
                      { 
                        label: 'Packaging', 
                        value: parsedData.score.breakdown.packaging.score, 
                        reason: parsedData.score.breakdown.packaging.reason,
                        icon: Package, 
                        color: 'text-green-400' 
                      },
                      { 
                        label: 'Production', 
                        value: parsedData.score.breakdown.production.score, 
                        reason: parsedData.score.breakdown.production.reason,
                        icon: Factory, 
                        color: 'text-blue-400' 
                      },
                      { 
                        label: 'Company Ethics', 
                        value: parsedData.score.breakdown.ethics.score, 
                        reason: parsedData.score.breakdown.ethics.reason,
                        icon: CheckCircle, 
                        color: 'text-purple-400' 
                      },
                      { 
                        label: 'Lifecycle', 
                        value: parsedData.score.breakdown.lifecycle.score, 
                        reason: parsedData.score.breakdown.lifecycle.reason,
                        icon: Recycle, 
                        color: 'text-yellow-400' 
                      }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-xl">
                        <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-400 mb-1">{item.label}</div>
                          <div className="text-white font-semibold text-sm mb-1">{item.value}/10</div>
                          <div className="text-gray-400 text-xs leading-relaxed">{item.reason}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pros & Cons - Collapsible */}
          {(parsedData.pros.length > 0 || parsedData.cons.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => toggleSection('pros-cons')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-bold">Pros & Cons</h2>
                </div>
                {expandedSections.has('pros-cons') ? <ChevronUp /> : <ChevronDown />}
              </button>

              <AnimatePresence>
                {expandedSections.has('pros-cons') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-800"
                  >
                    <div className="p-6 grid md:grid-cols-2 gap-6">
                      {/* Pros */}
                      {parsedData.pros.length > 0 && (
                        <div className="bg-green-900/20 backdrop-blur-lg rounded-xl border border-green-800/30 p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <h3 className="text-lg font-bold">Pros</h3>
                          </div>
                          <ul className="space-y-2">
                            {parsedData.pros.map((pro: string, i: number) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-start space-x-2 text-sm text-gray-300"
                              >
                                <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                                <span>{pro}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Cons */}
                      {parsedData.cons.length > 0 && (
                        <div className="bg-red-900/20 backdrop-blur-lg rounded-xl border border-red-800/30 p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <XCircle className="w-5 h-5 text-red-400" />
                            <h3 className="text-lg font-bold">Cons</h3>
                          </div>
                          <ul className="space-y-2">
                            {parsedData.cons.map((con: string, i: number) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-start space-x-2 text-sm text-gray-300"
                              >
                                <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
                                <span>{con}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Alternatives */}
          {parsedData.alternatives.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => toggleSection('alternatives')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Leaf className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl font-bold">Better Alternatives</h2>
                </div>
                {expandedSections.has('alternatives') ? <ChevronUp /> : <ChevronDown />}
              </button>

              <AnimatePresence>
                {expandedSections.has('alternatives') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-800"
                  >
                    <div className="p-6 space-y-4">
                      {parsedData.alternatives.map((alt, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-5 bg-gradient-to-br from-green-900/20 to-gray-800/20 rounded-xl border border-green-800/30 hover:border-green-700/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-bold text-white mb-1">{alt.name}</h4>
                              <p className="text-sm text-gray-400">{alt.brand}</p>
                            </div>
                            <span className="text-2xl">🌿</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3 leading-relaxed">{alt.reason}</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300">
                              💰 {alt.price}
                            </span>
                            <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300">
                              📍 {alt.availability}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Action Tips */}
          {(parsedData.tips.recycling.length > 0 || parsedData.tips.reduce.length > 0 || parsedData.tips.choices.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => toggleSection('tips')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-bold">Action Tips</h2>
                </div>
                {expandedSections.has('tips') ? <ChevronUp /> : <ChevronDown />}
              </button>

              <AnimatePresence>
                {expandedSections.has('tips') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-800"
                  >
                    <div className="p-6 space-y-6">
                      {/* Recycling Tips */}
                      {parsedData.tips.recycling.length > 0 && (
                        <div>
                          <h4 className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                            <Recycle className="w-4 h-4" />
                            <span>Recycling</span>
                          </h4>
                          <ul className="space-y-2">
                            {parsedData.tips.recycling.map((tip: string, i: number) => (
                              <li key={i} className="flex items-start space-x-2 text-sm text-gray-400">
                                <span className="text-green-400 mt-0.5">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Reduce Impact Tips */}
                      {parsedData.tips.reduce.length > 0 && (
                        <div>
                          <h4 className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                            <Droplet className="w-4 h-4" />
                            <span>Reduce Impact</span>
                          </h4>
                          <ul className="space-y-2">
                            {parsedData.tips.reduce.map((tip: string, i: number) => (
                              <li key={i} className="flex items-start space-x-2 text-sm text-gray-400">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Better Choices Tips */}
                      {parsedData.tips.choices.length > 0 && (
                        <div>
                          <h4 className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                            <Leaf className="w-4 h-4" />
                            <span>Better Choices</span>
                          </h4>
                          <ul className="space-y-2">
                            {parsedData.tips.choices.map((tip: string, i: number) => (
                              <li key={i} className="flex items-start space-x-2 text-sm text-gray-400">
                                <span className="text-purple-400 mt-0.5">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Verdict */}
          {parsedData.verdict && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => toggleSection('verdict')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-bold">Overall Verdict</h2>
                </div>
                {expandedSections.has('verdict') ? <ChevronUp /> : <ChevronDown />}
              </button>

              <AnimatePresence>
                {expandedSections.has('verdict') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-800"
                  >
                    <div className="p-6">
                      <div className="bg-gradient-to-br from-purple-900/20 to-gray-900/60 backdrop-blur-lg rounded-xl border border-purple-800/30 p-4">
                        <p className="text-gray-300 leading-relaxed">{parsedData.verdict}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <button
              onClick={() => onNavigate('scan')}
              className="py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-100 active:scale-[0.98] transition-all shadow-lg"
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