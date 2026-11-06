"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioProfile";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced ? 0 : 110],
  );
  const wordY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -65]);
  const portraitScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [1, 1.16, 1.32],
  );

  return (
    <section
      ref={ref}
      id="home"
      className="p-hero"
      aria-labelledby="hero-heading"
    >
      <div className="p-hero-topline p-wrap">
        <span className="p-micro">INDEPENDENT MIND. ENGINEERED IMPACT.</span>
        <span className="p-micro p-hero-location">
          BASED IN SRI LANKA <span className="p-cross">✳</span> BUILDING BEYOND
          BORDERS
        </span>
      </div>
      <div className="p-wrap p-hero-grid">
        <div className="p-hero-copy">
          <div className="p-hero-eyebrow">
            <span className="p-status-dot" />
            <span>AI / BACKEND / PLATFORM ENGINEERING</span>
          </div>
          <p className="p-display p-hero-heading">
            <span className="p-hero-title-line">
              <span className="p-hero-title-word">BUILDING</span>
            </span>
            <span className="p-hero-title-line">
              <span className="p-hero-title-word p-outline">
                INTELLIGENCE<span className="p-copper">.</span>
              </span>
            </span>
          </p>
          <div className="p-hero-intro">
            <span className="p-hero-line" />
            <div>
              <h1 id="hero-heading" className="p-hero-name">
                I’m {PERSONAL_INFO.name}.
              </h1>
              <p>
                I turn complex ideas into thoughtful AI systems
                <br className="p-desktop-break" /> and software that works in
                the real world.
              </p>
            </div>
          </div>
          <div className="p-hero-actions">
            <a href="#work" className="p-button p-button-light">
              Explore my work <ArrowDownRight size={20} />
            </a>
            <a
              href={PERSONAL_INFO.cvUrl}
              download
              className="p-text-link"
              aria-label="Download CV (PDF)"
            >
              Download CV <Download size={17} />
            </a>
          </div>
          <div className="p-hero-socials">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eranda on GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eranda on LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <span className="p-social-rule" />
            <span className="p-micro">
              CURIOUS BY NATURE. BUILDER BY CHOICE.
            </span>
          </div>
        </div>
        <div className="p-hero-visual">
          <div className="p-portrait-halo" />
          <div className="p-portrait-orbit p-orbit-one" />
          <div className="p-portrait-orbit p-orbit-two" />
          <motion.span
            style={{ y: wordY }}
            className="p-portrait-word"
            aria-hidden="true"
          >
            ERANDA
          </motion.span>
          <motion.div
            style={{ y: portraitY, scale: reduced ? 1 : portraitScale }}
            className="p-portrait"
          >
            <Image
              src="/images/optimized/eranda-hero.webp"
              alt="Eranda Sathsara Abewardhana in a dark suit, photographed outdoors"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1000px) 55vw, 46vw"
              quality={90}
            />
          </motion.div>
          <span className="p-portrait-coordinate p-micro">
            PANADURA / SRI LANKA
          </span>
          <div className="p-portrait-caption">
            <span className="p-small-cross">+</span>
            <span>
              HUMAN AT THE CORE.
              <br />
              <span className="p-muted">INTELLIGENCE IN THE MAKING.</span>
            </span>
          </div>
          <a
            className="p-hero-scroll"
            href="#story"
            aria-label="Scroll to the cinematic introduction"
          >
            <ArrowDown size={21} />
          </a>
        </div>
      </div>
      <div className="p-wrap p-hero-bottom">
        <div className="p-hero-stat">
          <strong>
            2<span>+</span>
          </strong>
          <span>
            YEARS OF
            <br />
            INDUSTRY EXPERIENCE
          </span>
        </div>
        <div className="p-hero-stat">
          <strong>
            AI<span>×</span>SE
          </strong>
          <span>
            INTELLIGENT SYSTEMS.
            <br />
            SOLID ENGINEERING.
          </span>
        </div>
        <div className="p-hero-bottom-note">
          <span className="p-status-dot" />
          <span>
            OPEN TO AI &amp; SOFTWARE
            <br />
            ENGINEERING OPPORTUNITIES
          </span>
        </div>
        <span className="p-micro p-hero-edition">
          PORTFOLIO — VOL. 02 / 2026
        </span>
      </div>
    </section>
  );
}
