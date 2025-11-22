import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RotateCcw, Zap, Info, Scan, AlertCircle } from "lucide-react";
import StarsBackground from '../components/StarsBackground';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

interface ScanPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const ScanPage: React.FC<ScanPageProps> = ({ onNavigate, currentPage }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [state, setState] = useState<'loading' | 'ready' | 'error' | 'captured' | 'scanning'>('loading');
  const [error, setError] = useState<string>("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Initialize camera on mount
  useEffect(() => {
    let mounted = true;
    let timeoutId: number;

    const initCamera = async () => {
      try {
        console.log("Requesting camera access...");
        
        // Request camera permission and stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
        });

        console.log("Camera stream obtained");

        if (!mounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        streamRef.current = stream;

        console.log("Video ref exists?", !!videoRef.current);
        
        if (videoRef.current) {
          const video = videoRef.current;
          console.log("Video element:", video);
          
          // Critical: Set properties BEFORE srcObject
          video.muted = true;
          video.playsInline = true;
          video.autoplay = true;
          video.setAttribute("playsinline", "");
          video.setAttribute("autoplay", "");
          video.setAttribute("muted", "");
          
          // Now set stream
          video.srcObject = stream;
          
          console.log("Video element configured, stream assigned");
          
          // Multiple event listeners for reliability
          const handleCanPlay = () => {
            console.log("Video can play event fired");
            if (mounted) {
              setState('ready');
            }
          };

          const handleLoadedMetadata = () => {
            console.log("Video metadata loaded event fired");
            // Force play
            video.play()
              .then(() => {
                console.log("Video playing successfully");
                if (mounted) {
                  setState('ready');
                }
              })
              .catch((playErr) => {
                console.error("Play error:", playErr);
                // Even if play fails, try to set ready
                if (mounted) {
                  setState('ready');
                }
              });
          };

          video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
          video.addEventListener('canplay', handleCanPlay, { once: true });
          
          // Aggressive fallback: Try multiple times
          let attempts = 0;
          const tryPlay = () => {
            attempts++;
            console.log(`Attempting to play video (attempt ${attempts})`);
            
            if (video.readyState >= 2) {
              console.log(`Video ready state: ${video.readyState}`);
              video.play()
                .then(() => {
                  console.log("Video playing from fallback");
                  if (mounted) {
                    setState('ready');
                  }
                })
                .catch((err) => {
                  console.error(`Play attempt ${attempts} failed:`, err);
                  if (attempts < 3 && mounted) {
                    setTimeout(tryPlay, 500);
                  } else if (mounted) {
                    // Give up and show it anyway
                    console.log("Forcing ready state despite play failure");
                    setState('ready');
                  }
                });
            } else if (attempts < 5 && mounted) {
              console.log(`Video not ready (state: ${video.readyState}), retrying...`);
              setTimeout(tryPlay, 300);
            }
          };
          
          // Start trying after a brief delay
          timeoutId = setTimeout(tryPlay, 500);
        }
      } catch (err) {
        console.error("Camera error:", err);
        if (mounted) {
          const error = err as { name?: string };
          if (error.name === 'NotAllowedError') {
            setError("Camera permission denied. Please allow camera access.");
          } else if (error.name === 'NotFoundError') {
            setError("No camera found on this device.");
          } else {
            setError("Unable to access camera. Please try again.");
          }
          setState('error');
        }
      }
    };

    initCamera();

    // Cleanup
    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Capture image from video
  const handleCapture = () => {
    if (!videoRef.current || state !== 'ready') return;

    setState('scanning');

    // Simulate scanning delay for UX
    setTimeout(() => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      
      // Set canvas size to video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64 image
      const imageData = canvas.toDataURL('image/jpeg', 0.95);
      setCapturedImage(imageData);
      
      // Stop camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      setState('captured');
    }, 1500);
  };

  // Retake photo
  const handleRetake = async () => {
    setCapturedImage(null);
    setState('loading');
    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.setAttribute("playsinline", "");
        video.setAttribute("autoplay", "");
        video.setAttribute("muted", "");
        video.muted = true;
        video.playsInline = true;
        
        const handleReady = async () => {
          try {
            await video.play();
            setState('ready');
          } catch (err) {
            console.error("Play error on retake:", err);
          }
        };

        video.addEventListener('loadedmetadata', handleReady, { once: true });
        video.addEventListener('canplay', handleReady, { once: true });
        
        // Fallback
        setTimeout(() => {
          if (video.readyState >= 2) {
            video.play().catch(console.error);
            setState('ready');
          }
        }, 1000);
      }
    } catch (err) {
      console.error("Retake error:", err);
      setError("Unable to restart camera");
      setState('error');
    }
  };

  // Analyze captured image
  const handleAnalyze = () => {
    if (!capturedImage) return;
    
    setAnalyzing(true);
    
    // Simulate analysis (replace with actual API call)
    setTimeout(() => {
      console.log('Analyzing image:', capturedImage.substring(0, 50) + '...');
      setAnalyzing(false);
      // Navigate to results page
      onNavigate('home');
    }, 2000);
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden bg-black">
      <StarsBackground />
      
      <div className="relative z-10 pb-20">
        <Header title="Scan" />
        
        <div className="max-w-md mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Product Scan</h1>
            <p className="text-gray-400 text-sm">
              {state === 'captured' && "Ready for analysis"}
              {state === 'ready' && "Position product in frame"}
              {state === 'loading' && "Initializing camera..."}
              {state === 'scanning' && "Capturing image..."}
              {state === 'error' && "Camera unavailable"}
            </p>
          </motion.div>

          {/* Camera/Preview Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gray-900/80 backdrop-blur-lg rounded-3xl border-2 border-gray-700 aspect-[3/4] overflow-hidden mb-8 shadow-2xl"
          >
            {/* Video element - always present but hidden when not needed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover absolute inset-0 ${
                state === 'ready' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Scan overlays - only show when camera is ready */}
            {state === 'ready' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Animated Scan Frame */}
                <motion.div
                  className="absolute inset-8 border-2 border-white/40 rounded-2xl"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Scan Line */}
                <motion.div
                  className="absolute left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{
                    top: ["10%", "90%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Corner Brackets */}
                <div className="absolute top-8 left-8 w-6 h-6 border-t-4 border-l-4 border-white/80"></div>
                <div className="absolute top-8 right-8 w-6 h-6 border-t-4 border-r-4 border-white/80"></div>
                <div className="absolute bottom-8 left-8 w-6 h-6 border-b-4 border-l-4 border-white/80"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 border-b-4 border-r-4 border-white/80"></div>

                {/* Center Guide */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 border-2 border-dashed border-white/60 rounded-full"
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Captured Image Preview */}
              {state === 'captured' && capturedImage && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center bg-black absolute inset-0 z-10"
                >
                  <img 
                    src={capturedImage} 
                    alt="Captured product" 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                    <p className="text-white text-sm font-medium">Image Captured ✓</p>
                  </div>
                </motion.div>
              )}

              {/* Scanning Animation */}
              {state === 'scanning' && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col items-center justify-center bg-black/50 absolute inset-0 z-10"
                >
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <Scan className="w-10 h-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-white text-lg font-semibold mt-6">Capturing...</p>
                  <p className="text-gray-400 text-sm mt-2">Hold steady</p>
                </motion.div>
              )}

              {/* Loading State */}
              {state === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black absolute inset-0 z-10"
                >
                  <div className="w-24 h-24 bg-gray-800/50 rounded-3xl flex items-center justify-center mb-6 border-2 border-gray-700">
                    <Camera className="w-12 h-12 text-gray-400 animate-pulse" />
                  </div>
                  <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <p className="text-gray-400 text-sm mt-4">Initializing camera...</p>
                </motion.div>
              )}

              {/* Error State */}
              {state === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-8 absolute inset-0 z-10"
                >
                  <div className="w-24 h-24 bg-red-900/20 rounded-3xl flex items-center justify-center mb-6 border-2 border-red-800/30">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                  </div>
                  <p className="text-red-400 text-center font-medium mb-2">{error}</p>
                  <p className="text-gray-500 text-sm text-center">
                    Check your browser settings and try again
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {state === 'captured' ? (
                <motion.div
                  key="captured-buttons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-3"
                >
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full py-4 bg-white text-black rounded-2xl font-bold text-lg hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 shadow-xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-6 h-6" />
                        <span>Analyze Sustainability</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleRetake}
                    disabled={analyzing}
                    className="w-full py-3.5 bg-gray-800/80 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-gray-700 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 border border-gray-700"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Retake Photo</span>
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="capture-button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={handleCapture}
                  disabled={state !== 'ready'}
                  className="w-full py-4 bg-white text-black rounded-2xl font-bold text-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 shadow-xl flex items-center justify-center space-x-3"
                >
                  <Camera className="w-6 h-6" />
                  <span>{state === 'scanning' ? 'Capturing...' : 'Capture Image'}</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800/50 p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Info className="w-5 h-5 text-gray-400" />
              <h3 className="text-white font-bold">Scanning Tips</h3>
            </div>
            <div className="space-y-3">
              {[
                "Ensure bright, even lighting",
                "Capture all labels and certifications",
                "Hold device steady to avoid blur",
                "Fill frame with product packaging"
              ].map((tip, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-400 text-sm leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 grid grid-cols-3 gap-4"
          >
            {[
              { label: "Accuracy", value: "95%" },
              { label: "Avg. Time", value: "2s" },
              { label: "AI Model", value: "GPT-4" }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-800/30">
                <div className="text-white font-bold text-lg">{stat.value}</div>
                <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ScanPage;