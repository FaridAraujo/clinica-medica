import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MapEmbed from '@/components/ui/MapEmbed';
import AvailabilityBadge from '@/components/ui/AvailabilityBadge';
import {
  PHONE_OFFICE,
  PHONE_MOBILE,
  CLINIC_ADDRESS,
  MAPS_EMBED_URL,
  WHATSAPP_URL,
  MAPS_DIRECTIONS_URL,
} from '@/lib/constants';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'El Consultorio — Dr. Edwin Alvarado | Heredia, Costa Rica',
    description:
      'Consulta privada de cirugía cardiovascular y general en Heredia, Costa Rica. Atención directa con el especialista, sin intermediarios ni listas de espera institucionales.',
  };
}

export default async function ConsultorioPage({ params }: Props) {
  const { locale } = await params;

  const tC   = await getTranslations({ locale, namespace: 'consultorio' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const items    = tC.raw('items')    as { label: string; body: string }[];
  const faqItems = tFaq.raw('items')  as { question: string; answer: string }[];

  // Las respuestas marcadas como "TODO:" en el JSON son placeholders —
  // se renderizan con un texto genérico hasta que se confirmen.
  const isPlaceholder = (answer: string) => answer.startsWith('TODO:');
  const placeholderText =
    'Estamos confirmando estos detalles. Para información actualizada, escríbanos por WhatsApp o llame al consultorio.';

  return (
    <main className="pt-16">

      {/* ══════════════════════════════════════════════════════════════
          1. HEADER — navy oscuro: página de lugar, no de información
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-navy pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              {tNav('consultorio')}
            </span>
            <h1
              data-reveal data-reveal-delay="0.06"
              className="mt-5 font-heading font-light leading-[1.04] text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {tC('title')}
            </h1>
            <div data-reveal data-reveal-delay="0.11" className="mt-7 h-[2px] w-14 bg-red" aria-hidden="true" />
            <p data-reveal data-reveal-delay="0.15" className="mt-7 max-w-[55ch] font-body text-[1.0625rem] leading-[1.85] text-white/55">
              Atención privada en Heredia, Costa Rica. Directo con el especialista, sin intermediarios ni listas de espera institucionales.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. LO QUE OFRECEMOS — las 4 preguntas en formato editorial
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          <div className="mb-14 flex flex-col gap-4">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              Sobre el consultorio
            </span>
            <h2
              data-reveal data-reveal-delay="0.06"
              className="font-heading font-light leading-[1.05] text-navy"
              style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}
            >
              Lo que ofrecemos
            </h2>
          </div>

          {/* Lista editorial de preguntas */}
          <div className="flex flex-col">
            {items.map((item, i) => (
              <article
                key={i}
                data-reveal
                data-reveal-delay={String(0.04 * i)}
                className="grid grid-cols-1 gap-6 border-t border-navy/[0.08] py-10 sm:gap-7 sm:py-12 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:py-14"
              >
                {/* Pregunta */}
                <div className="flex flex-col gap-5">
                  <div className="h-px w-7 bg-red" aria-hidden="true" />
                  <h3 className="font-heading text-[1.625rem] font-medium leading-snug text-navy sm:text-[1.875rem]">
                    {item.label}
                  </h3>
                </div>

                {/* Respuesta */}
                <div className="flex flex-col justify-center lg:pt-2">
                  <p className="max-w-[58ch] font-body text-[1.0625rem] leading-[1.95] text-navy/65">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
            <div className="border-t border-navy/[0.08]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. UBICACIÓN — mapa cinemático + franja editorial
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          <div className="mb-12 flex flex-col gap-4">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              Ubicación
            </span>
            <h2
              data-reveal data-reveal-delay="0.06"
              className="font-heading font-light leading-[1.05] text-navy"
              style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}
            >
              Cómo encontrarnos
            </h2>
          </div>

          <div data-reveal data-reveal-delay="0.1" className="flex flex-col">

            {/* Mapa */}
            <div className="border border-navy/[0.08]">
              <MapEmbed
                src={MAPS_EMBED_URL}
                title="Ubicación del consultorio"
                aspectRatio="16/9"
              />
            </div>

            {/* Franja informativa: 4 columnas */}
            <div className="grid grid-cols-1 border-x border-b border-navy/[0.08] divide-y divide-navy/[0.08] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">

              {/* Dirección — fila 1 sm */}
              <div className="flex flex-col gap-4 px-7 py-10 sm:px-8 sm:py-12 sm:border-b sm:border-b-navy/[0.08] lg:border-b-0">
                <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                  Dirección
                </p>
                <p className="font-heading text-[1.125rem] font-normal leading-snug text-navy">
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

              {/* Teléfono consultorio — fila 1 sm */}
              <div className="flex flex-col gap-4 px-7 py-10 sm:px-8 sm:py-12 sm:border-b sm:border-b-navy/[0.08] lg:border-b-0">
                <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                  Teléfono
                </p>
                <a
                  href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                  className="font-body text-[1.75rem] font-medium leading-none tracking-[-0.015em] text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {PHONE_OFFICE}
                </a>
              </div>

              {/* WhatsApp — fila 2 sm */}
              <div className="flex flex-col gap-4 px-7 py-10 sm:px-8 sm:py-12">
                <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                  WhatsApp
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[1.75rem] font-medium leading-none tracking-[-0.015em] text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {PHONE_MOBILE}
                </a>
              </div>

              {/* Horario */}
              <div className="flex flex-col gap-4 px-7 py-10 sm:px-8 sm:py-12">
                <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                  Horario
                </p>
                <AvailabilityBadge />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. PREGUNTAS FRECUENTES — accordion editorial
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-14">

          <div className="mb-14 flex flex-col gap-4">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              {tFaq('sectionLabel')}
            </span>
            <h2
              data-reveal data-reveal-delay="0.06"
              className="font-heading font-light leading-[1.05] text-navy"
              style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}
            >
              {tFaq('title')}
            </h2>
          </div>

          <div className="flex flex-col">
            {faqItems.map((item, i) => {
              const pending = isPlaceholder(item.answer);
              return (
                <details
                  key={i}
                  data-reveal
                  data-reveal-delay={String(0.04 * i)}
                  className="group border-t border-navy/[0.08] py-7 last:border-b last:border-b-navy/[0.08]"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <span className="font-heading text-[1.125rem] font-medium leading-snug text-navy sm:text-[1.25rem]">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1.5 shrink-0 font-light text-[1.25rem] leading-none text-navy/30 transition-transform duration-200 ease-out group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <div className="mt-5">
                    {pending ? (
                      <p className="max-w-[60ch] font-body text-[0.95rem] leading-[1.85] italic text-navy/40">
                        {placeholderText}
                      </p>
                    ) : (
                      <p className="max-w-[60ch] font-body text-[0.95rem] leading-[1.85] text-navy/65">
                        {item.answer}
                      </p>
                    )}
                  </div>
                </details>
              );
            })}
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
