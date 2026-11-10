'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Headphones, Dna, Bot, Github, Sparkles, FolderGit2, Video, Image as ImageIcon, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { PROJECTS, Project } from '@/data/portfolioData';
import ProjectModal from '../ui/ProjectModal';

const ICON_MAP: Record<string, any> = {
  Scale: Scale,
  Headphones: Headphones,
  Dna: Dna,
  Bot: Bot,
};

const CATEGORIES = ['All', 'Robotics', 'AI/ML', 'NLP'];

const TERRACOTTA = '#e06b3a';
const AMBER = '#f59e0b';

/* ── High-Performance Native Media Carousel Component ── */
function ProjectCardCarousel({ project }: { project: Project }) {
  const slides: Array<{
    type: 'nativeVideo' | 'photo';
    src: string;
    caption: string;
  }> = [];

  // 1. Native MP4 Video
  if (project.videoSrc) {
    slides.push({
      type: 'nativeVideo',
      src: project.videoSrc,
      caption: '🎥 Project Video Demonstration',
    });
  }

  // 2. Main Photo
  if (project.image) {
    slides.push({
      type: 'photo',
      src: project.image,
      caption: project.id === 'youfira-robotics'
        ? '📸 Autonomous Robotic Vehicle & Hardware'
        : `📸 ${project.title}`,
    });
  }

  // 3. Additional Gallery Images
  if (project.galleryImages) {
    project.galleryImages.forEach((imgSrc) => {
      if (imgSrc !== project.image) {
        slides.push({
          type: 'photo',
          src: imgSrc,
          caption: '📸 Exhibition Showcase & Team',
        });
      }
    });
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slideshow every 5 seconds
  React.useEffect(() => {
    if (slides.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="relative w-full overflow-hidden bg-black/90 border-b border-white/10 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Bar Badges */}
      <div className="p-3 bg-[#07090e]/90 border-b border-white/10 flex items-center justify-between z-20 relative backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-amber-500 text-black shadow-md">
            {project.category}
          </span>
          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-white/10 text-amber-300 border border-white/10">
            {project.year}
          </span>
        </div>

        {/* Carousel Slide Counter */}
        {slides.length > 1 && (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-gray-300 border border-white/10">
            {currentSlide.type === 'nativeVideo' ? (
              <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
            ) : (
              <ImageIcon className="w-3 h-3 text-amber-400" />
            )}
            <span>
              Slide {currentIndex + 1} of {slides.length}
            </span>
          </div>
        )}
      </div>

      {/* Slide Viewport */}
      <div className="relative h-[340px] sm:h-[380px] w-full bg-black flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* TYPE 1: Native HTML5 MP4 Video */}
            {currentSlide.type === 'nativeVideo' && (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  src={currentSlide.src}
                  controls
                  controlsList="nodownload"
                  draggable={false}
                  onContextMenu={(event) => event.preventDefault()}
                  playsInline
                  className="w-full h-full object-contain bg-black"
                  poster={project.image}
                />
              </div>
            )}

            {/* TYPE 2: High-Res Photo */}
            {currentSlide.type === 'photo' && (
              <div className="relative w-full h-full bg-black">
                <img
                  src={currentSlide.src}
                  alt={project.title}
                  className="w-full h-full object-contain bg-black/90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-amber-500 hover:text-black text-white transition-all duration-200 z-30 border border-white/20 shadow-lg opacity-80 group-hover/carousel:opacity-100"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-amber-500 hover:text-black text-white transition-all duration-200 z-30 border border-white/20 shadow-lg opacity-80 group-hover/carousel:opacity-100"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Indicator Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/75 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-5 bg-amber-500' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Caption Badge */}
        <div className="absolute top-3 left-3 z-20 text-[11px] font-mono text-amber-300 bg-black/80 px-2.5 py-1 rounded-lg border border-amber-500/30 backdrop-blur-md max-w-[80%] truncate shadow-md">
          {currentSlide.caption}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" style={{ background: 'rgba(7,9,14,0.97)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{ color: AMBER, background: 'rgba(224,107,58,0.1)', borderColor: 'rgba(224,107,58,0.25)' }}
          >
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Featured{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, #e06b3a, #f59e0b)` }}
            >
              Production Projects
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
            Interactive project showcase featuring native MP4 videos, multi-photo carousels, and live architectural specs.
          </p>
          <div
            className="w-20 h-1 rounded-full mt-4"
            style={{ background: `linear-gradient(90deg, ${TERRACOTTA}, ${AMBER})` }}
          />
        </div>

        {/* Filter Tab Bar */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 glass-card"
              style={
                selectedCategory === cat
                  ? {
                      background: `linear-gradient(135deg, ${TERRACOTTA}, ${AMBER})`,
                      color: 'white',
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 25px rgba(224,107,58,0.35)',
                    }
                  : { color: '#9ca3af' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const IconComponent = ICON_MAP[project.iconName] || FolderGit2;
              const hasMedia = Boolean(project.videoSrc || project.image);

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`glass-card glass-card-hover rounded-3xl border ${
                    hasMedia ? 'border-amber-500/40 shadow-xl shadow-amber-500/10' : 'border-white/10'
                  } overflow-hidden flex flex-col justify-between group`}
                >
                  {/* Clean Media Carousel Header OR Compact Category Banner */}
                  {hasMedia ? (
                    <ProjectCardCarousel project={project} />
                  ) : (
                    /* Default Compact Banner for non-media cards */
                    <div className={`px-6 py-4 bg-gradient-to-r ${project.gradient} relative overflow-hidden flex items-center justify-between`}>
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-200">
                          {project.category}
                        </span>
                      </div>
                      <span className="relative z-10 px-3 py-1 text-xs font-mono font-bold rounded-full bg-black/60 text-amber-300 border border-amber-400/30">
                        {project.year}
                      </span>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                          {project.subtitle}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 font-mono"
                          style={{ color: AMBER }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-bold flex items-center gap-1.5 transition-colors"
                        style={{ color: TERRACOTTA }}
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        View Highlights &amp; Specs
                      </button>

                      <div className="flex items-center gap-2">
                        {project.frontendGithub && (
                          <a
                            href={project.frontendGithub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl glass-card text-gray-300 hover:text-amber-400 transition-colors"
                            title="Frontend Repo"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.backendGithub && (
                          <a
                            href={project.backendGithub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl glass-card text-gray-300 hover:text-amber-400 transition-colors"
                            title="Backend Repo"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.github && !project.frontendGithub && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl glass-card text-gray-300 hover:text-amber-400 transition-colors"
                            title="GitHub Repo"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />

      </div>
    </section>
  );
}
