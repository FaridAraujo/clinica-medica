'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { PHONE_OFFICE } from '@/lib/constants';

export default function TopBar() {
  const locale = useLocale();
  const pathname = usePathname();

  const otherLocale = locale === 'es' ? 'en' : 'es';
  const strippedPath = pathname.startsWith(`/${locale}`)
    ? pathname.slice(`/${locale}`.length) || '/'
    : pathname;
  const otherLocalePath = `/${otherLocale}${strippedPath === '/' ? '' : strippedPath}`;

  const langLabel = locale === 'es' ? 'Idioma' : 'Language';
  const switchLabel = otherLocale === 'es' ? 'Cambiar a Español' : 'Switch to English';

  return (
    <div className="fixed inset-x-0 top-0 z-50 hidden h-8 bg-navy lg:block">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">

        {/* Left — office phone */}
        <a
          href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
          className="flex items-center gap-1.5 font-body text-xs text-white/70 transition-colors duration-150 hover:text-white"
        >
          <PhoneIcon className="h-3 w-3 shrink-0" aria-hidden="true" />
          {PHONE_OFFICE}
        </a>

        {/* Right — language pill toggle */}
        <div
          role="group"
          aria-label={langLabel}
          className="flex items-center rounded-full border border-white/15 bg-white/[0.07] p-0.5 font-body text-[0.65rem]"
        >
          <span
            aria-current="true"
            className="rounded-full bg-white/20 px-2.5 py-1 font-medium text-white"
          >
            {locale === 'es' ? 'Español' : 'English'}
          </span>
          <Link
            href={otherLocalePath}
            aria-label={switchLabel}
            className="rounded-full px-2.5 py-1 text-white/50 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
          >
            {otherLocale === 'es' ? 'Español' : 'English'}
          </Link>
        </div>

      </div>
    </div>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z" />
    </svg>
  );
}
