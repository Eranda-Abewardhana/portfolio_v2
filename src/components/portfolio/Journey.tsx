"use client";

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { EXPERIENCES, PROJECTS } from "@/data/portfolioProfile";
import SectionHeading from "./SectionHeading";
import { ProjectDialog } from "./Projects";

function DnaVisual() {
  const reference = Array.from({ length: 35 }, (_, index) => {
    const x = 20 + index * 15;
    const y = Number((Math.sin(index * 0.32) * 62).toFixed(2));
    return { x, y };
  });
  const strand = (direction: number) => reference
    .map(({ x, y }, index) => `${index ? "L" : "M"}${x} ${105 + y * direction}`)
    .join(" ");

  return (
    <svg
      className="p-dna-visual"
      viewBox="0 0 560 210"
      fill="none"
      role="img"
      aria-label="Diagram of reference and alternate DNA sequences"
    >
      <g>
        <path d={strand(1)} stroke="var(--copper)" strokeWidth="1.2" strokeOpacity=".7" />
        <path d={strand(-1)} stroke="var(--ivory)" strokeWidth="1.2" strokeOpacity=".4" />
        {reference.map(({ x, y }, index) => {
          return (
            <g key={index}>
              <line
                x1={x}
                y1={105 + y}
                x2={x}
                y2={105 - y}
                stroke="var(--copper)"
                strokeOpacity=".2"
              />
              <circle cx={x} cy={105 + y} r="2.5" fill="var(--copper)" />
              <circle cx={x} cy={105 - y} r="2" fill="var(--ivory)" opacity=".6" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default function Journey() {
  const [researchOpen, setResearchOpen] = useState(false);
  const research = PROJECTS.find(
    (project) => project.id === "genomic-pathogenicity",
  )!;
  return (
    <>
      <section
        id="experience"
        className="p-section p-wrap p-experience"
        aria-labelledby="experience-heading"
      >
        <SectionHeading
          number="04"
          label="THE JOURNEY SO FAR"
          aside={
            <p>
              Different challenges.
              <br />
              The same drive to build something useful.
            </p>
          }
        >
          <span id="experience-heading">
            EXPERIENCE,
            <br />
            <span className="p-outline">IN PRACTICE.</span>
          </span>
        </SectionHeading>
        <div className="p-experience-list">
          {EXPERIENCES.map((experience, index) => (
            <details
              className="p-experience-item"
              key={experience.company}
              open={index === 0}
            >
              <summary>
                <span className="p-experience-period p-micro">
                  {experience.period}
                </span>
                <span className="p-experience-title">
                  <strong>{experience.role}</strong>
                  <span>
                    {experience.company}{" "}
                    <span className="p-experience-location">
                      / {experience.location}
                    </span>
                  </span>
                </span>
                <Plus
                  className="p-experience-toggle"
                  size={25}
                  strokeWidth={1}
                />
              </summary>
              <div className="p-experience-details">
                <ul>
                  {experience.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="p-tags">
                  {experience.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
      <section
        id="research"
        className="p-research-band p-section"
        aria-labelledby="research-heading"
      >
        <div className="p-wrap">
          <div className="p-section-label">
            <span>05 /</span> RESEARCH &amp; EXPLORATION
          </div>
          <div className="p-research-grid">
            <div className="p-research-intro">
              <h2 id="research-heading" className="p-display">
                SMALL VARIANTS.
                <br />
                <span className="p-outline">BIG QUESTIONS.</span>
              </h2>
              <p className="p-research-lead">
                Can we better understand the impact
                <br />
                of a single change in DNA?
              </p>
              <DnaVisual />
              <div className="p-research-sequence p-micro">
                <span>REF / ALT SEQUENCES</span>
                <span>1,024 BASE PAIRS</span>
              </div>
            </div>
            <div className="p-research-copy">
              <span className="p-micro p-copper">
                GENOMIC AI / FINAL-YEAR RESEARCH / 2026
              </span>
              <h3>
                Genomic variant
                <br />
                pathogenicity prediction
              </h3>
              <p>{research.description}</p>
              <div className="p-research-method">
                <div>
                  <span className="p-micro">01 / ARCHITECTURE</span>
                  <p>Multi-scale CNNs + Transformer encoders</p>
                </div>
                <div>
                  <span className="p-micro">02 / EXPLAINABILITY</span>
                  <p>Integrated Gradients &amp; in-silico mutagenesis</p>
                </div>
                <div>
                  <span className="p-micro">03 / EVALUATION</span>
                  <p>ROC-AUC · AUPRC · MCC · Balanced accuracy</p>
                </div>
                <div>
                  <span className="p-micro">04 / DATASET</span>
                  <p>Gene-balanced ClinVar data</p>
                </div>
              </div>
              <button
                className="p-text-link"
                onClick={() => setResearchOpen(true)}
              >
                Explore the research <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>
      {researchOpen && (
        <ProjectDialog
          project={research}
          onClose={() => setResearchOpen(false)}
        />
      )}
    </>
  );
}
