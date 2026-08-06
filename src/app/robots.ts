import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * robots.txt — Next.js lo sirve en /robots.txt.
 * Permite la indexación completa y le dice a Google dónde está el sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
