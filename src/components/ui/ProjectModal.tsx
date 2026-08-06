'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, CheckCircle2, Video } from 'lucide-react';
import { Project } from '@/data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl bg-[#07090e] border border-[#e06b3a]/40 rounded-3xl shadow-2xl shadow-[#e06b3a]/15 overflow-hidden z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header Image or Video Banner */}
          {project.image ? (
            <div className="relative h-80 sm:h-[420px] w-full bg-black">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain bg-black"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors z-20 border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 z-10">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500 text-black font-mono shadow-md">
                  {project.category} • {project.year}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  {project.title}
                </h2>
                <p className="text-amber-200 text-sm mt-1">{project.subtitle}</p>
              </div>
            </div>
          ) : (
            <div className={`p-8 bg-gradient-to-r ${project.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black text-white transition-colors z-10 border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative z-10">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/20 text-white backdrop-blur-sm font-mono">
                  {project.category} • {project.year}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  {project.title}
                </h2>
                <p className="text-amber-100 text-sm mt-1">{project.subtitle}</p>
              </div>
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                Project Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-3">
                Architectural Highlights &amp; Features
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#e06b3a' }} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10"
                    style={{ color: '#f59e0b' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Native MP4 Video Player */}
            {project.videoSrc && (
              <div className="pt-2">
                <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Video className="w-4 h-4 text-amber-400" />
                  Native High-Quality Video Demonstration
                </h3>
                <div className="w-full rounded-2xl overflow-hidden border border-amber-500/30 bg-black p-2 flex justify-center">
                  <video
                    src={project.videoSrc}
                    controls
                    playsInline
                    className="w-full max-h-[440px] rounded-xl object-contain bg-black"
                    poster={project.image}
                  />
                </div>
              </div>
            )}

            {/* GitHub Repositories */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
              {project.frontendGithub && (
                <a
                  href={project.frontendGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl glass-card text-white hover:border-[#e06b3a]/50 flex items-center gap-2 transition-all hover:scale-105"
                  style={{ borderColor: 'rgba(224,107,58,0.3)' }}
                >
                  <Github className="w-4 h-4" style={{ color: '#e06b3a' }} />
                  Frontend Repository
                </a>
              )}
              {project.backendGithub && (
                <a
                  href={project.backendGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl glass-card text-white hover:border-amber-500/50 flex items-center gap-2 transition-all hover:scale-105"
                  style={{ borderColor: 'rgba(245,158,11,0.3)' }}
                >
                  <Github className="w-4 h-4 text-amber-400" />
                  Backend Repository
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl glass-card text-white hover:border-[#e06b3a]/50 flex items-center gap-2 transition-all hover:scale-105"
                  style={{ borderColor: 'rgba(224,107,58,0.3)' }}
                >
                  <Github className="w-4 h-4" style={{ color: '#e06b3a' }} />
                  GitHub Repository
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
