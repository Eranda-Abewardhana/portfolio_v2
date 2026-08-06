'use client';

import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 relative overflow-hidden py-12" style={{ background: '#07090e' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Executive Brand Footer Header */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#hero" className="text-xl font-extrabold text-white tracking-wide uppercase flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-black">ES</span>
              Eranda <span style={{ color: '#e06b3a' }}>Sathsara</span>
            </a>
            <p className="text-xs text-gray-400 mt-1.5 max-w-md leading-relaxed font-mono">
              AI Engineer &amp; Full-Stack Developer specializing in Multi-Agent AI systems, RAG, and cloud microservices.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-300 transition-all duration-300"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e06b3a';
                e.currentTarget.style.borderColor = 'rgba(224,107,58,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-300 transition-all duration-300"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f59e0b';
                e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-300 transition-all duration-300"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e06b3a';
                e.currentTarget.style.borderColor = 'rgba(224,107,58,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg"
            style={{
              background: 'rgba(224,107,58,0.15)',
              border: '1px solid rgba(224,107,58,0.35)',
              color: '#e06b3a',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e06b3a';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(224,107,58,0.15)';
              e.currentTarget.style.color = '#e06b3a';
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Professional Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 text-center gap-2">
          <p>© {new Date().getFullYear()} Eranda Sathsara Abewardhana. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            Architected for High-Performance AI &amp; Full-Stack Systems
          </p>
        </div>
      </div>
    </footer>
  );
}
