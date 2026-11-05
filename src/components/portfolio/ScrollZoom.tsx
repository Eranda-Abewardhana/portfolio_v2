"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/** Keep the interactive frame fixed while its media follows the scroll position. */
export default function ScrollZoom({
  children,
  amount = 0.13,
}: {
  children: ReactNode;
  amount?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1 + amount, 1, 1 + amount],
  );
  const y = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <div ref={frame} className="p-scroll-zoom-frame">
      <motion.div
        className="p-scroll-zoom-media"
        style={reduced ? { scale: 1, y: 0 } : { scale, y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
