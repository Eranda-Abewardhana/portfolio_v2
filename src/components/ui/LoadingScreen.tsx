'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

const LoaderCanvas = dynamic(() => import('../3d/LoaderCanvas'), { ssr: false });

const STATUS_MESSAGES = [
  'INITIALIZING NEURAL PIPELINES...',
  'LOADING 3D PORTRAIT SPACE...',
  'SYNCHRONIZING AI AGENTS...',
  'COMPILING INTERACTIVE CANVAS...',
  'SYSTEM READY.',
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip loader if direct hash anchor or already seen in session
    if (typeof window !== 'undefined') {
      if (window.location.hash || sessionStorage.getItem('portfolio_loaded')) {
        setIsLoading(false);
        return;
      }
    }

    // Safety fallback timer to guarantee loader closes within 1.5s max
    const maxTimer = setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
      if (typeof window !== 'undefined') sessionStorage.setItem('portfolio_loaded', 'true');
    }, 1500);

    // Smooth fast progress increment (0 -> 100 in ~1.0s)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearTimeout(maxTimer);
          setTimeout(() => {
            setIsLoading(false);
            if (typeof window !== 'undefined') sessionStorage.setItem('portfolio_loaded', 'true');
          }, 200);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 14) + 10;
        return next > 100 ? 100 : next;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    // Cycle status messages based on progress
    if (progress < 25) setStatusIndex(0);
    else if (progress < 55) setStatusIndex(1);
    else if (progress < 80) setStatusIndex(2);
    else if (progress < 99) setStatusIndex(3);
    else setStatusIndex(4);
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="3d-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#07090e]"
        >
          {/* Ambient Glow Effects */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-40"
            style={{ background: 'rgba(224,107,58,0.25)' }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-30"
            style={{ background: 'rgba(245,158,11,0.2)' }}
          />

          {/* 3D WebGL Flash Graphic Canvas */}
          <div className="absolute inset-0 pointer-events-none">
            <LoaderCanvas />
          </div>

          {/* Center HUD Information */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">

            {/* Glowing Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-amber-500/40 flex items-center justify-center shadow-2xl shadow-amber-500/20 backdrop-blur-xl mb-6"
              style={{ background: 'rgba(21, 28, 40, 0.85)' }}
            >
              <span
                className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #e06b3a, #f59e0b)' }}
              >
                ES
              </span>
            </motion.div>

            {/* Title & Subtitle */}
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase mb-1">
              Eranda Sathsara
            </h1>
            <p className="text-xs font-mono font-semibold tracking-widest text-amber-400/90 uppercase mb-8 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              AI Engineer &amp; Full-Stack Architect
            </p>

            {/* Live Progress HUD */}
            <div className="w-72 sm:w-80 space-y-3">

              {/* Status Message & Percentage */}
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-gray-300">
                <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                  <Terminal className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                  <span className="truncate text-amber-400/90">{STATUS_MESSAGES[statusIndex]}</span>
                </div>
                <span className="text-amber-400 font-extrabold">{progress}%</span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10 backdrop-blur-md shadow-inner">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #c45528, #e06b3a, #f59e0b)',
                    boxShadow: '0 0 12px rgba(245,158,11,0.8)',
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>

            </div>

          </div>

          {/* Bottom Footer Note */}
          <div className="absolute bottom-6 z-10 text-[10px] font-mono tracking-widest text-white/30 uppercase">
            3D Interactive Portfolio • Moratuwa AI
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
