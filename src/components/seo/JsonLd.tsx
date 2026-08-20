import React from 'react';
import { PERSONAL_INFO, PROJECTS, EDUCATION } from '@/data/portfolioData';

export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://erandasathsara.com';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: PERSONAL_INFO.name,
    alternateName: [
      PERSONAL_INFO.shortName,
      'Eranda Abewardhana',
      'Eranda Sathsara Abewardhana',
      'Eranda S. Abewardhana',
      'Sathsara Eranda',
      'sathsara aewardhana',
      'Eranda Aewardhana',
      'Sathsara Eranda Abewardhana',
    ],
    url: baseUrl,
    image: `${baseUrl}${PERSONAL_INFO.images.heroPortrait}`,
    jobTitle: 'AI Engineer & Full-Stack Developer',
    description: PERSONAL_INFO.summary,
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Panadura',
      addressRegion: 'Western Province',
      addressCountry: 'LK',
    },
    alumniOf: EDUCATION.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
      programName: edu.degree,
    })),
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Multi-Agent AI Systems',
      'Retrieval-Augmented Generation (RAG)',
      'PyTorch',
      'TensorFlow',
      'FastAPI',
      'Python',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'AWS Cloud',
      'Docker',
      'Robotics',
      'Computer Vision',
      'Natural Language Processing (NLP)',
    ],
    sameAs: [
      PERSONAL_INFO.github,
      PERSONAL_INFO.linkedin,
      PERSONAL_INFO.whatsapp,
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Orysys Pvt Ltd',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: `${PERSONAL_INFO.name} | Official Portfolio & AI Engineer Profile`,
    description: PERSONAL_INFO.summary,
    publisher: {
      '@id': `${baseUrl}/#person`,
    },
    inLanguage: 'en-US',
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${baseUrl}/#profilepage`,
    url: baseUrl,
    name: `${PERSONAL_INFO.name} - AI Engineer & Full-Stack Developer`,
    mainEntity: {
      '@id': `${baseUrl}/#person`,
    },
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
  };

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Projects by Eranda Sathsara Abewardhana',
    itemListElement: PROJECTS.map((proj, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: proj.title,
        description: proj.description,
        applicationCategory: proj.category,
        operatingSystem: 'Cross-platform',
        url: proj.github || proj.frontendGithub || baseUrl,
        keywords: proj.tags.join(', '),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
    </>
  );
}
