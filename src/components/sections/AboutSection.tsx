'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Cpu, Zap, ShieldCheck, Globe, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

const AboutCanvas = dynamic(() => import('../3d/AboutCanvas'), { ssr: false });

const TERRACOTTA = '#e06b3a';
const AMBER = '#f59e0b';
const NAVY = '#1a2a4a';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: '#07090e' }}>
      {/* bg ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(196,85,40,0.06)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'rgba(26,42,74,0.12)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border flex items-center gap-1.5"
            style={{ color: AMBER, background: 'rgba(224,107,58,0.1)', borderColor: 'rgba(224,107,58,0.25)' }}>
            <Sparkles className="w-3.5 h-3.5" />
            About Me
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Architecting{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${TERRACOTTA}, ${AMBER})` }}>
              Intelligent Systems
            </span>
            {' '}& Scale
          </h2>
          <div className="w-20 h-1 rounded-full mt-4"
            style={{ background: `linear-gradient(90deg, ${TERRACOTTA}, ${AMBER}, ${NAVY})` }} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card glass-card-hover p-6 rounded-2xl text-center border border-white/10"
            >
              <div className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${TERRACOTTA}, ${AMBER})` }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl border" style={{ background: 'rgba(224,107,58,0.1)', borderColor: 'rgba(224,107,58,0.3)', color: TERRACOTTA }}>
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Full-Stack &amp; Machine Learning Expertise</h3>
                  <p className="text-xs font-mono" style={{ color: AMBER }}>Generative AI • RAG • Backend Microservices</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                I am a final-year Artificial Intelligence honors student at the University of Moratuwa. Over the past 2+ years in the industry, I&apos;ve specialized in building enterprise-ready Multi-Agent AI systems, Retrieval-Augmented Generation (RAG) pipelines, and low-latency REST microservices in FastAPI and Django.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Whether deploying vector databases like Pinecone, fine-tuning deep neural networks in PyTorch, or building responsive interfaces in Next.js and Flutter, I focus on building robust, scalable solutions that solve complex real-world problems.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <Zap className="w-4 h-4" />, text: 'Fast Inference APIs', color: TERRACOTTA },
                { icon: <ShieldCheck className="w-4 h-4" />, text: 'Hallucination Mitigation', color: AMBER },
                { icon: <Globe className="w-4 h-4" />, text: 'Cloud CI/CD AWS', color: '#8c9aad' },
              ].map(({ icon, text, color }) => (
                <div key={text} className="flex items-center gap-2">
                  <span style={{ color }}>{icon}</span>
                  <span className="text-xs text-gray-300 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center items-center"
          >
            <div className="w-full glass-card p-4 rounded-3xl border border-white/10"
              style={{ background: 'linear-gradient(135deg, rgba(26,42,74,0.3), rgba(196,85,40,0.1))' }}>
              <div className="flex items-center justify-between px-4 pt-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: TERRACOTTA }}>
                  3D Interactive Portrait Space
                </span>
                <span className="text-[10px] font-mono" style={{ color: AMBER }}>Drag to Rotate</span>
              </div>
              <AboutCanvas />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
