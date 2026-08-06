'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { EXPERIENCES } from '@/data/portfolioData';

const TERRACOTTA = '#e06b3a';
const AMBER = '#f59e0b';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden" style={{ background: '#07090e' }}>
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'rgba(196,85,40,0.05)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{ color: AMBER, background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.25)' }}>
            Work Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Industry{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${TERRACOTTA}, ${AMBER})` }}>
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 rounded-full mt-4"
            style={{ background: `linear-gradient(90deg, ${TERRACOTTA}, ${AMBER})` }} />
        </div>

        {/* Timeline */}
        <div className="relative ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10 border-l-2"
          style={{ borderColor: `${TERRACOTTA}40` }}>
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative group"
            >
              {/* Timeline Node */}
              <div
                className="absolute -left-[37px] sm:-left-[53px] top-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                style={{
                  background: '#07090e',
                  border: `2px solid ${TERRACOTTA}`,
                  color: TERRACOTTA,
                  boxShadow: `0 4px 20px rgba(224,107,58,0.25)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = TERRACOTTA;
                  (e.currentTarget as HTMLDivElement).style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = '#07090e';
                  (e.currentTarget as HTMLDivElement).style.color = TERRACOTTA;
                }}
              >
                <Briefcase className="w-5 h-5" />
              </div>

              {/* Card */}
              <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="font-semibold text-base flex items-center gap-2 mt-0.5" style={{ color: TERRACOTTA }}>
                      <span>{exp.company}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border w-fit"
                    style={{ color: AMBER, background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)' }}>
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                </div>

                <ul className="space-y-3 mt-4">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <ChevronRight className="w-4 h-4 shrink-0 mt-1" style={{ color: TERRACOTTA }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10"
                      style={{ color: AMBER }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
