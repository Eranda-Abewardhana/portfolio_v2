'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Brain, Layers, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

const HeroCanvas = dynamic(() => import('../3d/HeroCanvas'), { ssr: false });

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#07090e' }}
    >
      {/* ══════════════════════════════════════════════════
          LAYER 1 — Zoomed-out Photo background container
          Right-aligned on desktop so body, suit, tie & face are fully visible
      ══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 flex items-center justify-end overflow-hidden pointer-events-none p-4 sm:p-8">
        <div className="relative w-full lg:w-[54vw] xl:w-[48vw] h-[85vh] lg:h-[90vh] rounded-3xl overflow-hidden transition-all duration-700">
          <Image
            src="/images/eranda_suit_thinking.png"
            alt="Eranda Sathsara"
            fill
            priority
            quality={100}
            sizes="(max-width: 1024px) 100vw, 54vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%', // Perfectly framed: full head, suit, arms & pose
            }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          LAYER 2 — Gradient overlays for text legibility
      ══════════════════════════════════════════════════ */}

      {/* Left-to-right dark gradient — darkens text area, leaves right photo clear */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(7,9,14,0.97) 0%, rgba(7,9,14,0.90) 32%, rgba(7,9,14,0.50) 52%, rgba(7,9,14,0.10) 68%, transparent 82%)',
        }}
      />

      {/* Bottom-up dark fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #07090e 0%, transparent 100%)',
        }}
      />

      {/* Top navbar fade */}
      <div
        className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(7,9,14,0.75) 0%, transparent 100%)',
        }}
      />

      {/* Mobile overlay */}
      <div
        className="lg:hidden absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(7,9,14,0.05) 0%, rgba(7,9,14,0.0) 30%, rgba(7,9,14,0.82) 58%, rgba(7,9,14,0.98) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════
          LAYER 3 — 3D Particles & corner accents (WebGL)
      ══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* ══════════════════════════════════════════════════
          LAYER 4 — Text content & Buttons matching image
      ══════════════════════════════════════════════════ */}
      <div className="relative z-30 flex items-center min-h-screen w-full">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">

          <div className="mt-auto lg:mt-0 lg:max-w-[52%] xl:max-w-[46%]
                          flex flex-col justify-end lg:justify-center
                          min-h-[100vh] lg:min-h-0 lg:h-auto
                          pt-[55vh] lg:pt-0">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5"
            >
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-[11px] font-mono font-bold tracking-wider uppercase shadow-lg"
                style={{
                  color: '#f59e0b',
                  background: 'rgba(21, 28, 40, 0.85)',
                  borderColor: 'rgba(245, 158, 11, 0.4)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: '#e06b3a' }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#e06b3a' }} />
                </span>
                OPEN TO AI &amp; FULL-STACK ENGINEERING ROLES
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black text-white leading-none tracking-tight mb-4"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                textShadow: '0 2px 24px rgba(0,0,0,1)',
              }}
            >
              <span className="block">Eranda</span>
              <span className="block" style={{ color: '#e06b3a' }}>Sathsara</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg font-semibold mb-4 text-white/80"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.9)' }}
            >
              <span style={{ color: '#e06b3a' }}>AI Engineer</span>
              {' '}·{' '}ML Architect{' '}·{' '}Full-Stack Dev
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base text-white/55 leading-relaxed mb-6 max-w-sm"
            >
              Final-year <strong className="text-white/85">AI undergraduate at University of Moratuwa</strong>{' '}
              with 2+ years building{' '}
              <strong style={{ color: '#e06b3a' }}>Multi-Agent AI</strong> &amp;{' '}
              <strong style={{ color: '#f59e0b' }}>RAG systems</strong>.
            </motion.p>

            {/* Tech pills */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-7"
            >
              {[
                { icon: <Brain className="w-3 h-3" />, text: 'LlamaIndex & RAG', color: '#e06b3a' },
                { icon: <Terminal className="w-3 h-3" />, text: 'FastAPI & Python', color: '#f59e0b' },
                { icon: <Layers className="w-3 h-3" />, text: 'AWS & Docker', color: '#8c9aad' },
              ].map(({ icon, text, color }) => (
                <span
                  key={text}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5"
                  style={{
                    color,
                    background: 'rgba(7,9,14,0.65)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <span style={{ color }}>{icon}</span>
                  {text}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-xl text-white font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #c45528 0%, #e06b3a 50%, #f59e0b 100%)',
                  boxShadow: '0 8px 30px rgba(224,107,58,0.45)',
                }}
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white hover:scale-105 transition-all duration-300"
                style={{
                  background: 'rgba(21, 28, 40, 0.85)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(224, 107, 58, 0.8)';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                  e.currentTarget.style.background = 'rgba(21, 28, 40, 0.85)';
                }}
              >
                Let&apos;s Talk
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
      >
        <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
