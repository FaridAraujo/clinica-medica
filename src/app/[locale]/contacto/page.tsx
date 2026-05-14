import { getTranslations } from 'next-intl/server';
import MapEmbed from '@/components/ui/MapEmbed';
import { WHATSAPP_URL, PHONE_OFFICE, PHONE_MOBILE, EMAIL, CLINIC_ADDRESS, MAPS_EMBED_URL } from '@/lib/constants';

interface Props { params: Promise<{ locale: string }> }

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;

  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tC   = await getTranslations({ locale, namespace: 'contacto' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });

  const faqItems = tFaq.raw('items') as { question: string; answer: string }[];

  return (
    <main className="pt-16">

      {/* ── Hero de contacto — WhatsApp protagonista ─────────────
          Fondo rojo. El canal principal ocupa toda la atención.
      ──────────────────────────────────────────────────────────── */}
      <section className="grain bg-red pb-0 pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 pb-14">
          <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/50">
            {tNav('contacto')}
          </span>
          <h1
            data-reveal data-reveal-delay="0.07"
            className="mt-5 font-heading font-light leading-[1.02] text-white"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)' }}
          >
            {tC('title')}
          </h1>
          <p data-reveal data-reveal-delay="0.12" className="mt-5 max-w-[48ch] font-body text-[1.0625rem] leading-relaxed text-white/65">
            {tC('subtitle')}
          </p>

          <a
            data-reveal data-reveal-delay="0.18"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex h-[3.5rem] items-center gap-3 bg-white px-9 font-body text-sm font-semibold text-red transition-colors duration-150 hover:bg-white/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {tC('whatsapp')}
          </a>
        </div>

        {/* Franja de número — base del hero rojo */}
        <div className="border-t border-white/[0.15] bg-[#a50e1a]">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6 sm:flex-row sm:items-center sm:gap-10 sm:px-10 lg:px-14">
            <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              WhatsApp
            </span>
            <a
              href={`tel:+506${PHONE_MOBILE.replace(/-/g, '')}`}
              className="font-heading text-[1.75rem] font-medium leading-none text-white/90 transition-colors hover:text-white sm:text-[2rem]"
            >
              {PHONE_MOBILE}
            </a>
          </div>
        </div>
      </section>

      {/* ── Otros canales ────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          <div className="grid grid-cols-1 gap-px bg-navy/[0.07] sm:grid-cols-3">

            {/* Teléfono consultorio */}
            <div data-reveal className="flex flex-col gap-4 bg-white p-8 sm:p-10 lg:p-12">
              <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-navy/35">
                {locale === 'es' ? 'Teléfono' : 'Phone'}
              </p>
              <a
                href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                className="font-heading text-[2rem] font-medium leading-none text-navy transition-colors hover:text-blue"
              >
                {PHONE_OFFICE}
              </a>
              <p className="font-body text-[0.825rem] text-navy/50">
                {locale === 'es' ? 'Línea directa del consultorio en Heredia.' : 'Direct office line in Heredia.'}
              </p>
              <a
                href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                className="mt-auto inline-flex h-11 items-center gap-2 self-start border border-navy/20 px-6 font-body text-sm font-medium text-navy/70 transition-colors hover:border-navy/40 hover:text-navy"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {locale === 'es' ? 'Llamar' : 'Call'}
              </a>
            </div>

            {/* Email */}
            <div data-reveal data-reveal-delay="0.08" className="flex flex-col gap-4 bg-white p-8 sm:p-10 lg:p-12">
              <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-navy/35">
                Email
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all font-body text-[1.125rem] font-medium text-navy transition-colors hover:text-blue"
              >
                {EMAIL}
              </a>
              <p className="font-body text-[0.825rem] text-navy/50">
                {locale === 'es' ? 'Respuesta en horario de atención.' : 'Response during office hours.'}
              </p>
            </div>

            {/* Dirección + horario */}
            <div data-reveal data-reveal-delay="0.16" className="flex flex-col gap-5 bg-white p-8 sm:p-10 lg:p-12">
              <div className="flex flex-col gap-1.5">
                <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-navy/35">
                  {locale === 'es' ? 'Dirección' : 'Address'}
                </p>
                <p className="font-body text-[0.9rem] leading-relaxed text-navy/70">
                  {CLINIC_ADDRESS}
                </p>
                {/* TODO: Confirmar dirección exacta */}
              </div>
              <div className="flex flex-col gap-1.5 border-t border-navy/[0.07] pt-4">
                <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-navy/35">
                  {locale === 'es' ? 'Horario' : 'Hours'}
                </p>
                {/* TODO: Confirmar horario */}
                <p className="font-body text-[0.8rem] text-navy/35">
                  {locale === 'es' ? 'Pendiente de confirmación' : 'Pending confirmation'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mapa full-bleed ──────────────────────────────────────── */}
      <MapEmbed
        src={MAPS_EMBED_URL}
        title={locale === 'es' ? 'Ubicación del consultorio en Heredia' : 'Office location in Heredia'}

        height={480}
      />

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-14">

          <div className="mb-12 flex flex-col gap-3">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              {tFaq('sectionLabel')}
            </span>
            <h2
              data-reveal data-reveal-delay="0.06"
              className="font-heading font-light leading-[1.05] text-navy"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
            >
              {tFaq('title')}
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-navy/[0.08]">
            {faqItems.map((item, i) => (
              <details key={i} data-reveal data-reveal-delay={String(i * 0.06)} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-body text-[0.95rem] font-medium text-navy">
                  {item.question}
                  <span aria-hidden="true" className="mt-0.5 shrink-0 font-light text-navy/30 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 font-body text-[0.9rem] leading-[1.8] text-navy/60">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
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
