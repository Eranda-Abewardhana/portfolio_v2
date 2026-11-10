"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Figma, Github, Play, X } from "lucide-react";
import { PROJECTS, PERSONAL_INFO, type Project } from "@/data/portfolioProfile";
import SectionHeading from "./SectionHeading";
import ScrollZoom from "./ScrollZoom";
import DocCraftVisual from "./DocCraftVisual";

const projectPresentation: Record<
  string,
  { name: string; label: string; line: string; cover?: string }
> = {
  doccraft: {
    name: "DocCraft",
    label: "AI PRODUCT / BACKEND & PLATFORM ENGINEERING",
    line: "AI-assisted documents, built on a service-driven platform.",
  },
  "yukti-ai": {
    name: "Yukti",
    label: "GENERATIVE AI / LEGAL TECH",
    line: "Making legal knowledge accessible through AI.",
    cover: "/images/optimized/yukti-demo.webp",
  },
  "youfira-robotics": {
    name: "YouFIRA",
    label: "COMPUTER VISION / ROBOTICS",
    line: "Intelligence that moves beyond the screen.",
    cover: "/images/optimized/youfira.webp",
  },
  sentiview: {
    name: "SentiView",
    label: "NLP / iCMS / MENTORED BY CODEGEN",
    line: "Call analytics for a connected customer satisfaction platform.",
  },
};

function AudioVisual() {
  return (
    <div
      className="p-audio-visual"
      aria-label="Diagram of the SentiView audio transcription and sentiment analysis pipeline"
      role="img"
    >
      <div className="p-audio-top p-micro">
        <span>SENTIVIEW / SIGNAL TO INSIGHT</span>
        <span>↗ NLP</span>
      </div>
      <div className="p-waveform" aria-hidden="true">
        {Array.from({ length: 67 }, (_, i) => (
          <i
            key={i}
            style={{
              height: `${(12 + Math.abs(Math.sin(i * 0.61) * Math.cos(i * 0.19)) * 118).toFixed(2)}px`,
              opacity: (0.3 + Math.abs(Math.sin(i * 0.31)) * 0.7).toFixed(3),
            }}
          />
        ))}
      </div>
      <div className="p-audio-title">
        EVERY VOICE.
        <br />
        <span>AN INSIGHT.</span>
      </div>
      <div className="p-audio-bottom p-micro">
        <span>01 AUDIO</span>
        <span>02 TRANSCRIPTION</span>
        <span>03 SENTIMENT</span>
      </div>
    </div>
  );
}

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const presentation = projectPresentation[project.id];

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  const repositories = [
    project.frontendGithub && {
      label: "Frontend source",
      href: project.frontendGithub,
    },
    project.backendGithub && {
      label: "Backend source",
      href: project.backendGithub,
    },
    project.github && {
      label: "Project source",
      href: project.github,
    },
  ].filter((item): item is { label: string; href: string } => Boolean(item));

  return (
    <dialog
      ref={dialog}
      className="p-project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article className="p-dialog-content">
        <div className="p-dialog-top">
          <span className="p-micro">PROJECT NOTES / {project.year}</span>
          <button
            className="p-icon-button"
            onClick={onClose}
            aria-label="Close project details"
            autoFocus
          >
            <X size={22} />
          </button>
        </div>
        <span className="p-section-label">{project.category}</span>
        <h2 id="project-dialog-title" className="p-display">
          {presentation?.name || "Genomic AI"}
        </h2>
        <p className="p-dialog-subtitle">{project.subtitle}</p>
        {project.screenshots && (
          <section className="p-dialog-section" aria-label="Interface designs">
            <h3>INTERFACE DESIGNS</h3>
            <div className="p-dialog-screenshots">
              {project.screenshots.map((screenshot) => (
                <figure key={screenshot.src}>
                  <a
                    href={screenshot.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${screenshot.caption.toLowerCase()} at full size (opens in a new tab)`}
                  >
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={screenshot.width}
                      height={screenshot.height}
                      quality={90}
                      sizes="(max-width: 640px) 90vw, 800px"
                    />
                  </a>
                  <figcaption>{screenshot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        {project.id === "doccraft" && (
          <div className="p-dialog-architecture">
            <DocCraftVisual />
          </div>
        )}
        {project.videoSrc && (
          <div className="p-dialog-media">
            <video
              controls
              playsInline
              preload="metadata"
              poster={presentation?.cover}
              aria-label={`${presentation?.name || project.title} project demonstration`}
            >
              <source src={project.videoSrc} type="video/mp4" />
              <a href={project.videoSrc}>Download the project demonstration</a>
            </video>
          </div>
        )}
        <div className="p-dialog-section">
          <h3>THE IDEA</h3>
          <p>{project.description}</p>
        </div>
        <div className="p-dialog-section">
          <h3>INSIDE THE BUILD</h3>
          <ul>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {project.specification && (
          <div className="p-dialog-section">
            <h3>PROJECT SCOPE</h3>
            <p>{project.specification.context}</p>
            <ul>
              {project.specification.requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </div>
        )}
        {project.galleryImages && (
          <div className="p-dialog-gallery">
            {project.galleryImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                width={640}
                height={426}
                alt={
                  index === 0
                    ? "YouFIRA autonomous robotic vehicle at EXMO 2023"
                    : "The YouFIRA team at EXMO 2023"
                }
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            ))}
          </div>
        )}
        <div className="p-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {(repositories.length > 0 || project.figmaUrl) && (
          <div className="p-dialog-links">
            {project.figmaUrl && (
              <a
                className="p-button p-button-outline"
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Figma size={16} />
                Figma designs
                <ArrowUpRight size={16} />
              </a>
            )}
            {repositories.map((repo) => (
              <a
                className="p-button p-button-outline"
                href={repo.href}
                key={repo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
                {repo.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
      </article>
    </dialog>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = [
    "yukti-ai",
    "doccraft",
    "youfira-robotics",
    "sentiview",
  ].map((id) => PROJECTS.find((project) => project.id === id)!);

  return (
    <section
      id="work"
      className="p-section p-work p-wrap"
      aria-labelledby="work-heading"
    >
      <SectionHeading
        number="01"
        label="SELECTED WORK"
        aside={
          <p>
            A few things I’ve built.
            <br />
            From intelligent software to autonomous machines.
          </p>
        }
      >
        <span id="work-heading">
          IDEAS INTO
          <br />
          <span className="p-outline">REALITY.</span>
        </span>
      </SectionHeading>
      <div className="p-project-grid">
        {featured.map((project, index) => {
          const details = projectPresentation[project.id];
          const cover = details.cover ?? project.image;
          const visual = cover ? (
            <Image
              src={cover}
              alt={
                project.imageAlt ??
                (project.id === "yukti-ai"
                  ? "Yukti legal AI application, captured from the original project demonstration"
                  : "The YouFIRA robotic vehicle with its custom robotic arm")
              }
              fill
              sizes={
                index === 0
                  ? "(max-width: 760px) 100vw, 90vw"
                  : "(max-width: 760px) 100vw, 45vw"
              }
              quality={88}
            />
          ) : project.id === "doccraft" ? (
            <DocCraftVisual />
          ) : (
            <AudioVisual />
          );
          return (
            <article
              className={`p-project p-project-${index + 1} p-project-${project.id}`}
              key={project.id}
            >
              <button
                className="p-project-cover"
                onClick={() => setSelected(project)}
                aria-label={`Explore ${details.name} project`}
              >
                {project.id === "sentiview" ? (
                  visual
                ) : (
                  <ScrollZoom amount={index === 0 ? 0.1 : 0.16}>
                    {visual}
                  </ScrollZoom>
                )}
                <div className="p-project-cover-shade" />
                <span className="p-project-index p-micro">
                  0{index + 1} / {project.year}
                </span>
                {project.videoSrc && (
                  <span className="p-project-video-label p-micro">
                    <Play size={11} fill="currentColor" /> PROJECT FILM
                  </span>
                )}
                <span className="p-project-open">
                  <ArrowUpRight size={26} strokeWidth={1.3} />
                </span>
                {index === 0 && (
                  <div className="p-project-feature-label">
                    <span className="p-micro">LAW, MEET INTELLIGENCE.</span>
                    <span className="p-display">
                      YUKTI<span>01</span>
                    </span>
                  </div>
                )}
              </button>
              <div className="p-project-meta">
                <div>
                  <p className="p-micro p-copper">{details.label}</p>
                  <h3>
                    <button onClick={() => setSelected(project)}>
                      {details.name}
                      <ArrowUpRight size={23} />
                    </button>
                  </h3>
                  <p>{details.line}</p>
                </div>
                <span className="p-project-year p-micro">{project.year}</span>
              </div>
              <div className="p-project-tech p-micro">
                {project.tags
                  .filter(
                    (tag) => !["EXMO 2023", "Multi-Agent AI"].includes(tag),
                  )
                  .slice(0, 4)
                  .map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
              </div>
            </article>
          );
        })}
      </div>
      <div className="p-work-footer">
        <p className="p-muted">Built with curiosity. Backed by code.</p>
        <a
          href={PERSONAL_INFO.github}
          className="p-text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub <ArrowUpRight size={17} />
        </a>
      </div>
      {selected && (
        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
