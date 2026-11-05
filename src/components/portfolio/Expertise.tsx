"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Pause, Play, Plus, Minus } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioProfile";
import SectionHeading from "./SectionHeading";

const NeuralScene = dynamic(() => import("./NeuralScene"), {
  ssr: false,
  loading: () => <div className="p-neural-fallback" />,
});
const disciplines = [
  {
    title: "Agentic AI & LLMs",
    note: "SYSTEMS THAT REASON",
    description:
      "Building multi-agent workflows that combine language models, specialised tools, and orchestration to work through complex problems.",
    tags: ["Claude API", "OpenAI Agent SDK", "LangChain", "Hugging Face"],
    nodes: ["REASON", "ORCHESTRATE", "ACT"],
  },
  {
    title: "Retrieval-augmented generation",
    note: "KNOWLEDGE INTO CONTEXT",
    description:
      "Connecting LLMs to useful knowledge through semantic search, hierarchical document retrieval, vector databases, and grounded, cited responses.",
    tags: ["LlamaIndex", "Pinecone", "FastAPI"],
    nodes: ["INDEX", "RETRIEVE", "GENERATE"],
  },
  {
    title: "Deep learning & computer vision",
    note: "FROM SIGNAL TO UNDERSTANDING",
    description:
      "Working with CNNs, Transformer encoders, and explainable AI, from genomic sequence analysis to real-time perception on embedded hardware.",
    tags: ["PyTorch", "TensorFlow", "OpenCV"],
    nodes: ["PERCEIVE", "LEARN", "EXPLAIN"],
  },
  {
    title: "Engineering & deployment",
    note: "BUILT TO REACH THE REAL WORLD",
    description:
      "Taking AI from a model to a complete application through asynchronous Python microservices, API gateways, payment and webhook integrations, containerised deployment, and CI/CD.",
    tags: ["Python", "React / Next.js", "AWS", "Docker"],
    nodes: ["BUILD", "DEPLOY", "ITERATE"],
  },
];

export default function Expertise() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  return (
    <section
      id="expertise"
      className="p-section p-expertise"
      aria-labelledby="expertise-heading"
    >
      <div className="p-wrap">
        <SectionHeading number="03" label="THE WAY I THINK">
          <span id="expertise-heading">
            CONNECTED THINKING.
            <br />
            <span className="p-outline">INTELLIGENT OUTCOMES.</span>
          </span>
        </SectionHeading>
        <div className="p-expertise-grid">
          <div className="p-neural-panel">
            <div className="p-neural-top p-micro">
              <span>
                <i className="p-status-dot" /> INTERACTIVE SYSTEM MAP
              </span>
              <button
                onClick={() => setPaused(!paused)}
                aria-label={
                  paused
                    ? "Resume network animation"
                    : "Pause network animation"
                }
                aria-pressed={paused}
              >
                {paused ? <Play size={13} /> : <Pause size={13} />}
                {paused ? "RESUME" : "PAUSE"}
              </button>
            </div>
            <NeuralScene paused={paused} mode={active} />
            <span className="p-neural-center p-micro">AI</span>
            {disciplines[active].nodes.map((node, index) => (
              <span
                className={`p-neural-label p-neural-label-${index} p-micro`}
                key={`${index}-${node}`}
              >
                <i />
                {node}
              </span>
            ))}
            <div className="p-neural-bottom p-micro">
              <span>MOVE TO EXPLORE</span>
              <span>HUMAN INTENT → SYSTEM INTELLIGENCE</span>
            </div>
          </div>
          <div className="p-disciplines">
            {disciplines.map((discipline, index) => (
              <div
                className={`p-discipline ${active === index ? "is-active" : ""}`}
                key={discipline.title}
              >
                <h3>
                  <button
                    aria-expanded={active === index}
                    aria-controls={`discipline-${index}`}
                    onClick={() => setActive(index)}
                  >
                    <span className="p-micro">0{index + 1}</span>
                    <span>{discipline.title}</span>
                    {active === index ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </button>
                </h3>
                <div id={`discipline-${index}`} hidden={active !== index}>
                  <p className="p-micro p-copper">{discipline.note}</p>
                  <p>{discipline.description}</p>
                  <div className="p-tags">
                    {discipline.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="skills" className="p-skills">
          <div className="p-skills-heading">
            <h3 className="p-micro">THE TOOLS BEHIND THE THINKING</h3>
            <ArrowUpRight size={18} />
          </div>
          <div className="p-skills-grid">
            {SKILL_CATEGORIES.map((category, index) => (
              <div className="p-skill-group" key={category.title}>
                <span className="p-micro p-copper">0{index + 1} /</span>
                <h4>{category.title}</h4>
                <ul>
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
