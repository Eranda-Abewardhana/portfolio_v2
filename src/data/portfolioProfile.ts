import {
  PERSONAL_INFO as originalPersonalInfo,
  PROJECTS as originalProjects,
  EXPERIENCES as originalExperiences,
  ACHIEVEMENTS as originalAchievements,
  type Project,
} from "./portfolioData";

export { EDUCATION } from "./portfolioData";
export type { Project } from "./portfolioData";

// CV-verified additions for the redesign. The original /legacy data stays intact.
// Source: Eranda_Abewardhana_AI_CV.pdf, supplied by the owner on 2026-11-05.
export const PERSONAL_INFO = {
  ...originalPersonalInfo,
  cvUrl: "/cv/Eranda_Abewardhana_AI_CV.pdf",
  phone: "+94 764 874 820",
  whatsapp: "https://wa.me/94764874820",
  summary:
    "AI and software engineer with 2+ years of industry experience across mobile applications and production AI backends. Focused on backend and platform engineering, RAG, multi-agent systems, and cloud-native delivery, with hands-on technical leadership of DocCraft, an AI-powered business document platform.",
};

const doccraft: Project = {
  id: "doccraft",
  title: "DocCraft – AI-Powered Business Document Builder",
  subtitle:
    "FastAPI Microservices, AI-Assisted Documents & Payment Integrations",
  year: "2025 – Present",
  category: "Full-Stack",
  description:
    "Led backend design and delivery of an AI-powered business document builder using FastAPI microservices, Supabase, and the Anthropic Claude API, with a Next.js and React frontend. Coordinated backend and frontend developers across architecture, technical planning, and delivery.",
  highlights: [
    "Designed a microservice platform covering API Gateway, Auth, AI Chat, Document, Quota, and Payment services on Supabase, integrating Claude for AI-assisted document generation.",
    "Coordinated backend and frontend developers, including technical planning and task breakdown; authored the software requirements specification and technical design documents.",
    "Created a 61-ticket, four-sprint Jira plan for a new Admin Service, with explicit dependency tracking and regression testing.",
    "Integrated PayHere for LKR payments and Paddle for international payments, with separate webhook endpoints and event handling for each gateway.",
    "Planned Redis rate limiting and Celery-based webhook reliability as part of the platform roadmap.",
  ],
  tags: [
    "FastAPI",
    "Claude API",
    "Supabase",
    "Next.js",
    "React",
    "PayHere",
    "Paddle",
    "Microservices",
  ],
  featured: true,
  gradient: "from-amber-800 via-stone-700 to-emerald-900",
  iconName: "FileText",
};

export const PROJECTS: Project[] = [
  ...originalProjects.map((project) => {
    if (project.id !== "yukti-ai") return project;
    return {
      ...project,
      highlights: [
        "Built an asynchronous FastAPI backend with a Celery task queue and LlamaIndex AutoMerging Retrieval for hierarchical legal-document RAG.",
        "Applied Tree of Thoughts prompting over Groq-hosted Llama, with Guardrails AI for hallucination mitigation.",
        "Containerised and deployed on AWS ECS with GitHub Actions CI/CD; stored sessions in MySQL and built the frontend with React (Vite).",
      ],
      tags: [
        "Multi-Agent AI",
        "RAG",
        "LlamaIndex",
        "FastAPI",
        "Celery",
        "AWS ECS",
        "React",
        "Guardrails AI",
        "MySQL",
      ],
    };
  }),
  doccraft,
];

export const EXPERIENCES = originalExperiences.map((experience) => {
  if (experience.company !== "eVision Microsystems Pvt Ltd") return experience;
  return {
    ...experience,
    location: "Colombo, Sri Lanka",
    description: [
      "Developed and shipped 3+ cross-platform mobile applications using Flutter and Native Android (Java) for commercial clients, consistently meeting delivery deadlines.",
      "Integrated RESTful APIs through .NET Core Web API for real-time data synchronisation, push notifications, and secure mobile-to-backend communication.",
      "Maintained 95%+ code quality through unit testing and peer code review.",
    ],
  };
});

export const ACHIEVEMENTS = originalAchievements.map((achievement, index) =>
  index === 0
    ? {
        ...achievement,
        // Owner-supplied CS Eminence '24 photo and award details.
        images: [
          "/images/optimized/aiesec-cs-eminence-2024.webp",
          ...(achievement.images ?? []),
        ],
      }
    : achievement,
);

// Owner-supplied photos and organising committee participation for Yathra 2025.
export const YATHRA_EVENT = {
  title: "Yathra 2025",
  year: "2025",
  role: "Organising Committee Member",
  organization: "Classical Music Society, University of Moratuwa",
  venue: "Nelum Pokuna Theatre, Colombo",
  description:
    "I was part of the organising committee for Yathra 2025, organised by the Classical Music Society of the University of Moratuwa at Nelum Pokuna Theatre.",
  experience:
    "Yathra brings together orchestral music, singing, dance, and cinematic visual storytelling to create a complete artistic experience. Being part of the team behind the event was an opportunity to contribute beyond engineering, through music, collaboration, and community.",
  photos: [
    {
      src: "/images/optimized/yathra-2025-committee.webp",
      width: 639,
      height: 855,
      alt: "Eranda wearing his Yathra event pass inside Nelum Pokuna Theatre",
      caption: "Behind the scenes · Organising committee",
    },
    {
      src: "/images/optimized/yathra-2025-stage.webp",
      width: 499,
      height: 685,
      alt: "Yathra event team gathered on stage at Nelum Pokuna Theatre beneath red stage lighting",
      caption: "The team · Nelum Pokuna Theatre",
    },
  ],
};

export const SKILL_CATEGORIES = [
  {
    title: "AI & machine learning",
    skills: [
      "Multi-agent AI & RAG",
      "Claude API & OpenAI Agent SDK",
      "LangChain & LlamaIndex",
      "PyTorch, TensorFlow & Scikit-learn",
      "Hugging Face & prompt engineering",
      "Vector embeddings & semantic search",
      "OpenCV & TensorFlow Lite",
    ],
  },
  {
    title: "Backend & architecture",
    skills: [
      "Python, Java, C, C++ & R",
      "FastAPI, Django & Django REST Framework",
      "Node.js, Express & .NET Web API",
      "Microservices, API gateways & REST",
      "Celery, async processing & webhooks",
      "PostgreSQL, MySQL, MongoDB & MSSQL",
      "Supabase, Firebase & Pinecone",
    ],
  },
  {
    title: "Frontend & mobile",
    skills: [
      "React, Next.js & Angular",
      "TypeScript & JavaScript (ES6+)",
      "Tailwind CSS, HTML & CSS",
      "Flutter & React Native",
      "Native Android (Java / Kotlin)",
    ],
  },
  {
    title: "Cloud & delivery",
    skills: [
      "AWS: ECS, EC2, S3, Lambda & IAM",
      "GCP, Docker & Kubernetes",
      "GitHub Actions & CI/CD",
      "Git workflows, Jira & Azure DevOps",
      "Postman & API testing",
      "Agile/Scrum & code review",
      "Technical documentation",
    ],
  },
];

export const PROFILE_NOTES = [
  {
    label: "TECHNICAL LEADERSHIP",
    text: "Backend and frontend coordination, sprint planning, and software requirements and design documentation.",
  },
  {
    label: "HOW I WORK",
    text: "Agile teamwork, code review, regression testing, and reliable, well-documented engineering.",
  },
  {
    label: "LANGUAGES",
    text: "English — Professional. Sinhala — Native.",
  },
];
