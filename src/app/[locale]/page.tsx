import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import MapEmbed from '@/components/ui/MapEmbed';
import { WHATSAPP_URL, PHONE_OFFICE, PHONE_MOBILE, EMAIL, CLINIC_ADDRESS, MAPS_EMBED_URL } from '@/lib/constants';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tNav  = await getTranslations({ locale, namespace: 'nav' });
  const tC    = await getTranslations({ locale, namespace: 'consultorio' });
  const tS    = await getTranslations({ locale, namespace: 'sobre' });
  const tE    = await getTranslations({ locale, namespace: 'especialidades' });
  const tT    = await getTranslations({ locale, namespace: 'trayectoria' });

  const sobreFirstPara = tS('body').split('\n\n')[0];
  const trayectoria    = tT.raw('entries') as {
    year: string; title: string; institution: string; description: string;
  }[];
  const especialidades = tE.raw('items') as { title: string; description: string }[];

  return (
    <main>
      <Hero />

      {/* ══════════════════════════════════════════════════════════════
          1. EL CONSULTORIO — Ubicación y mapa
          Encabezado arriba, mapa + info de contacto abajo.
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          {/* Section header */}
          <div className="mb-12 flex flex-col gap-4">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              {tNav('consultorio')}
            </span>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h2
                data-reveal data-reveal-delay="0.05"
                className="font-heading font-light leading-[1.05] text-navy"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}
              >
                {tC('title')}
              </h2>
              <Link
                href={`/${locale}/consultorio`}
                className="inline-flex h-12 shrink-0 items-center gap-2 self-start bg-navy px-7 font-body text-sm font-medium text-white transition-colors duration-150 hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:self-auto"
              >
                {tHome('consultorio.cta')}
                <span aria-hidden="true" className="ml-0.5">→</span>
              </Link>
            </div>
          </div>

          {/* Map + info */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">

            <div className="border border-navy/[0.08]">
              <MapEmbed
                src={MAPS_EMBED_URL}
                title={locale === 'es' ? 'Ubicación del consultorio' : 'Office location'}

                aspectRatio="16/9"
              />
            </div>

            {/* Info sidebar — tarjeta navy */}
            <div className="flex flex-col bg-navy px-8 py-10 gap-10">

              {/* Consultorio phone */}
              <div className="flex flex-col gap-2">
                <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/30">
                  {locale === 'es' ? 'Teléfono consultorio' : 'Office phone'}
                </p>
                <a
                  href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                  className="font-body text-[2rem] font-medium leading-none tracking-[-0.01em] text-white transition-colors hover:text-blue-light"
                >
                  {PHONE_OFFICE}
                </a>
              </div>

              {/* WhatsApp phone */}
              <div className="flex flex-col gap-2 border-t border-white/[0.08] pt-10">
                <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/30">
                  WhatsApp
                </p>
                <a
                  href={`tel:+506${PHONE_MOBILE.replace(/-/g, '')}`}
                  className="font-body text-[2rem] font-medium leading-none tracking-[-0.01em] text-white transition-colors hover:text-blue-light"
                >
                  {PHONE_MOBILE}
                </a>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2 border-t border-white/[0.08] pt-10 mt-auto">
                <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/30">
                  {locale === 'es' ? 'Dirección' : 'Address'}
                </p>
                <p className="font-body text-[0.875rem] leading-relaxed text-white/65">
                  {CLINIC_ADDRESS}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. SOBRE EL DOCTOR
          Sección label + heading, luego foto placeholder de quirófano,
          luego bio + trayectoria en dos columnas.
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-warm-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          {/* Section header */}
          <div className="mb-10 flex flex-col gap-4">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              {tNav('sobre')}
            </span>
            <h2
              data-reveal data-reveal-delay="0.05"
              className="font-heading font-light leading-[1.05] text-navy"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.25rem)' }}
            >
              {tS('title')}
            </h2>
          </div>

          {/* Foto del Dr. Alvarado */}
          <div data-reveal className="relative mb-14 overflow-hidden" style={{ aspectRatio: '21/8' }}>
            <Image
              src="/images/donManuel.png"
              alt="Dr. Edwin Manuel Alvarado Arce"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          {/* Two-column split: bio + CTA | trayectoria */}
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">

            {/* Bio + CTA */}
            <div className="flex flex-col gap-8">
              <p data-reveal className="font-body text-[1rem] leading-[1.85] text-navy/65">
                {sobreFirstPara}
              </p>
              <Link
                href={`/${locale}/doctor`}
                className="inline-flex h-12 items-center gap-2 self-start bg-navy px-7 font-body text-sm font-medium text-white transition-colors duration-150 hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
              >
                {tHome('doctor.cta')}
                <span aria-hidden="true" className="ml-0.5">→</span>
              </Link>
            </div>

            {/* Trayectoria */}
            <div>
              <p className="mb-6 font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                {locale === 'es' ? 'Trayectoria' : 'Career'}
              </p>
              <ul className="flex flex-col divide-y divide-navy/[0.10]" role="list">
                {trayectoria.slice(0, 4).map((entry, i) => (
                  <li key={i} className="flex flex-col gap-1 py-5">
                    <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-navy/40">
                      {entry.year}
                    </span>
                    <span className="font-body text-[0.9rem] font-semibold leading-snug text-navy">
                      {entry.title}
                    </span>
                    <span className="font-body text-[0.8rem] text-navy/55">
                      {entry.institution}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. ESPECIALIDADES
          Header: title left, solid button right.
          Grid: 3×2 cells separated by hairline dividers.
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-blue-pale py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          {/* Header */}
          <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4">
              <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                {tNav('especialidades')}
              </span>
              <h2
                data-reveal data-reveal-delay="0.05"
                className="font-heading font-light leading-[1.05] text-navy"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}
              >
                {tE('title')}
              </h2>
            </div>
            <Link
              href={`/${locale}/especialidades`}
              className="inline-flex h-12 shrink-0 items-center gap-2 bg-navy px-7 font-body text-sm font-medium text-white transition-colors duration-150 hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:self-end"
            >
              {tHome('especialidades.cta')}
              <span aria-hidden="true" className="ml-0.5">→</span>
            </Link>
          </div>

          {/* 3×2 grid */}
          <div className="grid grid-cols-1 gap-px bg-navy/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {especialidades.map((item, i) => (
              <div key={i} data-reveal data-reveal-delay={String(i * 0.07)} className="flex flex-col gap-3 bg-blue-pale px-6 py-8 sm:px-8">
                <h3 className="font-heading text-[1.2rem] font-medium leading-snug text-navy">
                  {item.title}
                </h3>
                <p className="font-body text-[0.875rem] leading-relaxed text-navy/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. CTA FINAL
      ══════════════════════════════════════════════════════════════ */}
      <section className="grain bg-navy py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">

          <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/30">
            {tNav('contacto')}
          </span>

          <h2
            data-reveal data-reveal-delay="0.07"
            className="mt-5 font-heading font-light leading-[1.05] text-white"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}
          >
            {tHome('cta.title')}
          </h2>

          <p data-reveal data-reveal-delay="0.12" className="mx-auto mt-6 max-w-[44ch] font-body text-[1rem] leading-[1.8] text-white/50">
            {tHome('cta.body')}
          </p>

          <div data-reveal data-reveal-delay="0.18" className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2.5 bg-red px-8 font-body text-sm font-medium text-white transition-colors duration-150 hover:bg-[#9a0e1a] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:w-auto"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem] shrink-0" aria-hidden="true" />
              {tHome('cta.whatsapp')}
            </a>

            <a
              href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
              className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2 border border-white/20 px-8 font-body text-sm font-medium text-white/70 transition-colors duration-150 hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:w-auto"
            >
              <PhoneIcon className="h-[1rem] w-[1rem] shrink-0" aria-hidden="true" />
              {PHONE_OFFICE}
            </a>
          </div>

          <p className="mt-8 font-body text-[0.8rem] text-white/30">
            {locale === 'es' ? 'o escríbanos a ' : 'or email us at '}
            <a
              href={`mailto:${EMAIL}`}
              className="text-white/50 underline underline-offset-4 transition-colors hover:text-white/80"
            >
              {EMAIL}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92l-.08 2z" />
    </svg>
  );
}
