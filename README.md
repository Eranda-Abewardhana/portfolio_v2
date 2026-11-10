# Eranda Sathsara — AI & Software Engineering Portfolio

The redesigned portfolio is available at `/`. The original portfolio is preserved at `/legacy`, together with all its section components and original media. See [the reference analysis and design notes](docs/REDESIGN.md) for the new design system, content decisions, architecture, and verification details.

Light mode is the default, with white, slate, and deep blue (`#1d4ed8`). The navigation's theme toggle switches to the original dark palette and remembers the choice in the browser.

Visitors can download the latest CV from the introduction or contact section. Replace `public/cv/Eranda_Abewardhana_AI_CV.pdf` to update the download.

GSAP, SplitText, DrawSVG, and ScrollTrigger animate individual headline characters, reveal heading words, draw portrait orbits, icons, and DNA strands, and add subtle desktop button movement. Reduced-motion preferences disable these effects and restore plain text and complete SVGs. Framer Motion continues to drive the portrait and scroll-camera zoom.

Run `npm install` and `npm run dev` to preview locally. Run `npm run build` and `npm start` for production. For a custom domain, set `NEXT_PUBLIC_SITE_URL` to your preferred public origin for canonical and social metadata.

Project videos use build-time encryption and in-page playback to discourage simple download-manager capture without a paid video host. The npm dev/build/typecheck commands prepare the assets automatically. This is best-effort protection, not DRM; see [video playback and its limitations](docs/VIDEO_PLAYBACK.md).

For Vercel, the production URL is detected automatically. See [SEO setup and Google Search Console verification](docs/SEO.md) and [.env.example](.env.example) for deployment settings and indexing steps.

The remainder of this README documents the preserved original implementation.

---

# Original 3D Interactive Portfolio

An interactive, high-performance **3D Portfolio Website** built for **Eranda Sathsara Abewardhana**, final-year BSc (Hons) Artificial Intelligence undergraduate at the University of Moratuwa. Specializing in Multi-Agent AI systems, RAG architectures, FastAPI microservices, and Cloud-Native engineering.

---

## 🌟 Key Highlights & Features

- **Executive Terracotta & Amber Theme**: Tailored color palette (`#e06b3a` Terracotta, `#f59e0b` Amber, `#c45528` Ember, `#07090e` Dark Obsidian) matching Eranda's executive portrait tones.
- **3D WebGL Canvas Layer**: Built with Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`):
  - **3D Photo Gallery Prism**: Double-sided rotating 3D metallic photo prism showcasing Eranda's portraits with orbiting rings.
  - **3D Tech Arsenal Polyhedrons**: Category-specific 3D geometries (Torus Knot for AI/ML, Octahedron for Backend, Cube for Frontend, Dodecahedron for Cloud).
  - **3D Wireframe Globe**: Rotating interactive wireframe hologram globe in the Contact section.
  - **Background Particle Systems**: Ambient WebGL floating particles.
- **Interactive Project Media Carousel**:
  - Auto-slides every 5 seconds (`5s timer`).
  - Supports native high-definition MP4 video playback (`1698638341487.mp4` & `1750325263163.mp4`).
  - High-res exhibition photos (YouFIRA EXMO 2023 Robotic Arm Vehicle & Team).
- **AIESEC CS Eminence '24 Award Spotlight**:
  - Dedicated leadership award section celebrating the *Best Performing LB Member – IR, Matching & CXP (iGT)* honor with 2 trophy photos and inspirational quote.
- **Fully Responsive & SEO Optimized**: Next.js App Router 14, Framer Motion animations, custom SVG favicon (`/icon.svg`), and zero hydration mismatches.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **3D & WebGL**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), Glassmorphism, CSS Custom Properties
- **Animations**: [Framer Motion](https://www.framer.com/motion/), Canvas Confetti
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Repository Structure

```text
├── public/
│   ├── images/
│   │   ├── 1698638341487.mp4          # YouFIRA Native MP4 Video
│   │   ├── 1699017629827.jpg          # YouFIRA Robotic Arm Vehicle Photo
│   │   ├── 1745157015490.jpg          # AIESEC Award Trophy Photo
│   │   ├── 1745157015791.jpg          # AIESEC Award Certificate Photo
│   │   ├── 1750325263163.mp4          # Yukti AI Native MP4 Video
│   │   ├── eranda_suit_thinking.png   # Hero Portrait Photo
│   │   ├── eranda_tree.png            # About Section Photo
│   │   ├── eranda_stairs.png          # About Section Photo
│   │   └── youfira_exmo2023.png       # EXMO 2023 Exhibition Team Photo
│   └── icon.svg                       # Branded Monogram Favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root Layout & SEO Metadata
│   │   ├── page.tsx                   # Main Portfolio Page
│   │   └── icon.tsx                   # Dynamic App Router Monogram Icon
│   ├── components/
│   │   ├── 3d/                        # WebGL Three.js Canvases
│   │   │   ├── AboutCanvas.tsx        # 3D Rotating Photo Prism
│   │   │   ├── EarthCanvas.tsx        # 3D Wireframe Globe
│   │   │   ├── HeroCanvas.tsx         # 3D Particles & Accent Lines
│   │   │   └── TechCanvas.tsx         # 3D Polyhedrons (TorusKnot, Octahedron, etc.)
│   │   ├── sections/                  # Portfolio Section Components
│   │   │   ├── HeroSection.tsx        # Full-Screen Hero & Text
│   │   │   ├── AboutSection.tsx       # Bio & Interactive 3D Prism
│   │   │   ├── SkillsSection.tsx      # Tech Arsenal & Animated Progress Bars
│   │   │   ├── ProjectsSection.tsx    # 5s Auto-Slide Media Carousels & Video Players
│   │   │   ├── ExperienceSection.tsx  # Work History Timeline
│   │   │   ├── AchievementsSection.tsx# AIESEC Award Spotlight & Honors
│   │   │   └── ContactSection.tsx     # Full-Page Grid & Contact Form
│   │   └── ui/
│   │       ├── Navbar.tsx             # Executive Navigation Bar
│   │       ├── Footer.tsx             # Executive Footer & Metadata
│   │       ├── ProjectModal.tsx       # Full Specs Detail Modal Window
│   │       └── CustomCursor.tsx       # Theme-Matched Custom Cursor
│   └── data/
│       └── portfolioData.ts           # Centralized Portfolio Content & Media Paths
```

---

## ⚙️ Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Eranda-Abewardhana/portfolio.git
   cd test
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 License

Copyright © 2026 Eranda Sathsara Abewardhana. Built for personal portfolio and showcase.
