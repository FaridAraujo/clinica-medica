'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { WHATSAPP_URL, PHONE_OFFICE, EMAIL } from '@/lib/constants';
import AesculapiusRod from '@/components/ui/AesculapiusRod';

export default function Footer() {
  const locale  = useLocale();
  const t       = useTranslations('footer');
  const tNav    = useTranslations('nav');
  const links = [
    { href: `/${locale}/consultorio`,    label: tNav('consultorio')   },
    { href: `/${locale}/doctor`,         label: tNav('sobre')         },
    { href: `/${locale}/especialidades`, label: tNav('especialidades') },
    { href: `/${locale}/contacto`,       label: tNav('contacto')      },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy/[0.07] bg-white">

      {/* ── Main bar — todo horizontal ──────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-5 sm:px-10 sm:py-6 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">

          {/* Identity */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <AesculapiusRod className="h-6 w-[11px] shrink-0 text-red" />
            <span className="font-heading text-[0.9375rem] font-medium leading-none text-navy">
              Dr. Alvarado
            </span>
          </Link>

          {/* Navigation — horizontal */}
          <nav aria-label="Mapa del sitio" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-[0.775rem] text-navy/50 transition-colors duration-150 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Contact — horizontal */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
              className="font-body text-[0.775rem] text-navy/50 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              {PHONE_OFFICE}
            </a>
            <span className="text-navy/20" aria-hidden="true">·</span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-[0.775rem] text-navy/50 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              <WhatsAppIcon className="h-2.5 w-2.5 shrink-0 text-red" aria-hidden="true" />
              WhatsApp
            </a>
            <span className="text-navy/20" aria-hidden="true">·</span>
            <a
              href={`mailto:${EMAIL}`}
              className="font-body text-[0.775rem] text-navy/50 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              {EMAIL}
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="border-t border-navy/[0.05]">
        <div className="mx-auto max-w-7xl px-6 py-3 sm:px-10 lg:px-14">
          <p className="font-body text-[0.65rem] text-navy/30">
            © {year} Dr. Edwin Manuel Alvarado Arce · {t('rights')}
          </p>
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
