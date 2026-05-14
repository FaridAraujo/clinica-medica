'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { WHATSAPP_URL, PHONE_OFFICE, EMAIL } from '@/lib/constants';

export default function Footer() {
  const locale = useLocale();
  const t      = useTranslations('footer');
  const tNav   = useTranslations('nav');
  const pathname = usePathname();

  const otherLocale = locale === 'es' ? 'en' : 'es';
  const strippedPath = pathname.startsWith(`/${locale}`)
    ? pathname.slice(`/${locale}`.length) || '/'
    : pathname;
  const otherLocalePath = `/${otherLocale}${strippedPath === '/' ? '' : strippedPath}`;

  const links = [
    { href: `/${locale}/consultorio`,   label: tNav('consultorio') },
    { href: `/${locale}/doctor`,        label: tNav('sobre') },
    { href: `/${locale}/especialidades`, label: tNav('especialidades') },
    { href: `/${locale}/contacto`,      label: tNav('contacto') },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-navy/[0.08]">

      {/* Main body */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">

          {/* Identity block */}
          <div className="flex flex-col gap-4">
            <Link
              href={`/${locale}`}
              className="flex flex-col gap-1 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            >
              <span className="font-heading text-[1.25rem] font-medium leading-none text-navy">
                Dr. Edwin Manuel Alvarado Arce
              </span>
              <span className="font-body text-[0.625rem] font-medium uppercase tracking-[0.16em] text-navy/40">
                {t('location')}
              </span>
            </Link>
            <p className="max-w-[34ch] font-body text-[0.875rem] leading-relaxed text-navy/50">
              {t('tagline')}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label={locale === 'es' ? 'Mapa del sitio' : 'Site map'}>
            <p className="mb-5 font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-navy/35">
              {locale === 'es' ? 'Navegación' : 'Navigation'}
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-[0.875rem] text-navy/60 transition-colors duration-150 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact block */}
          <div className="flex flex-col gap-5">
            <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-navy/35">
              {locale === 'es' ? 'Contacto' : 'Contact'}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2.5 self-start bg-red px-5 font-body text-sm font-medium text-white transition-colors duration-150 hover:bg-[#9a0e1a] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              WhatsApp
            </a>

            <dl className="flex flex-col gap-3">
              <div>
                <dt className="mb-0.5 font-body text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-navy/30">
                  {locale === 'es' ? 'Teléfono' : 'Phone'}
                </dt>
                <dd>
                  <a
                    href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                    className="font-body text-[0.875rem] text-navy/60 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                  >
                    {PHONE_OFFICE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-0.5 font-body text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-navy/30">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-body text-[0.875rem] text-navy/60 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                  >
                    {EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">

          <p className="font-body text-[0.75rem] text-navy/35">
            © {year} Dr. Edwin Manuel Alvarado Arce · {t('rights')}
          </p>

          {/* Language pill toggle */}
          <div
            role="group"
            aria-label={locale === 'es' ? 'Idioma' : 'Language'}
            className="flex items-center gap-1 rounded-sm border border-navy/[0.1] p-0.5"
          >
            <span
              aria-current="true"
              className="rounded-[2px] bg-navy px-3 py-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white"
            >
              {locale === 'es' ? 'ES' : 'EN'}
            </span>
            <Link
              href={otherLocalePath}
              aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              className="rounded-[2px] px-3 py-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-navy/35 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              {otherLocale === 'es' ? 'ES' : 'EN'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
