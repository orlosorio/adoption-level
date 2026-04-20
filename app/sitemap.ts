import type { MetadataRoute } from 'next';
import { VALID_ROLE_IDS } from '@/lib/routing';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://accionables.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const roleEntries: MetadataRoute.Sitemap = VALID_ROLE_IDS.map((id) => ({
    url: `${BASE_URL}/assessment/role/${id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${BASE_URL}/assessment`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/assessment/general`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...roleEntries,
  ];
}
