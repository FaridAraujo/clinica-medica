import { getTranslations } from 'next-intl/server';
import MapEmbed from '@/components/ui/MapEmbed';
import { WHATSAPP_URL, PHONE_OFFICE, PHONE_MOBILE, CLINIC_ADDRESS, MAPS_EMBED_URL } from '@/lib/constants';

interface Props { params: Promise<{ locale: string }> }

export default async function ConsultorioPage({ params }: Props) {
  const { locale } = await params;

  const tC   = await getTranslations({ locale, namespace: 'consultorio' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const items    = tC.raw('items')    as { label: string; body: string }[];
  const faqItems = tFaq.raw('items') as { question: string; answer: string }[];

  return (
    <main className="pt-16">

      {/* ── Encabezado ──────────────────────────────────────────── */}
      <section className="bg-warm-white border-b border-navy/[0.07] pb-16 pt-24 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
            {tNav('consultorio')}
          </span>
          <h1
            data-reveal data-reveal-delay="0.06"
            className="mt-4 font-heading font-light leading-[1.02] text-navy"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
          >
            {tC('title')}
          </h1>
          <p data-reveal data-reveal-delay="0.12" className="mt-5 max-w-[54ch] font-body text-[1.0625rem] leading-relaxed text-navy/55">
            {locale === 'es'
              ? 'Consulta privada en Heredia, Costa Rica. Atención directa con el especialista, sin lista de espera institucional.'
              : 'Private practice in Heredia, Costa Rica. Direct access to the specialist, without institutional waiting lists.'}
          </p>
        </div>
      </section>

      {/* ── Las 4 preguntas — filas, no grid ────────────────────── */}
      <section className="bg-white">
        {items.map((item, i) => (
          <div
            key={i}
            data-reveal data-reveal-delay={String(i * 0.05)}
            className={[
              'border-b border-navy/[0.07]',
              i === 0 ? 'border-t' : '',
            ].join(' ')}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-6 sm:px-10 lg:grid-cols-[1fr_2fr] lg:px-14">
              {/* Label */}
              <div className="flex items-start border-navy/[0.07] py-10 lg:border-r lg:pr-16">
                <h2 className="font-heading text-[1.5rem] font-medium leading-tight text-navy sm:text-[1.75rem]">
                  {item.label}
                </h2>
              </div>
              {/* Body */}
              <div className="pb-10 pt-0 lg:pl-16 lg:py-10">
                <p className="font-body text-[1rem] leading-[1.85] text-navy/60">
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Mapa full-bleed + overlay ────────────────────────────── */}
      <div className="relative">

        <MapEmbed
          src={MAPS_EMBED_URL}
          title={locale === 'es' ? 'Ubicación del consultorio' : 'Office location'}

          height={520}
        />

        {/* Tarjeta de info — superpuesta sobre el mapa en desktop */}
        <div className="relative bg-navy px-6 py-10 sm:px-10 lg:absolute lg:bottom-8 lg:left-8 lg:w-80 lg:px-8 xl:left-14">
          <p className="mb-6 font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/35">
            {locale === 'es' ? 'Contacto' : 'Contact'}
          </p>

          <dl className="flex flex-col gap-5">
            <div>
              <dt className="mb-1 font-body text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/30">
                {locale === 'es' ? 'Dirección' : 'Address'}
              </dt>
              <dd className="font-body text-[0.875rem] text-white/70">
                {CLINIC_ADDRESS}
              </dd>
              {/* TODO: Confirmar dirección exacta */}
            </div>
            <div>
              <dt className="mb-1 font-body text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/30">
                {locale === 'es' ? 'Teléfonos' : 'Phone'}
              </dt>
              <dd className="flex flex-col gap-1">
                <a href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`} className="font-body text-[0.875rem] text-white/70 hover:text-white">
                  {PHONE_OFFICE} <span className="text-white/30 text-[0.7rem]">{locale === 'es' ? 'Consultorio' : 'Office'}</span>
                </a>
                <a href={`tel:+506${PHONE_MOBILE.replace(/-/g, '')}`} className="font-body text-[0.875rem] text-white/70 hover:text-white">
                  {PHONE_MOBILE} <span className="text-white/30 text-[0.7rem]">WhatsApp</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-1 font-body text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/30">
                {locale === 'es' ? 'Horario' : 'Hours'}
              </dt>
              {/* TODO: Confirmar horario */}
              <dd className="font-body text-[0.8rem] text-white/30">
                {locale === 'es' ? 'Pendiente de confirmación' : 'Pending confirmation'}
              </dd>
            </div>
          </dl>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2.5 bg-red font-body text-sm font-medium text-white transition-colors hover:bg-[#9a0e1a] active:scale-[0.97]"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {locale === 'es' ? 'Agendar por WhatsApp' : 'Book via WhatsApp'}
          </a>
        </div>
      </div>

      {/* ── Preguntas frecuentes ────────────────────────────────── */}
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
