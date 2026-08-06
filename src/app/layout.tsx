import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  // Fuente única de verdad del dominio (ver constants.ts) — resuelve todas las
  // URLs relativas de canonical, Open Graph e imágenes.
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale === 'es' ? 'es-CR' : locale}
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
