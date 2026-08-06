import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/constants';

/**
 * Sitemap del sitio. Next.js lo sirve en /sitemap.xml.
 * Lo declaramos en robots.ts para que Google lo descubra de inmediato.
 *
 * Rutas con prefijo de locale (localePrefix 'always' en proxy.ts):
 *   /es, /es/consultorio, /es/doctor, ...
 */

// Rutas relativas (sin prefijo de locale) con su prioridad y frecuencia.
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',                priority: 1.0, changeFrequency: 'monthly' },
  { path: '/consultorio',    priority: 0.9, changeFrequency: 'monthly' },
  { path: '/doctor',         priority: 0.9, changeFrequency: 'monthly' },
  { path: '/especialidades', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/publicaciones',  priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contacto',       priority: 0.8, changeFrequency: 'yearly' },
  { path: '/agendar',        priority: 0.9, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }))
  );
}
