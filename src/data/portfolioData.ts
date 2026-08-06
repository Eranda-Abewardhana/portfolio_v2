export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: 'AI/ML' | 'Full-Stack' | 'Robotics' | 'NLP';
  description: string;
  highlights: string[];
  tags: string[];
  frontendGithub?: string;
  backendGithub?: string;
  github?: string;
  featured: boolean;
  gradient: string;
  iconName: string;
  image?: string;
  videoSrc?: string;
  galleryImages?: string[];
  linkedInEmbedUrl?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Achievement {
  title: string;
  organization: string;
  year: string;
  images?: string[];
  quote?: string;
}

export const PERSONAL_INFO = {
  name: "Eranda Sathsara Abewardhana",
  shortName: "Eranda Sathsara",
  title: "AI Engineer | ML Engineer | Full-Stack Developer",
  summary: "Final-year Artificial Intelligence undergraduate at the University of Moratuwa with 2+ years of industry experience in Multi-Agent AI systems, RAG pipelines, FastAPI backends, and cloud-native deployments.",
  location: "Colombo, Sri Lanka",
  email: "erandasathsara@gmail.com",
  phone: "+94 764 874 820",
  github: "https://github.com/Eranda-Abewardhana",
  linkedin: "https://linkedin.com/in/eranda-abewardhana-6a71bb199",
  images: {
    heroPortrait: "/images/eranda_stairs.png",
    aboutTree: "/images/eranda_tree.png",
    aboutSuitThinking: "/images/eranda_suit_thinking.png",
    youfiraExmo: "/images/youfira_exmo2023.png",
  },
  stats: [
    { label: "Years Experience", value: "2+" },
    { label: "Production Projects", value: "10+" },
    { label: "Academic Level", value: "BSc AI Honors" },
    { label: "Specialties", value: "RAG & Multi-Agent AI" }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI, Machine Learning & LLMs",
    icon: "Brain",
    skills: [
      { name: "PyTorch & TensorFlow", level: 92 },
      { name: "Multi-Agent AI & RAG", level: 95 },
      { name: "LangChain & LlamaIndex", level: 90 },
      { name: "Pinecone Vector DB", level: 88 },
      { name: "OpenAI Agent SDK & HuggingFace", level: 85 },
      { name: "Deep Learning & Transformer Encoders", level: 88 },
    ]
  },
  {
    title: "Backend & Systems Architecture",
    icon: "Server",
    skills: [
      { name: "FastAPI & Python", level: 95 },
      { name: "Django & DRF", level: 88 },
      { name: "Node.js & Express", level: 85 },
      { name: ".NET Core Web API", level: 80 },
      { name: "Celery & Async Queues", level: 85 },
      { name: "PostgreSQL & MySQL", level: 90 },
    ]
  },
  {
    title: "Frontend & Mobile",
    icon: "Layout",
    skills: [
      { name: "React.js & Next.js", level: 90 },
      { name: "TypeScript & JavaScript", level: 92 },
      { name: "Tailwind CSS & HTML5/CSS3", level: 95 },
      { name: "Angular", level: 80 },
      { name: "Flutter & Mobile Dev", level: 85 },
      { name: "Three.js & WebGL", level: 82 },
    ]
  },
  {
    title: "Cloud, DevOps & Tools",
    icon: "Cloud",
    skills: [
      { name: "AWS (ECS, EC2, S3, Lambda)", level: 88 },
      { name: "Docker & Kubernetes", level: 85 },
      { name: "GitHub Actions CI/CD", level: 90 },
      { name: "Git, Jira & Azure DevOps", level: 92 },
      { name: "C++ & Embedded ROS", level: 80 },
      { name: "OpenCV & TFLite", level: 82 },
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Machine Learning Engineering Intern",
    company: "Orysys Pvt Ltd",
    location: "Colombo, Sri Lanka",
    period: "Feb 2025 – Aug 2025",
    description: [
      "Architected scalable backend microservices and REST APIs in FastAPI to serve AI model inference, document indexing, and workflow orchestration at production scale.",
      "Built end-to-end production-grade RAG systems and multi-agent AI workflows enabling intelligent document search, question answering, and automated reasoning over enterprise knowledge bases.",
      "Managed a Pinecone vector database for semantic search; trained time-series forecasting models using PyTorch, Prophet, and ARIMA, improving prediction accuracy on business KPIs.",
      "Collaborated in an Agile team using Jira and Azure DevOps; contributed to sprint planning, code reviews, and technical documentation."
    ],
    tags: ["FastAPI", "RAG", "Multi-Agent AI", "LlamaIndex", "Pinecone", "PyTorch", "AWS", "Docker"]
  },
  {
    role: "Mobile Application Developer",
    company: "eVision Microsystems Pvt Ltd",
    location: "Colombo, Sri Lanka",
    period: "Jan 2021 – Mar 2022",
    description: [
      "Developed and shipped 3+ cross-platform mobile applications using Flutter and Native Android (Java) for commercial clients, consistently meeting delivery deadlines.",
      "Integrated RESTful APIs via .NET Core Web API for real-time data synchronization, push notifications, and secure mobile-to-backend communication.",
      "Maintained 95%+ code quality through unit testing and peer code review, reducing post-release bug rates significantly."
    ],
    tags: ["Flutter", "Android Native", "Java", ".NET Core API", "REST APIs", "Unit Testing"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "youfira-robotics",
    title: "YouFIRA – Autonomous Robotic Vehicle",
    subtitle: "On-Device Computer Vision & Robotic Arm Assistive Vehicle (EXMO 2023)",
    year: "2022–2023",
    category: "Robotics",
    description: "Built an autonomous assistive vehicle featured at EXMO 2023 Technological Exhibition (Faculty of Information Technology, UoM) using OpenCV for real-time object detection and TensorFlow Lite for on-device inference with a 4-DOF robotic arm.",
    highlights: [
      "Demonstrated live at EXMO 2023 UoM Flagship Technological Exhibition.",
      "Designed robotic arm control with PID Control and Inverse Kinematics.",
      "Integrated full embedded stack in C++ with ROS for sensor/actuator coordination.",
      "Fabricated a custom PCB and companion voice-command mobile app."
    ],
    tags: ["EXMO 2023", "Computer Vision", "OpenCV", "TensorFlow Lite", "ROS", "C++", "PID Control", "Custom PCB"],
    github: "https://github.com/Eranda-Abewardhana/Intelligence-Assistant",
    featured: true,
    gradient: "from-amber-500 via-orange-600 to-yellow-600",
    iconName: "Bot",
    image: "/images/1699017629827.jpg", // Robotic arm vehicle photo!
    videoSrc: "/images/1698638341487.mp4", // Native MP4 video!
    galleryImages: [
      "/images/1699017629827.jpg",
      "/images/youfira_exmo2023.png",
    ],
    linkedInEmbedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7124604838042107906"
  },
  {
    id: "yukti-ai",
    title: "Yukti – Sri Lankan Legal AI Assistant",
    subtitle: "Hierarchical Legal Document RAG & Multi-Agent Legal Assistant",
    year: "2025",
    category: "AI/ML",
    description: "Designed a full system architecture for an AI-powered legal chatbot using LLMs to classify queries, retrieve statutory documents, and generate cited answers with hallucination mitigation via Guardrails AI.",
    highlights: [
      "Built async FastAPI backend with Celery task queue & LlamaIndex AutoMerging Retrieval for hierarchical legal document RAG.",
      "Applied Tree of Thoughts prompting over Groq-hosted Llama 3B.",
      "Deployed on AWS ECS with GitHub Actions CI/CD; frontend built with React (Vite)."
    ],
    tags: ["Multi-Agent AI", "RAG", "LlamaIndex", "FastAPI", "AWS ECS", "React", "Groq Llama 3B", "MySQL"],
    frontendGithub: "https://github.com/Eranda-Abewardhana/Yukthi-Fe",
    backendGithub: "https://github.com/Eranda-Abewardhana/Yukthi-Be",
    featured: true,
    gradient: "from-cyan-500 via-blue-600 to-indigo-600",
    iconName: "Scale",
    videoSrc: "/images/1750325263163.mp4", // Native MP4 video!
    linkedInEmbedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7341395341058969600"
  },
  {
    id: "sentiview",
    title: "Call Center Communication Analyzer (SentiView)",
    subtitle: "Serverless Audio Transcription & Sentiment Analysis Platform",
    year: "2024",
    category: "NLP",
    description: "Built an NLP-based sentiment analysis platform for call recordings, featuring an automated audio ingestion and transcription pipeline with real-time sentiment visualizers.",
    highlights: [
      "Engineered audio processing pipeline using Angular frontend and FastAPI microservices.",
      "Leveraged AWS S3, Lambda, and EC2 for serverless audio processing and API hosting.",
      "Dockerized full stack with GitHub Actions CI/CD; metadata stored in MongoDB."
    ],
    tags: ["NLP", "Sentiment Analysis", "FastAPI", "AWS Lambda", "Angular", "MongoDB", "Docker"],
    frontendGithub: "https://github.com/HRS0986/iCMS-Frontend",
    backendGithub: "https://github.com/Eranda-Abewardhana/ICSMS-Call-Analyzer-Backend",
    featured: true,
    gradient: "from-purple-500 via-violet-600 to-indigo-700",
    iconName: "Headphones"
  },
  {
    id: "genomic-pathogenicity",
    title: "Genomic Variant Pathogenicity Prediction",
    subtitle: "Dual-Input Multi-Scale CNN & Transformer Encoder for DNA Variants",
    year: "2026",
    category: "AI/ML",
    description: "Designed a novel dual-input deep neural architecture combining Multi-Scale CNNs and Transformer Encoders for REF/ALT genomic sequences (1024bp) to predict pathogenic impact of single-nucleotide variants (SNVs).",
    highlights: [
      "Implemented in PyTorch with Explainable AI (XAI) via Integrated Gradients and In-silico Mutagenesis (Captum).",
      "Evaluated using ROC-AUC, AUPRC, MCC, and Balanced Accuracy on gene-balanced ClinVar datasets."
    ],
    tags: ["Research", "Deep Learning", "PyTorch", "Multi-Scale CNNs", "Transformer Encoders", "Captum XAI"],
    github: "https://github.com/Eranda-Abewardhana",
    featured: true,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    iconName: "Dna"
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "University of Moratuwa",
    degree: "BSc (Hons) in Artificial Intelligence",
    period: "2022 – 2026"
  },
  {
    institution: "University of Colombo",
    degree: "Certificate in Java Programming",
    period: "2019 – 2020"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Best Performing LB Member – IR, Matching & CXP - iGT",
    organization: "AIESEC in University of Moratuwa & AIESEC in Colombo South (CS Eminence '24)",
    year: "2024",
    images: [
      "/images/1745157015490.jpg",
      "/images/1745157015791.jpg",
    ],
    quote: "Receiving the 'Best Performing LB Member – IR, Matching & CXP - iGT' award at CS Eminence '24 is more than just a recognition — it's a reflection of the passion, dedication, and teamwork poured into every step of the journey. 💼🌍\n\nMassive thanks to AIESEC in University of Moratuwa & AIESEC in Colombo South for the constant support and belief. This one’s for every challenge turned into growth and every opportunity turned into impact. 💪💙\n\nHere’s to going beyond, always. 🚀"
  },
  {
    title: "8th Place – Code Rush Algorithmic Competition",
    organization: "University of Moratuwa",
    year: "2022"
  },
  {
    title: "Competitor – IDIALIZE, CodeSprint 7.0, MadHack & ACES Coders",
    organization: "Inter-University Hackathons",
    year: "2023–2024"
  },
  {
    title: "Active Member",
    organization: "Rotaract Club & Classical Music Society, UoM",
    year: "Ongoing"
  }
];
