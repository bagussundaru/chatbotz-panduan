import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Image, Zap, AlertTriangle, CheckCircle, RotateCcw, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

const mockOCRResults = {
  meterNumber: 'HXE31052847291',
  reading: '4,527.8',
  brand: 'Hexing',
  status: 'Normal',
  lastSync: '2024-01-15 08:30',
  errors: [],
  warnings: ['Segel kiri terlihat longgar - verifikasi manual diperlukan'],
  details: {
    voltage: '220V',
    current: '12.5A',
    powerFactor: '0.98',
    frequency: '50Hz'
  }
};

export default function Scanner() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log('Camera access denied');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  React.useEffect(() => {
    if (showCamera && !capturedImage) {
      startCamera();
    }
    return () => stopCamera();
  }, [showCamera, capturedImage]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      stopCamera();
      analyzeImage(imageData);
    }
  };

  const selectFromGallery = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCapturedImage(e.target.result);
          stopCamera();
          analyzeImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const analyzeImage = (imageData) => {
    setIsAnalyzing(true);
    // Simulate OCR analysis
    setTimeout(() => {
      setResults(mockOCRResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setResults(null);
    setShowCamera(true);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 px-4 pt-12 safe-area-top">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-white font-semibold">Scanner Meter OCR</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Camera View / Captured Image */}
      <div className="flex-1 relative">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Advanced Holographic Scanning Frame */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-sm aspect-[3/4] relative">
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-cyan-400 rounded-br-xl shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                
                {/* Reticle / Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-0.5 h-8 bg-cyan-400/50" />
                  <div className="h-0.5 w-8 bg-cyan-400/50 absolute" />
                </div>

                {/* Animated Scanline using CSS Gradient */}
                <motion.div
                  initial={{ top: '0%', opacity: 0 }}
                  animate={{ 
                    top: ['0%', '100%', '0%'],
                    opacity: [0.2, 0.8, 0.2] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent blur-sm"
                />
                <motion.div
                  initial={{ top: '0%' }}
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-2 right-2 h-0.5 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                />

                {/* Status Text Overlay */}
                <div className="absolute -top-12 left-0 right-0 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-cyan-500/30">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-cyan-400 tracking-wider">LIVE FEED // AI SEARCHING</span>
                  </div>
                </div>

              </div>
            </div>
            <p className="absolute bottom-32 left-0 right-0 text-center text-white text-sm">
              Posisikan meter dalam bingkai
            </p>
          </>
        ) : (
          <div className="w-full h-full">
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-white font-medium">Menganalisis gambar...</p>
                <p className="text-gray-400 text-sm mt-1">OCR & Deteksi Anomali</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      {!capturedImage && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-8 pt-16 safe-area-bottom">
          <div className="max-w-lg mx-auto flex items-center justify-center gap-8">
            <button
              onClick={selectFromGallery}
              className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white"
            >
              <Image className="w-6 h-6" />
            </button>
            <button
              onClick={capturePhoto}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </button>
            <div className="w-14 h-14" />
          </div>
        </div>
      )}

      {/* Results Panel */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[70vh] overflow-y-auto safe-area-bottom"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Hasil Analisis</h2>
                <button
                  onClick={resetScanner}
                  className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Meter Info */}
              <div className="bg-gradient-to-r from-[#0F2B46] to-[#1A3A5C] rounded-2xl p-4 mb-4 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-cyan-400" />
                  <div>
                    <p className="text-xs text-gray-400">Nomor Meter</p>
                    <p className="font-mono font-semibold text-lg">{results.meterNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Pembacaan</p>
                    <p className="text-2xl font-bold">{results.reading} kWh</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Merek</p>
                    <p className="text-lg font-semibold">{results.brand}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <div>
                  <p className="font-medium text-emerald-900">Status: {results.status}</p>
                  <p className="text-sm text-emerald-700">Terakhir sinkron: {results.lastSync}</p>
                </div>
              </div>

              {/* Warnings */}
              {results.warnings.length > 0 && (
                <div className="p-4 bg-amber-50 rounded-xl mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-amber-900">Peringatan</p>
                      {results.warnings.map((warning, idx) => (
                        <p key={idx} className="text-sm text-amber-700 mt-1">{warning}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-gray-900 mb-3">Detail Teknis</p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(results.details).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="font-semibold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <Link
                  to={createPageUrl('Chatbot')}
                  className="py-3 px-4 bg-gray-100 rounded-xl text-center font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Konsultasi AI
                </Link>
                <Link
                  to={createPageUrl('Reports')}
                  className="py-3 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl text-center font-medium text-white hover:shadow-lg transition-all"
                >
                  Buat Laporan
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}