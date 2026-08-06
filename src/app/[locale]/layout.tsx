import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_NAME } from '@/lib/constants';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollAnimator from '@/components/ui/ScrollAnimator';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    // Google ya casi no pondera meta keywords, pero Bing y varios directorios
    // médicos sí las leen. Cubrimos las variantes de búsqueda más probables.
    keywords: [
      'Dr. Alvarado',
      'Dr. Edwin Alvarado',
      'Doctor Edwin Alvarado',
      'Edwin Manuel Alvarado Arce',
      'cirujano cardiovascular',
      'cirujano cardiovascular Heredia',
      'cirujano cardiovascular Costa Rica',
      'cirugía de corazón Costa Rica',
      'cirujano de tórax',
      'doctor Heredia',
      'doctor Costa Rica',
      'médico Heredia',
      'clínica Heredia',
      'consultorio médico Heredia',
      'consultorios médicos Heredia',
      'especialista del corazón Heredia',
    ],
    authors: [{ name: 'Dr. Edwin Manuel Alvarado Arce' }],
    creator: 'Dr. Edwin Manuel Alvarado Arce',
    publisher: 'Consultorio Dr. Edwin Alvarado',
    category: 'health',
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('description'),
      url: `/${locale}`,
      siteName: SITE_NAME,
      locale: 'es_CR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[9999] -translate-y-20 rounded bg-navy px-4 py-2 font-body text-sm text-warm-white transition-transform focus:translate-y-0"
      >
        Saltar al contenido principal
      </a>
      {/* Film grain — fixed overlay, pointer-events-none, never on a scrolling container */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
      <Navbar />
      <div id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </div>
      <Footer />
      <ScrollAnimator />
    </NextIntlClientProvider>
  );
}
