import { PERSONAL_INFO, PROJECTS, EDUCATION } from "@/data/portfolioProfile";
import { getSiteUrl } from "@/lib/site";

export default function JsonLd() {
  const baseUrl = getSiteUrl();

  const personSchema = {
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: PERSONAL_INFO.name,
    alternateName: [
      PERSONAL_INFO.shortName,
      "Eranda Abewardhana",
      "Eranda S. Abewardhana",
    ],
    url: `${baseUrl}/`,
    mainEntityOfPage: { "@id": `${baseUrl}/#profilepage` },
    image: `${baseUrl}${PERSONAL_INFO.images.heroPortrait}`,
    jobTitle: "AI & Software Engineer",
    description: PERSONAL_INFO.summary,
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Panadura",
      addressRegion: "Western Province",
      addressCountry: "LK",
    },
    alumniOf: EDUCATION.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Multi-Agent AI Systems",
      "Retrieval-Augmented Generation (RAG)",
      "PyTorch",
      "TensorFlow",
      "FastAPI",
      "Python",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "AWS Cloud",
      "Docker",
      "Robotics",
      "Computer Vision",
      "Natural Language Processing (NLP)",
      "Backend & Platform Engineering",
      "Microservices",
      "Anthropic Claude API",
      "Cloud-Native Systems",
      "Payment Gateway Integrations",
    ],
    sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: `${baseUrl}/`,
    name: PERSONAL_INFO.name,
    alternateName: `${PERSONAL_INFO.shortName} Portfolio`,
    description: PERSONAL_INFO.summary,
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
    inLanguage: "en-US",
  };

  const profilePageSchema = {
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#profilepage`,
    url: `${baseUrl}/`,
    name: `${PERSONAL_INFO.name} | AI & Software Engineer`,
    description: PERSONAL_INFO.summary,
    inLanguage: "en-US",
    mainEntity: {
      "@id": `${baseUrl}/#person`,
    },
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
  };

  const projectsSchema = {
    "@type": "ItemList",
    "@id": `${baseUrl}/#projects`,
    name: "Featured Projects by Eranda Sathsara Abewardhana",
    itemListElement: PROJECTS.map((proj, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "SoftwareApplication",
        name: proj.title,
        description: proj.description,
        applicationCategory: proj.category,
        operatingSystem: "Cross-platform",
        url: proj.github || proj.frontendGithub || `${baseUrl}/#work`,
        author: { "@id": `${baseUrl}/#person` },
        keywords: proj.tags.join(", "),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [personSchema, websiteSchema, profilePageSchema, projectsSchema],
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
