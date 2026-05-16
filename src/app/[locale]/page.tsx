import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import MapEmbed from '@/components/ui/MapEmbed';
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
      <section className="bg-white py-16 sm:py-24 lg:py-32">
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
              <div className="flex flex-col gap-4 px-7 py-10 sm:px-9 sm:py-14">
                <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                  Dirección
                </p>
                <p className="font-heading text-[1.375rem] font-normal leading-[1.3] text-navy">
                  {CLINIC_ADDRESS}
                </p>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 self-start font-body text-[0.675rem] font-semibold uppercase tracking-[0.14em] text-navy/45 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  <MapPinIcon className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                  Cómo llegar
                </a>
              </div>

              {/* Teléfono consultorio */}
              <div className="flex flex-col gap-4 px-7 py-10 sm:px-9 sm:py-14">
                <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                  Teléfono consultorio
                </p>
                <a
                  href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                  className="font-body text-[2.25rem] font-medium leading-none tracking-[-0.015em] text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {PHONE_OFFICE}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col gap-4 px-7 py-10 sm:px-9 sm:py-14">
                <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                  WhatsApp
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[2.25rem] font-medium leading-none tracking-[-0.015em] text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
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
      <section className="bg-warm-white py-16 sm:py-24 lg:py-32">
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

          {/* Tres columnas: foto | bio+CTA | trayectoria */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr_1fr] lg:items-start lg:gap-16 xl:grid-cols-[340px_1fr_1fr]">

            {/* Foto — columna izquierda, proporción retrato */}
            <div data-reveal className="relative max-h-[420px] overflow-hidden lg:max-h-none" style={{ aspectRatio: '3/4' }}>
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

            {/* Trayectoria */}
            <div>
              <p className="mb-6 font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                Trayectoria
              </p>
              <ul className="flex flex-col divide-y divide-navy/[0.10]" role="list">
                {trayectoria.map((entry, i) => (
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
      <section className="bg-blue-pale py-16 sm:py-24 lg:py-32">
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
              className="inline-flex h-12 shrink-0 items-center bg-navy px-7 font-body text-sm font-medium text-white transition-colors duration-200 hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:self-end"
            >
              {tHome('especialidades.cta')}
            </Link>
          </div>

          {/* Editorial asimétrico — 3 filas con jerarquía variable */}
          <div className="flex flex-col gap-px bg-navy/[0.10]">

            {/* Fila 1 — Feature (2/3) + Card secundaria (1/3) */}
            <div className="grid grid-cols-1 gap-px sm:grid-cols-3">

              {/* Feature: Cirugía de Corazón Abierto — única card con acento rojo */}
              <article
                data-reveal
                className="relative flex flex-col gap-6 overflow-hidden bg-blue-pale px-8 py-12 sm:col-span-2 sm:px-12 sm:py-16"
              >
                {/* Anatomical heart watermark */}
                <AnatomicalHeart
                  className="pointer-events-none absolute -right-6 -bottom-6 h-auto w-[52%] max-w-[280px] text-navy/[0.05]"
                  aria-hidden="true"
                />

                <div className="h-px w-10 bg-red" aria-hidden="true" />
                <h3
                  className="font-heading font-light leading-[1.1] text-navy"
                  style={{ fontSize: 'clamp(1.875rem, 2.8vw, 2.5rem)' }}
                >
                  {especialidades[0].title}
                </h3>
                <p className="max-w-[52ch] font-body text-[1rem] leading-[1.8] text-navy/65">
                  {especialidades[0].description}
                </p>
              </article>

              {/* Card 2: Válvulas */}
              <article
                data-reveal data-reveal-delay="0.08"
                className="flex flex-col gap-5 bg-blue-pale px-8 py-10 sm:px-10 sm:py-12"
              >
                <h3 className="font-heading text-[1.375rem] font-medium leading-snug text-navy">
                  {especialidades[1].title}
                </h3>
                <p className="font-body text-[0.875rem] leading-relaxed text-navy/60">
                  {especialidades[1].description}
                </p>
              </article>
            </div>

            {/* Fila 2 — 3 cards equilibradas (Aorta, Revascularización, Cirugía General) */}
            <div className="grid grid-cols-1 gap-px sm:grid-cols-3">
              {[2, 3, 4].map((idx, i) => (
                <article
                  key={idx}
                  data-reveal
                  data-reveal-delay={String(0.05 + i * 0.05)}
                  className="flex flex-col gap-5 bg-blue-pale px-8 py-10 sm:px-10 sm:py-12"
                >
                  <h3 className="font-heading text-[1.375rem] font-medium leading-snug text-navy">
                    {especialidades[idx].title}
                  </h3>
                  <p className="font-body text-[0.875rem] leading-relaxed text-navy/60">
                    {especialidades[idx].description}
                  </p>
                </article>
              ))}
            </div>

            {/* Fila 3 — Consulta y Valoración: ancho completo, layout horizontal */}
            <article
              data-reveal data-reveal-delay="0.2"
              className="flex flex-col gap-6 bg-blue-pale px-8 py-12 sm:flex-row sm:items-start sm:gap-16 sm:px-12 sm:py-14"
            >
              <div className="flex flex-col gap-5 sm:w-[42%] sm:shrink-0">
                <h3 className="font-heading text-[1.75rem] font-medium leading-tight text-navy">
                  {especialidades[5].title}
                </h3>
              </div>
              <p className="font-body text-[0.95rem] leading-[1.85] text-navy/65 sm:flex-1 sm:pt-7">
                {especialidades[5].description}
              </p>
            </article>

          </div>
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

/**
 * Simplified anatomical heart silhouette — guiño visual en la card de
 * Cirugía de Corazón Abierto. Dibujado para leerse bien a baja opacidad.
 * Incluye silueta del corazón + aorta ascendente como forma rellena.
 */
function AnatomicalHeart({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 195" fill="currentColor" className={className} {...props}>
      {/* Cuerpo del corazón */}
      <path d="M100,170 C62,145 12,108 15,62 C18,24 46,8 68,19 C79,25 90,36 100,51 C110,36 121,25 132,19 C154,8 182,24 185,62 C188,108 138,145 100,170Z" />
      {/* Aorta ascendente — arco sobre el corazón */}
      <path d="M90,50 C86,35 80,14 72,10 C64,6 58,14 60,28 C62,38 68,44 76,46 C80,47 84,48 86,50Z" />
      {/* Arteria pulmonar — rama derecha */}
      <path d="M108,51 C112,38 118,18 126,13 C132,9 137,16 135,28 C133,37 127,43 119,47 C115,48 111,49 108,51Z" />
    </svg>
  );
}
