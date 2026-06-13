import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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

  const items    = tC.raw('items')   as { label: string; body: string }[];
  const faqItems = tFaq.raw('items') as { question: string; answer: string }[];

  const isPlaceholder = (answer: string) => answer.startsWith('TODO:');
  const placeholderText =
    'Estamos confirmando estos detalles. Para información actualizada, escríbanos por WhatsApp o llame al consultorio.';

  return (
    <main className="bg-navy pt-16">

      {/* ── 1. HEADER ────────────────────────────────────────────────── */}
      <section className="px-6 pb-12 pt-14 sm:px-10 sm:pt-20 sm:pb-16 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/30">
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
          <p data-reveal data-reveal-delay="0.15" className="mt-7 max-w-[52ch] font-body text-[1.0625rem] leading-[1.85] text-white/45">
            Atención privada en Heredia, Costa Rica. Directo con el especialista,
            sin intermediarios ni listas de espera institucionales.
          </p>
        </div>
      </section>

      {/* ── 2. MAPA + CONTACTO ───────────────────────────────────────── */}
      {/* Mapa full-bleed como protagonista visual, con filtro oscuro.   */}
      {/* Panel de contacto flotante sobre el mapa en desktop.           */}
      <section className="relative" data-reveal>

        {/* Mapa */}
        <div className="relative h-[55vh] min-h-[340px] sm:h-[65vh] lg:h-[72vh]">
          {/* Iframe directo — filtro CSS para dar tono navy al mapa */}
          <iframe
            src={MAPS_EMBED_URL}
            title="Ubicación del consultorio"
            className="absolute inset-0 h-full w-full [filter:invert(1)_hue-rotate(180deg)_brightness(0.85)_contrast(0.9)_saturate(0.6)]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Viñeta superior — funde con el header navy */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-navy to-transparent" aria-hidden="true" />

          {/* Panel de contacto — flotante sobre el mapa en desktop,
              debajo del mapa en mobile */}
          <div className="absolute bottom-0 left-0 right-0 lg:bottom-8 lg:left-8 lg:right-auto lg:w-80 xl:w-96">
            <div className="border-t border-white/[0.1] bg-navy/95 px-7 py-7 backdrop-blur-sm lg:border lg:border-white/[0.08]">

              {/* Dirección */}
              <div className="mb-6 flex flex-col gap-2">
                <p className="font-body text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-white/30">
                  Dirección
                </p>
                <p className="font-body text-[0.9375rem] leading-snug text-white/80">
                  {CLINIC_ADDRESS}
                </p>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 self-start font-body text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-white/35 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <MapPinIcon className="h-3 w-3 shrink-0" aria-hidden="true" />
                  Cómo llegar
                </a>
              </div>

              <div className="h-px bg-white/[0.08]" aria-hidden="true" />

              {/* Teléfonos */}
              <div className="mt-6 grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <p className="font-body text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-white/30">
                    Teléfono
                  </p>
                  <a
                    href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                    className="font-body text-[1.25rem] font-medium leading-none tracking-tight text-white transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    {PHONE_OFFICE}
                  </a>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-body text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-white/30">
                    WhatsApp
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[1.25rem] font-medium leading-none tracking-tight text-white transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    {PHONE_MOBILE}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. LO QUE OFRECEMOS ──────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] px-6 py-16 sm:px-10 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 flex flex-col gap-4">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/30">
              Sobre el consultorio
            </span>
            <h2
              data-reveal data-reveal-delay="0.06"
              className="font-heading font-light leading-[1.05] text-white"
              style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}
            >
              Lo que ofrecemos
            </h2>
          </div>

          <div className="flex flex-col">
            {items.map((item, i) => (
              <article
                key={i}
                data-reveal
                data-reveal-delay={String(0.04 * i)}
                className="grid grid-cols-1 gap-6 border-t border-white/[0.07] py-8 sm:gap-8 sm:py-11 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:py-14"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-[1.625rem] font-light leading-snug text-white sm:text-[1.875rem]">
                    {item.label}
                  </h3>
                </div>

                <div className="flex flex-col justify-center lg:pt-2">
                  <p className="max-w-[58ch] font-body text-[1.0625rem] leading-[1.95] text-white/45">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
            <div className="border-t border-white/[0.07]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── 4. FAQ ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] px-6 py-16 sm:px-10 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-4xl">

          <div className="mb-12 flex flex-col gap-4">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/30">
              {tFaq('sectionLabel')}
            </span>
            <h2
              data-reveal data-reveal-delay="0.06"
              className="font-heading font-light leading-[1.05] text-white"
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
                  className="group border-t border-white/[0.07] py-6 last:border-b last:border-b-white/[0.07]"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <span className="font-heading text-[1.125rem] font-light leading-snug text-white sm:text-[1.25rem]">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 font-light text-[1.25rem] leading-none text-white/25 transition-transform duration-200 ease-out group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <div className="mt-5">
                    <p className={[
                      'max-w-[60ch] font-body text-[0.95rem] leading-[1.85]',
                      pending ? 'italic text-white/25' : 'text-white/45',
                    ].join(' ')}>
                      {pending ? placeholderText : item.answer}
                    </p>
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
