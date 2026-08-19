import { MetadataRoute } from 'next';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSONAL_INFO.name} | AI Engineer Portfolio`,
    short_name: PERSONAL_INFO.shortName,
    description: PERSONAL_INFO.summary,
    start_url: '/',
    display: 'standalone',
    background_color: '#07090e',
    theme_color: '#e06b3a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
