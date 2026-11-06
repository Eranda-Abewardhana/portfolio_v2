"use client";

import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

/** GSAP owns entrance wrappers; Framer Motion owns the media inside them. */
export function usePortfolioAnimations(root: RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const container = root.current;
    if (!container) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", (context) => {
      const select = gsap.utils.selector(container);
      const distance = window.matchMedia("(max-width: 760px)").matches ? 22 : 36;
      const reveals: { element: HTMLElement; animation: gsap.core.Animation }[] = [];
      const clearProps = "transform,opacity,clipPath";
      const strokeProps = "strokeDasharray,strokeDashoffset";
      const fontsReady = document.fonts.status === "loaded";
      let disposed = false;

      const hero = container.querySelector<HTMLElement>(".p-hero");
      if (hero && document.documentElement.dataset.portfolioIntro === "pending"
        && window.scrollY < window.innerHeight * 0.6) {
        gsap.set(hero, { visibility: "visible" });
        const title = fontsReady ? SplitText.create(select(".p-hero-title-word"), {
          type: "chars", tag: "span", charsClass: "p-text-char", aria: "auto",
        }) : null;
        const name = fontsReady ? SplitText.create(select(".p-hero-name"), {
          type: "words", tag: "span", wordsClass: "p-text-word", aria: "auto",
        }) : null;
        const intro = gsap.timeline({
          id: "portfolio-intro",
          defaults: { ease: "power3.out", clearProps },
          onComplete: () => {
            document.documentElement.removeAttribute("data-portfolio-intro");
            hero.style.removeProperty("visibility");
          },
        });
        intro
          .from(select(".p-hero-topline, .p-hero-eyebrow"), {
            opacity: 0, y: 14, duration: 0.7, stagger: 0.1,
          }, 0.1)
          .from(title?.chars || select(".p-hero-title-word"), {
            yPercent: 115, opacity: 0, duration: 0.85,
            stagger: title ? 0.025 : 0.14, ease: "power4.out",
          }, 0.2)
          .from(select(".p-hero-intro, .p-hero-actions, .p-hero-socials"), {
            opacity: 0, y: 20, duration: 0.75, stagger: 0.1,
          }, 0.45)
          .from(select(".p-hero-visual"), {
            opacity: 0, y: 24, scale: 0.97, duration: 1.1,
          }, 0.15)
          .from(select(".p-hero-bottom > *"), {
            opacity: 0, y: 14, duration: 0.65, stagger: 0.075,
          }, 0.65)
          .from(select("[data-orbit-stroke]"), {
            drawSVG: "0%", duration: 1.2, stagger: 0.06,
            ease: "power2.inOut", clearProps: strokeProps,
          }, 0.25)
          .from(select("[data-orbit-node]"), {
            opacity: 0, scale: 0, transformOrigin: "50% 50%",
            duration: 0.4, stagger: 0.06,
          }, 1);
        if (name) {
          intro.from(name.words, {
            opacity: 0, y: 12, duration: 0.55, stagger: 0.05,
          }, 0.55);
        }

        reveals.push({ element: hero, animation: intro });
      } else {
        document.documentElement.removeAttribute("data-portfolio-intro");
      }

      // Above-page content stays visible when returning to a saved scroll position.
      function canReveal(element: Element) {
        const bounds = element.getBoundingClientRect();
        return bounds.bottom > 0 && !(window.scrollY > window.innerHeight * 0.6
          && bounds.top < window.innerHeight);
      }

      // Word wrappers reflow naturally on resize; do not split fixed text lines.
      // SplitText registers itself with this GSAP context and restores the DOM on revert.
      const createTextReveals = context.add("createTextReveals", () => {
        const headings = select([
          ".p-section-heading h2", ".p-about-copy h2", ".p-about-lead",
          ".p-research-intro h2", ".p-contact-heading-link h2",
        ].join(", ")) as HTMLElement[];
        for (const heading of headings) {
          if (!canReveal(heading)) continue;
          const label = heading.innerText.replace(/\s+/g, " ").trim();
          const text = SplitText.create(heading, {
            type: "words", tag: "span", wordsClass: "p-text-word", aria: "auto",
          });
          // Keep spaces at explicit line breaks in heading and section names.
          heading.setAttribute("aria-label", label);
          heading.querySelectorAll("[id]").forEach((element) => {
            element.setAttribute("aria-label", label);
          });
          const animation = gsap.from(text.words, {
            opacity: 0, yPercent: 65, duration: 0.75, stagger: 0.045,
            ease: "power3.out", clearProps,
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          });
          reveals.push({ element: heading.closest("a") || heading, animation });
        }
      });
      if (fontsReady) createTextReveals();

      for (const element of select(
        ".p-heading-arrow, .p-doccraft-service-grid, .p-dna-visual, .p-contact-arrow",
      ) as Element[]) {
        if (!canReveal(element)) continue;
        const shapes = element.querySelectorAll("path, line, polyline, polygon, rect, circle, ellipse");
        const animation = gsap.timeline({
          scrollTrigger: { trigger: element, start: "top 84%", once: true },
        });
        animation.from(shapes, {
          drawSVG: "0%", duration: 1.15, stagger: 0.015,
          ease: "power2.inOut", clearProps: strokeProps,
        });
        if (element.matches(".p-dna-visual")) {
          animation.from(element.querySelectorAll("circle"), {
            opacity: 0, duration: 0.4, stagger: 0.008, clearProps: "opacity",
          }, 0.2);
        }
        const owner = element.closest<HTMLElement>("a, button") || element.parentElement;
        if (owner) reveals.push({ element: owner, animation });
      }

      const revealTargets = select([
        ".p-section-heading", ".p-about-photo", ".p-about-copy",
        ".p-recognition", ".p-research-intro", ".p-research-copy",
        ".p-neural-panel", ".p-contact-top", ".p-contact-heading-link",
        ".p-contact-bottom", ".p-footer",
      ].join(", ")) as HTMLElement[];

      for (const element of revealTargets) {
        if (!canReveal(element)) continue;
        const animation = gsap.from(element, {
          opacity: 0,
          y: distance,
          duration: 0.85,
          ease: "power3.out",
          clearProps,
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
        reveals.push({ element, animation });
      }

      for (const project of select(".p-project") as HTMLElement[]) {
        if (!canReveal(project)) continue;
        const animation = gsap.timeline({
          defaults: { ease: "power3.out", clearProps },
          scrollTrigger: { trigger: project, start: "top 88%", once: true },
        });
        animation
          .from(project.querySelector(".p-project-cover"), {
            opacity: 0, y: distance, clipPath: "inset(5% 0% 5% 0%)", duration: 1,
          })
          .from(project.querySelectorAll(".p-project-meta > *, .p-project-tech > span"), {
            opacity: 0, y: 16, duration: 0.6, stagger: 0.055,
          }, 0.18);
        reveals.push({ element: project, animation });
      }

      const groups = [
        [".p-skills-grid", ".p-skill-group"],
        [".p-disciplines", ".p-discipline"],
        [".p-education", ".p-education-row"],
        [".p-profile-notes", ":scope > div"],
        [".p-experience-list", ".p-experience-item"],
      ];
      for (const [groupSelector, itemSelector] of groups) {
        const element = container.querySelector<HTMLElement>(groupSelector);
        if (!element || !canReveal(element)) continue;
        const animation = gsap.from(element.querySelectorAll(itemSelector), {
          opacity: 0, y: 20, duration: 0.7, stagger: 0.09,
          ease: "power3.out", clearProps,
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
        reveals.push({ element, animation });
      }

      // Keyboard navigation reveals a focused link immediately, even mid-animation.
      const onFocus = (event: FocusEvent) => {
        if (!(event.target instanceof Node)) return;
        for (const { element, animation } of reveals) {
          if (element.contains(event.target)) animation.progress(1);
        }
      };
      container.addEventListener("focusin", onFocus);

      // Recalculate after fonts load or an experience/award disclosure changes height.
      let refreshFrame = 0;
      let previousHeight = 0;
      const observer = new ResizeObserver(([entry]) => {
        if (Math.abs(entry.contentRect.height - previousHeight) < 1) return;
        previousHeight = entry.contentRect.height;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      observer.observe(container);
      void document.fonts.ready.then(() => {
        if (!disposed) {
          if (!fontsReady) createTextReveals();
          ScrollTrigger.refresh();
        }
      });

      return () => {
        disposed = true;
        observer.disconnect();
        cancelAnimationFrame(refreshFrame);
        container.removeEventListener("focusin", onFocus);
      };
    }, container);

    media.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 900px)",
      () => {
        const cleanups: (() => void)[] = [];
        const buttons = container.querySelectorAll<HTMLElement>(
          ".p-hero-actions > a, .p-nav-contact",
        );
        for (const button of buttons) {
          // quickTo creates reusable, context-owned tweens instead of new ones per move.
          const xTo = gsap.quickTo(button, "x", { duration: 0.35, ease: "power3.out" });
          const yTo = gsap.quickTo(button, "y", { duration: 0.35, ease: "power3.out" });
          const onMove = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            const bounds = button.getBoundingClientRect();
            xTo(gsap.utils.clamp(-7, 7, (event.clientX - bounds.left - bounds.width / 2) * 0.12));
            yTo(gsap.utils.clamp(-5, 5, (event.clientY - bounds.top - bounds.height / 2) * 0.18));
          };
          const reset = () => { xTo(0); yTo(0); };
          button.addEventListener("pointermove", onMove);
          button.addEventListener("pointerleave", reset);
          button.addEventListener("focus", reset);
          cleanups.push(() => {
            button.removeEventListener("pointermove", onMove);
            button.removeEventListener("pointerleave", reset);
            button.removeEventListener("focus", reset);
          });
        }
        return () => cleanups.forEach((cleanup) => cleanup());
      },
      container,
    );

    return () => media.revert();
  }, { scope: root });
}
