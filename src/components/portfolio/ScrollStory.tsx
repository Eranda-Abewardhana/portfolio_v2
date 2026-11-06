"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

/** Native scrolling acts as a reversible camera timeline; no wheel interception. */
export default function ScrollStory() {
  const { theme } = useTheme();
  const track = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: progress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const subjectScale = useTransform(
    progress,
    [0, 0.22, 0.52, 0.76, 1],
    [0.92, 1.1, 2.15, 1.65, 0.95],
  );
  const subjectX = useTransform(
    progress,
    [0, 0.25, 0.52, 0.78, 1],
    ["13vw", "10vw", "-14vw", "-12vw", "0vw"],
  );
  const subjectY = useTransform(progress, [0, 0.5, 1], ["2%", "12%", "0%"]);
  const subjectRotate = useTransform(progress, [0, 0.5, 1], [-3, 2, 0]);
  const background = useTransform(
    progress,
    [0, 0.5, 1],
    theme === "dark"
      ? ["#17120f", "#101b19", "#11100e"]
      : ["#f4f7fc", "#e8efff", "#ffffff"],
  );
  const warmLight = useTransform(
    progress,
    [0, 0.45, 0.8, 1],
    [0.8, 0.25, 0, 0.2],
  );
  const coolLight = useTransform(
    progress,
    [0, 0.3, 0.55, 1],
    [0, 0, 0.65, 0.15],
  );
  const firstOpacity = useTransform(progress, [0, 0.15, 0.32], [1, 1, 0]);
  const firstY = useTransform(progress, [0, 0.32], [0, -70]);
  const secondOpacity = useTransform(
    progress,
    [0.28, 0.42, 0.62, 0.77],
    [0, 1, 1, 0],
  );
  const secondY = useTransform(progress, [0.28, 0.48, 0.77], [65, 0, -45]);
  const thirdOpacity = useTransform(progress, [0.72, 0.88, 1], [0, 1, 1]);
  const thirdY = useTransform(progress, [0.72, 1], [50, 0]);
  const ghostScale = useTransform(progress, [0, 0.52, 1], [0.88, 1.25, 0.95]);
  const ghostOpacity = useTransform(progress, [0, 0.5, 1], [0.6, 0.2, 0.55]);
  const phaseOne = useTransform(progress, [0, 0.3, 0.42], [1, 1, 0.25]);
  const phaseTwo = useTransform(
    progress,
    [0.22, 0.42, 0.68, 0.83],
    [0.25, 1, 1, 0.25],
  );
  const phaseThree = useTransform(progress, [0.68, 0.88, 1], [0.25, 1, 1]);

  return (
    <section
      ref={track}
      id="story"
      className="p-scroll-story"
      aria-labelledby="story-heading"
    >
      <h2 id="story-heading" className="sr-only">
        Human ideas. Intelligent systems. Real-world impact.
      </h2>
      <motion.div
        className="p-story-stage"
        style={reduced ? undefined : { backgroundColor: background }}
      >
        <div className="p-story-topline p-micro">
          <span>AN ENGINEER’S PERSPECTIVE / SCROLL TO EXPLORE</span>
          <a href="#work">
            Skip to work <ArrowUpRight size={13} />
          </a>
        </div>

        <motion.div
          className="p-story-light p-story-light-warm"
          style={{ opacity: reduced ? 0.5 : warmLight }}
        />
        <motion.div
          className="p-story-light p-story-light-cool"
          style={{ opacity: reduced ? 0 : coolLight }}
        />
        <motion.span
          className="p-story-ghost"
          aria-hidden="true"
          style={
            reduced ? undefined : { scale: ghostScale, opacity: ghostOpacity }
          }
        >
          ERANDA
        </motion.span>

        <motion.div
          className="p-story-subject"
          style={
            reduced
              ? { scale: 1, x: "12vw" }
              : {
                  scale: subjectScale,
                  x: subjectX,
                  y: subjectY,
                  rotate: subjectRotate,
                }
          }
        >
          <Image
            src="/images/optimized/eranda-cinematic.webp"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 80vw"
            quality={90}
          />
        </motion.div>
        <div className="p-story-vignette" />

        <motion.div
          className="p-story-copy p-story-copy-one"
          aria-hidden="true"
          style={reduced ? undefined : { opacity: firstOpacity, y: firstY }}
        >
          <p className="p-micro">01 / THE PERSON BEHIND THE SYSTEMS</p>
          <p className="p-display">
            HUMAN
            <br />
            <span className="p-outline">AT THE CORE.</span>
          </p>
          <span>
            Curiosity starts the process.
            <br />
            Engineering makes it real.
          </span>
        </motion.div>
        <motion.div
          className="p-story-copy p-story-copy-two"
          aria-hidden="true"
          style={
            reduced
              ? { display: "none" }
              : { opacity: secondOpacity, y: secondY }
          }
        >
          <p className="p-micro">02 / THE ENGINEERING MINDSET</p>
          <p className="p-display">
            COMPLEXITY.
            <br />
            <span className="p-outline">MADE USEFUL.</span>
          </p>
          <span>
            From models that learn
            <br />
            to systems that do.
          </span>
        </motion.div>
        <motion.div
          className="p-story-copy p-story-copy-three"
          aria-hidden="true"
          style={
            reduced ? { display: "none" } : { opacity: thirdOpacity, y: thirdY }
          }
        >
          <p className="p-micro">03 / FROM THINKING TO MAKING</p>
          <p className="p-display">
            BUILT FOR
            <br />
            <span className="p-outline">THE REAL WORLD.</span>
          </p>
        </motion.div>

        <div className="p-story-depth" aria-hidden="true">
          <span className="p-micro">PERSPECTIVE</span>
          <div className="p-story-depth-track">
            <motion.i style={{ scaleY: reduced ? 0 : progress }} />
          </div>
          <div className="p-story-chapters p-micro">
            <motion.span style={{ opacity: reduced ? 1 : phaseOne }}>
              01 HUMAN
            </motion.span>
            <motion.span style={{ opacity: reduced ? 0.25 : phaseTwo }}>
              02 SYSTEMS
            </motion.span>
            <motion.span style={{ opacity: reduced ? 0.25 : phaseThree }}>
              03 IMPACT
            </motion.span>
          </div>
        </div>
        <div className="p-story-bottom p-micro">
          <span>SCROLL DOWN TO ZOOM IN. SCROLL BACK TO REWIND.</span>
          <ArrowDown size={17} />
          <span>HUMAN INTENT → ENGINEERED IMPACT</span>
        </div>
      </motion.div>
    </section>
  );
}
