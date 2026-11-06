import { MetadataRoute } from 'next';
import { getSiteUrl, isIndexableDeployment } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  if (!isIndexableDeployment()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/private/'] },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
