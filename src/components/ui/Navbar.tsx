'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const TERRACOTTA = '#e06b3a';
const AMBER = '#f59e0b';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
      style={scrolled ? { background: 'rgba(7,9,14,0.85)', boxShadow: '0 4px 30px rgba(196,85,40,0.08)' } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Executive Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center p-[1.5px] group-hover:scale-105 transition-transform duration-300 shadow-md"
            style={{ background: `linear-gradient(135deg, ${TERRACOTTA}, ${AMBER})` }}
          >
            <div className="w-full h-full rounded-[10px] flex items-center justify-center font-black text-sm tracking-tighter" style={{ background: '#07090e', color: AMBER }}>
              ES
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-white tracking-wide uppercase flex items-center gap-1">
              Eranda <span style={{ color: TERRACOTTA }}>Sathsara</span>
            </span>
            <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase -mt-0.5">
              AI &amp; Systems Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 glass-card px-6 py-2 rounded-full border border-white/10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition-colors duration-200 relative group"
              style={{}}
              onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              {link.name}
              <span
                className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: `linear-gradient(90deg, ${TERRACOTTA}, ${AMBER})` }}
              />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="px-4 py-2 text-sm font-semibold rounded-xl text-white flex items-center gap-2 hover:scale-105 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${TERRACOTTA}, ${AMBER})`,
              boxShadow: `0 4px 20px rgba(224,107,58,0.35)`,
            }}
          >
            <Sparkles className="w-4 h-4" />
            Get In Touch
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg glass-card"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-xl border-b border-white/10 px-6 py-6"
            style={{ background: 'rgba(7,9,14,0.97)' }}
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-200 transition-colors py-2 border-b border-white/5"
                  onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center py-3 text-sm font-semibold rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${TERRACOTTA}, ${AMBER})` }}
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
