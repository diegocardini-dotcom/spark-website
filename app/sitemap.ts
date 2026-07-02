import type { MetadataRoute } from 'next';
import { FALLBACK_PROJECTS } from '@/lib/fallbackData';
import { SERVICES_DETAIL } from '@/lib/servicesData';

const SITE = 'https://sparkdigital.agency';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...SERVICES_DETAIL.map((s) => ({
      url: `${SITE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...FALLBACK_PROJECTS.map((p) => ({
      url: `${SITE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
