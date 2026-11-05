# Portfolio redesign

## Reference study

Reference: https://www.youtube.com/watch?v=m-f56P_L660

The video demonstrates several sites rather than a single design. The watch sequences at approximately 0:00 and 1:51 use near-black surfaces, warm metallic lighting, a central subject, close-up changes in scale, and restrained navigation. The Abyssal tour at 10:22 uses full-screen scenes, tracked display typography, depth progression, a persistent side indicator, and scroll-led storytelling. The portfolio at approximately 13:15 uses oversized condensed headings, solid and outlined name treatments, warm photographic scenes, sparse navigation, and an editorial work section.

Analysis used the video's metadata, chapter list, all available high-resolution YouTube storyboard sheets, and full-resolution frames extracted from the reference video. Interactive playback was unavailable because the native browser bridge is offline. Exact animation timings and mobile layouts therefore cannot be verified from the reference; these are implementation decisions rather than claims about the video.

## Design system

- Warm ink `#11100e`, ivory `#f0ede6`, copper `#cf9a72`, muted stone `#a8a39a`.
- Locally hosted Barlow Condensed for large editorial headings; DM Sans for readable text; system monospace for small annotations.
- Oversized typography and portrait layering establish identity. Generous negative space, fine rules, small section numbers, and asymmetric media layouts carry the rest of the page.
- Scroll progress, restrained entrance motion, image parallax, project hover treatments, and an interactive 3D-projected network replace the reference's product-specific sequences with AI engineering content.
- Mobile layouts stack the editorial columns, reduce display sizes, and use a keyboard-accessible navigation disclosure. Reduced-motion users receive static compositions.

## Architecture and preservation

The original application used Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber. The redesign retains these technologies. Its components live in `src/components/portfolio` and its scoped stylesheet in `src/app/portfolio.css`.

The initial dependency audit reported critical and high vulnerabilities, including issues without fixes on the Next.js 14 line. Next.js was upgraded to 16.4.5, React to 19.3.1, and the existing React Three Fiber, Drei, and Lucide bindings to compatible versions. React Three Fiber's updated types required one constructor-argument adjustment in the legacy particle geometry; the original file is retained in `src/legacy/originals/HeroCanvas.tsx.txt`. No new production dependency was added. Node.js 20.9 or newer is required. The final dependency audit reports zero vulnerabilities.

The previous homepage and application shell remain available at `/legacy`, using the original section, UI, and 3D components. The original root layout is preserved in `src/legacy/OriginalRootLayout.tsx`. Existing `public/images` and `public/videos` files are retained. Derived images and video posters are added separately; original files are never overwritten.

## Content and assets

The original professional content remains in `src/data/portfolioData.ts`. The redesign now uses `src/data/portfolioProfile.ts` to combine that content with owner-supplied CV details while preserving the original `/legacy` content. Five projects, two roles, two education entries, and the existing awards are represented. Genomic variant prediction is presented as research; no published paper, citation, or degree completion is asserted.

The supplied `Eranda_Abewardhana_AI_CV.pdf` was reviewed in full using text extraction and rendered page images. It adds DocCraft, technical leadership, payment/webhook integrations, further cloud/database/mobile skills, and language proficiency. The displayed telephone number is updated to the CV's +94 764 874 820; eVision's location and the AIESEC award period also follow the CV. The DocCraft Admin Service is described as a 61-ticket, four-sprint plan, and Redis rate limiting/Celery webhook reliability remain explicitly planned work. DocCraft has a labelled service-overview graphic, not a fabricated product screenshot or invented repository link. The source PDF remains outside the public web assets.

The existing project contains eleven images and two MP4s. `eranda_hero_main.png` is a screenshot of the old website, not a portrait. `eranda_suit_walking.png` is referenced in the original data but is absent; the redesign never requests it. Personal portraits and robotics media are reused. The legal AI cover is a still extracted from the existing legal AI video. Projects without supplied screenshots use clearly diagrammatic visuals rather than invented product screenshots.

## Page structure

1. Introduction: identity, portrait, professional focus, experience, direct work/contact links.
2. Selected work: four project presentations and accessible case-study dialogs, with actual repositories and local demos where supplied.
3. About: biography, personal image, education, recognition.
4. AI expertise: interactive network and selectable areas of expertise.
5. Technical skills: the four existing skill categories without arbitrary proficiency percentages.
6. Experience: the two existing roles with expandable details.
7. Research: the documented genomic AI project, methodology, and evaluation metrics. No publication list is fabricated.
8. Contact: working email, phone, WhatsApp, GitHub, LinkedIn, and clipboard action with fallback.

## Run

`npm install`, then `npm run dev`. The new portfolio is `/`; the preserved original is `/legacy`. Production: `npm run build` followed by `npm start`. Configure `NEXT_PUBLIC_SITE_URL` to the actual deployment origin for canonical metadata.

## Verification

### Scroll-driven zoom

The introduction now continues into a pinned cinematic sequence at `/#story`. Native scroll position drives the camera from a wide portrait (0.92×) into a close-up (2.15×), then pulls back (0.95×) before the work section. Scrolling upward reverses the sequence. Three text chapters and copper-to-green ambient lighting follow the same timeline. The existing full-resolution walking portrait is reused through an optimised WebP derivative; no synthetic personal image is introduced.

`ScrollStory.tsx` owns the pinned sequence. `ScrollZoom.tsx` provides reusable viewport-driven zoom for project covers and the About portrait. The hero has an additional scroll-linked zoom. The implementation uses the existing Framer Motion dependency and never cancels or replaces native wheel/touch events. A visible skip link goes directly to the work section. Reduced-motion mode removes the extended pinned timeline and media scaling.

`scripts/scroll-zoom-qa.mjs` verifies the wide/close/pull-back camera positions, reversed scrolling, actual mouse-wheel input, skip navigation, project zoom, and the reduced-motion alternative at 320, 390, 768, and 1440px.

### Application checks

- `npm run typecheck` and `npm run build` pass.
- Browser integration checks cover 320, 375, 390, 768, 1024, 1366, 1440, and 1920px layouts, images, internal links, mobile navigation, keyboard dismissal, focus restoration, all project dialogs, both actual video files, the expertise controls, experience/award disclosures, and the email clipboard action.
- Automated axe checks cover WCAG 2 A/AA and WCAG 2.1 AA. The new page and its case-study dialogs have no detected violations. Automated checks complement the visual review; they do not establish full accessibility certification.
- The legacy page receives an additional browser smoke test, including its WebGL components.
- QA tools are installed outside the project so they do not enter its production dependencies. To repeat locally, install `playwright@1.51.1` and `@axe-core/playwright@4.10.2` in a separate directory, set `PORTFOLIO_QA_MODULES` to its `node_modules` path, and run `node scripts/portfolio-qa.mjs`. The harness currently uses the locally installed Windows Chrome. Use `PORTFOLIO_QA_URL` to target a different local port.
