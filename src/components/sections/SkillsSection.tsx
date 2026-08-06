'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { BrainCircuit, DatabaseZap, AppWindow, Rocket } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { SKILL_CATEGORIES } from '@/data/portfolioData';

const TechCanvas = dynamic(() => import('../3d/TechCanvas'), { ssr: false });

// Unique icon per category — completely different visual styles
const CATEGORY_CONFIG = [
  {
    icon: BrainCircuit,        // neural network / synapse look
    color: '#e06b3a',
    glow: 'rgba(224,107,58,0.25)',
    label: 'AI · ML · LLMs',
  },
  {
    icon: DatabaseZap,         // database with lightning bolt
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
    label: 'Backend · APIs',
  },
  {
    icon: AppWindow,           // app / window interface icon
    color: '#c45528',
    glow: 'rgba(196,85,40,0.25)',
    label: 'Frontend · Mobile',
  },
  {
    icon: Rocket,              // rocket / launch icon
    color: '#8c9aad',
    glow: 'rgba(140,154,173,0.25)',
    label: 'Cloud · DevOps',
  },
];

/* ── Animated count-up hook ── */
function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ── Single skill row with animated progress bar ── */
function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count = useCountUp(level, inView);

  return (
    <div ref={ref} className="group/skill">
      {/* Label row */}
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-200">
          {name}
        </span>
        <motion.span
          className="text-xs font-mono font-bold tabular-nums"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
        >
          {count}%
        </motion.span>
      </div>

      {/* Progress track */}
      <div className="relative h-2 rounded-full overflow-visible" style={{ background: 'rgba(255,255,255,0.05)' }}>
        {/* Track border */}
        <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.07)' }} />

        {/* Animated fill bar */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: `linear-gradient(90deg, ${color}99 0%, ${color} 100%)`,
            boxShadow: `0 0 8px ${color}60, 0 0 2px ${color}40`,
          }}
        />

        {/* Shimmer sweep */}
        <motion.div
          className="absolute top-0 h-full w-12 rounded-full pointer-events-none"
          initial={{ left: '-20%', opacity: 0 }}
          animate={inView ? { left: `${level - 8}%`, opacity: [0, 0.6, 0] } : {}}
          transition={{ duration: 1.1, delay, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
          }}
        />

        {/* Glowing end-dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
          initial={{ left: 0, opacity: 0, scale: 0 }}
          animate={inView ? { left: `calc(${level}% - 6px)`, opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: color,
            borderColor: `${color}40`,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden" style={{ background: 'rgba(7,9,14,0.97)' }}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'rgba(196,85,40,0.05)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{ color: '#f59e0b', background: 'rgba(224,107,58,0.1)', borderColor: 'rgba(224,107,58,0.25)' }}
          >
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            My{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #e06b3a, #f59e0b)' }}
            >
              Tech Arsenal
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
            Proficiency levels across AI/ML, Backend, Frontend, and Cloud DevOps.
          </p>
          <div
            className="w-20 h-1 rounded-full mt-4"
            style={{ background: 'linear-gradient(90deg, #e06b3a, #f59e0b)' }}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const cfg = CATEGORY_CONFIG[idx % CATEGORY_CONFIG.length];
            const IconComp = cfg.icon;

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className="glass-card rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${cfg.color}45`;
                  e.currentTarget.style.boxShadow = `0 0 40px ${cfg.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Card header strip */}
                <div
                  className="px-6 sm:px-8 pt-6 pb-4 flex items-center justify-between"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: `linear-gradient(135deg, ${cfg.color}08 0%, transparent 60%)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Unique icon with glow halo */}
                    <div
                      className="relative p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `${cfg.color}18`,
                        border: `1.5px solid ${cfg.color}35`,
                        boxShadow: `0 0 16px ${cfg.glow}`,
                      }}
                    >
                      <IconComp className="w-6 h-6" style={{ color: cfg.color }} />
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{ opacity: [0.3, 0, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        style={{ border: `1.5px solid ${cfg.color}`, scale: 1.15 }}
                      />
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{cat.title}</h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: cfg.color }}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>

                  {/* 3D polyhedron badge */}
                  <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                    <TechCanvas color={cfg.color} shapeIndex={idx} />
                  </div>
                </div>

                {/* Skills list */}
                <div className="px-6 sm:px-8 py-5 space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cfg.color}
                      delay={idx * 0.1 + sIdx * 0.08}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
