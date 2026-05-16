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
    <footer className="bg-white border-t border-navy/[0.07]">

      {/* ── Main body ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-[1.6fr_1fr_1.1fr] sm:gap-12 sm:items-start">

          {/* Identity */}
          <Link
            href={`/${locale}`}
            className="flex items-start gap-3.5 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <AesculapiusRod className="h-9 w-[15px] shrink-0 text-red" />
            <span className="flex flex-col gap-1.5 pt-[3px]">
              <span className="font-heading text-[1.125rem] font-medium leading-[1.15] text-navy">
                Dr. Edwin Manuel Alvarado Arce
              </span>
              <span className="font-body text-[0.575rem] font-semibold uppercase tracking-[0.2em] text-navy/35">
                {t('location')}
              </span>
            </span>
          </Link>

          {/* Navigation — sin header, los links hablan por sí solos */}
          <nav aria-label="Mapa del sitio" className="flex flex-col gap-2.5">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="w-fit font-body text-[0.825rem] text-navy/55 transition-colors duration-150 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Contact — links inline, sin botón grande de WhatsApp */}
          <div className="flex flex-col gap-2.5">
            <a
              href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
              className="w-fit font-body text-[0.825rem] text-navy/55 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              T. {PHONE_OFFICE}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 font-body text-[0.825rem] text-navy/55 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              <WhatsAppIcon className="h-3 w-3 shrink-0 text-red" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="w-fit font-body text-[0.825rem] text-navy/55 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              {EMAIL}
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="border-t border-navy/[0.06]">
        <div className="mx-auto flex max-w-7xl px-6 py-4 sm:px-10 lg:px-14">
          <p className="font-body text-[0.7rem] text-navy/35">
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
