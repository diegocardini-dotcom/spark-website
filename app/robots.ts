import type { MetadataRoute } from 'next';

const SITE = 'https://sparkdigital.agency';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/', '/hero-lab', '/logo-lab'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
