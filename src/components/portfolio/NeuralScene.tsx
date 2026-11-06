"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

/** A small CPU-projected 3D network. No WebGL context or model downloads needed. */
export default function NeuralScene({
  paused,
  mode,
}: {
  paused: boolean;
  mode: number;
}) {
  const { theme } = useTheme();
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const pausedRef = useRef(paused);
  const modeRef = useRef(mode);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const context = element.getContext("2d");
    if (!context) return;
    const lineColor = theme === "light" ? "15, 23, 42" : "207, 154, 114";
    const selectedColor = theme === "light" ? "29, 78, 216" : "247, 220, 183";
    const glowColor = theme === "light" ? "29, 78, 216" : "170, 105, 61";
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reduced = motionPreference.matches;
    let frame = 0;
    let visible = true;
    let width = 500;
    let height = 500;
    let angle = 0.3;
    let lastTime = 0;
    let lastSignature = "";
    const nodes = Array.from({ length: 100 }, (_, index) => {
      const y = 1 - (index / 99) * 2;
      const radius = Math.sqrt(1 - y * y);
      const phi = Math.PI * (3 - Math.sqrt(5)) * index;
      return { x: Math.cos(phi) * radius, y, z: Math.sin(phi) * radius };
    });
    const edges: [number, number][] = [];
    nodes.forEach((a, i) =>
      nodes.forEach((b, j) => {
        if (j > i && Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < 0.47)
          edges.push([i, j]);
      }),
    );
    const resize = new ResizeObserver((entries) => {
      const box = entries[0].contentRect;
      width = box.width;
      height = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      element.width = width * dpr;
      element.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    resize.observe(element);
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { rootMargin: "80px" },
    );
    observer.observe(element);
    const project = (x: number, y: number, z: number) => {
      const cy = Math.cos(angle + pointer.current.x * 0.28);
      const sy = Math.sin(angle + pointer.current.x * 0.28);
      const tilt = -0.24 + pointer.current.y * 0.2;
      const rx = x * cy - z * sy;
      const rz = x * sy + z * cy;
      const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
      const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
      const perspective = 3.8 / (3.8 - depth);
      const scale = Math.min(width, height) * 0.28;
      return {
        x: width / 2 + rx * scale * perspective,
        y: height / 2 + ry * scale * perspective,
        z: depth,
        p: perspective,
      };
    };
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) {
        lastTime = time;
        return;
      }
      // Cap to 30fps. Pointer exploration remains available when animation is paused.
      if (time - lastTime < 32) return;
      if (!pausedRef.current && !reduced)
        angle += Math.min(time - lastTime, 80) * 0.00013;
      lastTime = time;
      const signature = `${width}:${height}:${angle}:${modeRef.current}:${pointer.current.x}:${pointer.current.y}`;
      if (signature === lastSignature) return;
      lastSignature = signature;
      context.clearRect(0, 0, width, height);
      const centerX = width / 2,
        centerY = height / 2;
      const glow = context.createRadialGradient(
        centerX,
        centerY,
        5,
        centerX,
        centerY,
        width * 0.46,
      );
      glow.addColorStop(0, `rgba(${glowColor}, 0.15)`);
      glow.addColorStop(1, `rgba(${glowColor}, 0)`);
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      for (let ring = 0; ring < 3; ring++) {
        context.beginPath();
        for (let step = 0; step <= 120; step++) {
          const t = (step / 120) * Math.PI * 2;
          const r = 1.24 + ring * 0.15;
          const rotation = ring * 0.74 + modeRef.current * 0.2;
          const p = project(
            Math.cos(t) * r,
            Math.sin(t) * Math.sin(rotation + 0.4) * r,
            Math.sin(t) * Math.cos(rotation + 0.4) * r,
          );
          if (step === 0) context.moveTo(p.x, p.y);
          else context.lineTo(p.x, p.y);
        }
        context.strokeStyle = `rgba(${lineColor},${0.18 - ring * 0.03})`;
        context.lineWidth = 0.7;
        context.stroke();
      }
      const points = nodes.map((node) => project(node.x, node.y, node.z));
      edges.forEach(([a, b]) => {
        const alpha = (points[a].z + points[b].z + 2) / 4;
        context.beginPath();
        context.moveTo(points[a].x, points[a].y);
        context.lineTo(points[b].x, points[b].y);
        context.strokeStyle = `rgba(${lineColor},${0.055 + alpha * 0.23})`;
        context.lineWidth = 0.6;
        context.stroke();
      });
      points.forEach((point, index) => {
        const selected = index % (modeRef.current + 7) === 0;
        context.beginPath();
        context.arc(
          point.x,
          point.y,
          selected ? 2.5 * point.p : 1.15 * point.p,
          0,
          Math.PI * 2,
        );
        context.fillStyle = `rgba(${selected ? selectedColor : lineColor},${0.3 + (point.z + 1) * 0.32})`;
        context.fill();
        if (selected && point.z > 0.1) {
          context.beginPath();
          context.arc(point.x, point.y, 6 * point.p, 0, Math.PI * 2);
          context.strokeStyle = `rgba(${lineColor},0.22)`;
          context.stroke();
        }
      });
    };
    frame = requestAnimationFrame(draw);
    const onPreference = (event: MediaQueryListEvent) => {
      reduced = event.matches;
    };
    motionPreference.addEventListener("change", onPreference);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      motionPreference.removeEventListener("change", onPreference);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvas}
      className="p-neural-canvas"
      aria-label="Interactive three-dimensional network of connected AI nodes"
      role="img"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    />
  );
}
