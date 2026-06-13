import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    // react-pdf / pdfjs-dist usa canvas opcionalmente — evitar que webpack lo bundle
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
