'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Users, Sparkles, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { ACHIEVEMENTS } from '@/data/portfolioData';

const ICON_MAP = [Trophy, Award, Star, Users];

const TERRACOTTA = '#e06b3a';
const AMBER = '#f59e0b';

export default function AchievementsSection() {
  const featuredAchievement = ACHIEVEMENTS.find((a) => a.images && a.images.length > 0);
  const otherAchievements = ACHIEVEMENTS.filter((a) => a !== featuredAchievement);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <section className="py-24 relative border-t border-b border-white/5 overflow-hidden" style={{ background: '#07090e' }}>
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'rgba(245,158,11,0.06)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{ color: AMBER, background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.25)' }}
          >
            Honors &amp; Leadership Spotlight
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Key Achievements &amp;{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${TERRACOTTA}, ${AMBER})` }}
            >
              Excellence Awards
            </span>
          </h2>
          <div
            className="w-20 h-1 rounded-full mt-4"
            style={{ background: `linear-gradient(90deg, ${TERRACOTTA}, ${AMBER})` }}
          />
        </div>

        {/* 🏆 FEATURED SPOTLIGHT: AIESEC Award Winning Photos & Story 🏆 */}
        {featuredAchievement && featuredAchievement.images && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 glass-card rounded-3xl border border-amber-500/40 shadow-2xl shadow-amber-500/10 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

              {/* Photo Showcase (Left 5 Cols on desktop) */}
              <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[460px] bg-black flex items-center justify-center group/award">
                <img
                  src={featuredAchievement.images[activeImageIndex]}
                  alt={featuredAchievement.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/award:scale-105"
                  style={{ objectPosition: 'center center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />

                {/* Photo Switcher Arrows if >1 image */}
                {featuredAchievement.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === 0 ? 1 : 0))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-amber-500 hover:text-black text-white transition-all z-20 border border-white/20 shadow-lg"
                      aria-label="Previous Photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === 0 ? 1 : 0))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-amber-500 hover:text-black text-white transition-all z-20 border border-white/20 shadow-lg"
                      aria-label="Next Photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Photo Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/70 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                      {featuredAchievement.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            activeImageIndex === idx ? 'w-5 bg-amber-500' : 'w-2 bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Award Badge Overlay */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500 text-black text-xs font-mono font-extrabold shadow-lg">
                  <Trophy className="w-4 h-4 fill-black" />
                  <span>CS Eminence &apos;24 Award Winner</span>
                </div>
              </div>

              {/* Award Details & Quote (Right 7 Cols) */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                      {featuredAchievement.organization}
                    </span>
                    <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Year {featuredAchievement.year}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                    🏆 {featuredAchievement.title}
                  </h3>

                  {/* Inspirational Reflection Quote */}
                  {featuredAchievement.quote && (
                    <div className="relative p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <Quote className="w-8 h-8 text-amber-400/30 absolute top-3 right-3" />
                      {featuredAchievement.quote.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-sm text-gray-300 leading-relaxed font-sans">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Recognized across AIESEC in UoM &amp; AIESEC in Colombo South</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Grid Cards for Other Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherAchievements.map((ach, idx) => {
            const IconComp = ICON_MAP[idx % ICON_MAP.length];

            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-amber-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      {ach.year}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">
                    {ach.organization}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
