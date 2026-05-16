import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import MapEmbed from '@/components/ui/MapEmbed';
import { AccordionList } from '@/components/ui/AccordionList';
import { PHONE_OFFICE, PHONE_MOBILE, CLINIC_ADDRESS, MAPS_EMBED_URL, WHATSAPP_URL, MAPS_DIRECTIONS_URL } from '@/lib/constants';
import { buildHomeJsonLd } from '@/lib/jsonLd';

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
      {/* JSON-LD structured data — Physician + MedicalBusiness para SEO local */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd()) }}
      />

      <Hero />

      {/* ══════════════════════════════════════════════════════════════
          1. EL CONSULTORIO — Ubicación y mapa
          Encabezado arriba, mapa + info de contacto abajo.
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          {/* Section header */}
          <div className="mb-8 flex flex-col gap-4">
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
                className="inline-flex h-12 shrink-0 items-center self-start bg-navy px-7 font-body text-sm font-medium text-white transition-colors duration-200 hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:self-auto"
              >
                {tHome('consultorio.cta')}
              </Link>
            </div>
          </div>

          {/* Mapa + franja editorial */}
          <div data-reveal data-reveal-delay="0.1" className="flex flex-col">

            {/* Mapa — formato cinemático */}
            <div className="border border-navy/[0.08]">
              <MapEmbed
                src={MAPS_EMBED_URL}
                title="Ubicación del consultorio"
                aspectRatio="16/9"
              />
            </div>

            {/* Franja informativa: dirección + teléfonos */}
            <div className="grid grid-cols-1 border-x border-b border-navy/[0.08] divide-y divide-navy/[0.08] sm:grid-cols-3 sm:divide-y-0 sm:divide-x">

              {/* Dirección */}
              <div className="flex flex-col gap-2.5 px-6 py-5 sm:px-7 sm:py-6">
                <p className="font-body text-[0.575rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                  Dirección
                </p>
                <p className="font-body text-[0.875rem] leading-snug text-navy/80">
                  {CLINIC_ADDRESS}
                </p>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 self-start font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-navy/40 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  <MapPinIcon className="h-3 w-3 shrink-0 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                  Cómo llegar
                </a>
              </div>

              {/* Teléfono consultorio */}
              <div className="flex flex-col gap-2.5 px-6 py-5 sm:px-7 sm:py-6">
                <p className="font-body text-[0.575rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                  Teléfono consultorio
                </p>
                <a
                  href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                  className="font-body text-[1.125rem] font-medium leading-none tracking-[-0.01em] text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {PHONE_OFFICE}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col gap-2.5 px-6 py-5 sm:px-7 sm:py-6">
                <p className="font-body text-[0.575rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                  WhatsApp
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[1.125rem] font-medium leading-none tracking-[-0.01em] text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {PHONE_MOBILE}
                </a>
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
      <section className="bg-warm-white py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          {/* Section header — centrado */}
          <div className="mb-7 flex flex-col items-center gap-4 text-center">
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

          {/* Tres columnas: foto | bio+CTA | trayectoria */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr_1fr] lg:items-start lg:gap-16 xl:grid-cols-[340px_1fr_1fr]">

            {/* Foto — centrada en mobile, columna izquierda en desktop */}
            <div data-reveal className="relative mx-auto w-full max-w-[260px] overflow-hidden sm:max-w-[300px] lg:max-w-none" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/Edwin-Alvaradoo.png"
                alt="Dr. Edwin Manuel Alvarado Arce"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 340px"
              />
            </div>

            {/* Bio + CTA */}
            <div className="flex flex-col gap-8">
              <p data-reveal className="font-body text-[1rem] leading-[1.85] text-navy/65">
                {sobreFirstPara}
              </p>
              <Link
                href={`/${locale}/doctor`}
                className="inline-flex h-12 items-center self-start bg-navy px-7 font-body text-sm font-medium text-white transition-colors duration-200 hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
              >
                {tHome('doctor.cta')}
              </Link>
            </div>

            {/* Trayectoria — accordion */}
            <div>
              <p className="mb-4 font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                Trayectoria
              </p>
              <AccordionList
                items={trayectoria.map(entry => ({
                  heading: (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body text-[0.575rem] font-semibold uppercase tracking-[0.14em] text-navy/40">
                        {entry.year}
                      </span>
                      <span className="font-body text-[0.9rem] font-semibold leading-snug text-navy">
                        {entry.title}
                      </span>
                    </div>
                  ),
                  body: (
                    <div className="flex flex-col gap-1.5">
                      <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-navy/45">
                        {entry.institution}
                      </span>
                      <p className="max-w-[42ch] font-body text-[0.875rem] leading-relaxed text-navy/60">
                        {entry.description}
                      </p>
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. ESPECIALIDADES
          Header: title left, solid button right.
          Grid: 3×2 cells separated by hairline dividers.
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-blue-pale py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
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
              className="inline-flex h-12 shrink-0 items-center bg-navy px-7 font-body text-sm font-medium text-white transition-colors duration-200 hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:self-end"
            >
              {tHome('especialidades.cta')}
            </Link>
          </div>

          {/* Accordion de especialidades */}
          <AccordionList
            items={especialidades.map((item, i) => ({
              heading: (
                <div className="flex items-center gap-4">
                  <div className="h-px w-5 shrink-0 bg-red" aria-hidden="true" />
                  <h3 className="font-heading font-light leading-snug text-navy" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)' }}>
                    {item.title}
                  </h3>
                </div>
              ),
              body: (
                <p className="max-w-[58ch] font-body text-[0.9375rem] leading-[1.9] text-navy/65 pl-9">
                  {item.description}
                </p>
              ),
            }))}
          />
        </div>
      </section>

    </main>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

