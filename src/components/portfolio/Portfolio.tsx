"use client";

import { motion, MotionConfig, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import Navigation from "./Navigation";
import Hero from "./Hero";
import ScrollStory from "./ScrollStory";
import Projects from "./Projects";
import About from "./About";
import Expertise from "./Expertise";
import Journey from "./Journey";
import Contact from "./Contact";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const root = useRef<HTMLDivElement>(null);
  const [marqueePaused, setMarqueePaused] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("p-entered");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    root.current
      ?.querySelectorAll(
        ".p-section-heading, .p-project, .p-about-copy, .p-about-photo, .p-research-intro, .p-research-copy, .p-contact-heading-link",
      )
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <div ref={root} className="portfolio">
        <a className="p-skip-link" href="#main-content">
          Skip to content
        </a>
        <motion.div
          className="p-scroll-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        <Navigation />
        <main id="main-content">
          <Hero />
          <div className="p-marquee">
            <div
              aria-hidden="true"
              style={{
                animationPlayState: marqueePaused ? "paused" : "running",
              }}
            >
              {[0, 1].map((copy) => (
                <span key={copy}>
                  ARTIFICIAL INTELLIGENCE <i>✳</i> REAL-WORLD IMPACT <i>✳</i>{" "}
                  THOUGHTFUL ENGINEERING <i>✳</i>{" "}
                </span>
              ))}
            </div>
            <button
              className="p-marquee-pause"
              onClick={() => setMarqueePaused(!marqueePaused)}
              aria-label={
                marqueePaused ? "Resume moving text" : "Pause moving text"
              }
              aria-pressed={marqueePaused}
            >
              {marqueePaused ? <Play size={12} /> : <Pause size={12} />}
            </button>
          </div>
          <ScrollStory />
          <Projects />
          <About />
          <Expertise />
          <Journey />
        </main>
        <Contact />
      </div>
    </MotionConfig>
  );
}
