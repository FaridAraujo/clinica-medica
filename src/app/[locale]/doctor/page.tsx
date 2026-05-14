import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { WHATSAPP_URL } from '@/lib/constants';

interface Props { params: Promise<{ locale: string }> }

export default async function DoctorPage({ params }: Props) {
  const { locale } = await params;

  const tS   = await getTranslations({ locale, namespace: 'sobre' });
  const tT   = await getTranslations({ locale, namespace: 'trayectoria' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const paragraphs  = tS('body').split('\n\n');
  const trayectoria = tT.raw('entries') as {
    year: string; title: string; institution: string; description: string;
  }[];
  const credentials = [
    tS('credentials.cardiovascular'),
    tS('credentials.general'),
    tS('credentials.hospital'),
    tS('credentials.ucr'),
    tS('credentials.ucimed'),
    tS('credentials.experience'),
  ];

  const stats = [
    { value: '+40', label: locale === 'es' ? 'años de experiencia' : 'years of experience' },
    { value: 'Madrid', label: locale === 'es' ? 'Formación en España' : 'Trained in Spain' },
    { value: 'CCSS', label: locale === 'es' ? 'Ex Jefe — Hospital México' : 'Former Chief — Hospital México' },
    { value: 'UCR', label: locale === 'es' ? 'Profesor universitario' : 'University professor' },
  ];

  return (
    <main className="pt-16">

      {/* ── Encabezado — fondo navy, tipo grande ────────────────── */}
      <section className="grain bg-navy pb-0 pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20">
          <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/30">
            {tNav('sobre')}
          </span>
          <h1
            data-reveal data-reveal-delay="0.07"
            className="mt-5 font-heading font-light leading-[1.02] text-white"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)' }}
          >
            Dr. Edwin Manuel<br />Alvarado Arce
          </h1>
          <p data-reveal data-reveal-delay="0.13" className="mt-4 font-body text-[0.85rem] font-medium uppercase tracking-[0.18em] text-white/35">
            {locale === 'es'
              ? 'Cirujano Cardiovascular y General · Heredia, Costa Rica'
              : 'Cardiovascular & General Surgeon · Heredia, Costa Rica'}
          </p>
        </div>

        {/* Franja de stats — separada del encabezado por un borde */}
        <div className="border-t border-white/[0.08]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
            <dl className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
              {stats.map(({ value, label }, i) => (
                <div key={i} data-reveal data-reveal-delay={String(i * 0.08)} className="flex flex-col gap-1.5 bg-navy px-4 py-6 sm:px-6">
                  <dt className="font-heading text-[1.625rem] font-medium leading-none text-white sm:text-[2rem]">
                    {value}
                  </dt>
                  <dd className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/35">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Foto full-width ─────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '21/8' }}>
        <Image
          src="/images/donManuel.png"
          alt="Dr. Edwin Manuel Alvarado Arce"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Biografía + credenciales ────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">

            {/* Párrafos */}
            <div className="flex flex-col gap-6">
              <h2
                data-reveal
                className="font-heading font-light leading-[1.05] text-navy"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
              >
                {tS('title')}
              </h2>
              {paragraphs.map((p, i) => (
                <p key={i} data-reveal data-reveal-delay={String(0.06 + i * 0.04)} className="font-body text-[1rem] leading-[1.9] text-navy/65">
                  {p}
                </p>
              ))}
            </div>

            {/* Credenciales — panel oscuro */}
            <div data-reveal data-reveal-delay="0.1" className="bg-warm-white p-8 sm:p-10 lg:self-start lg:p-10">
              <p className="mb-7 font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                {locale === 'es' ? 'Credenciales' : 'Credentials'}
              </p>
              <ul className="flex flex-col divide-y divide-navy/[0.08]" role="list">
                {credentials.map((cred, i) => (
                  <li key={i} className="py-4 font-body text-[0.875rem] leading-snug text-navy/70">
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trayectoria — timeline vertical ────────────────────── */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-14">

          <div className="mb-14 flex flex-col gap-3">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              {tT('sectionLabel')}
            </span>
            <h2
              data-reveal data-reveal-delay="0.06"
              className="font-heading font-light leading-[1.05] text-navy"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
            >
              {tT('title')}
            </h2>
          </div>

          {/* Timeline */}
          <div>
            {trayectoria.map((entry, i) => (
              <div key={i} data-reveal data-reveal-delay={String(i * 0.06)} className="grid grid-cols-[72px_1px_1fr] sm:grid-cols-[100px_1px_1fr]">

                {/* Año — columna izquierda */}
                <div className="flex flex-col items-end pr-6 pt-1">
                  <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-navy/35 text-right leading-tight">
                    {entry.year}
                  </span>
                </div>

                {/* Línea + punto */}
                <div className="relative flex flex-col items-center">
                  <div className="mt-[5px] h-2.5 w-2.5 shrink-0 rounded-full bg-red ring-4 ring-warm-white" />
                  {i < trayectoria.length - 1 && (
                    <div className="flex-1 w-px bg-navy/[0.12]" />
                  )}
                </div>

                {/* Contenido — columna derecha */}
                <div className={`pb-12 pl-6 ${i === trayectoria.length - 1 ? 'pb-0' : ''}`}>
                  <h3 className="font-heading text-[1.2rem] font-medium leading-snug text-navy">
                    {entry.title}
                  </h3>
                  <p className="mt-1 font-body text-[0.8rem] text-navy/50">
                    {entry.institution}
                  </p>
                  <p className="mt-3 font-body text-[0.875rem] leading-relaxed text-navy/60">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="grain bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-10">
          <h2
            data-reveal
            className="font-heading font-light leading-[1.05] text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            {locale === 'es' ? 'Agende su consulta' : 'Book your consultation'}
          </h2>
          <p data-reveal data-reveal-delay="0.08" className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/50">
            {locale === 'es'
              ? 'Más de 40 años de experiencia a su disposición. Contáctenos directamente para coordinar.'
              : 'Over 40 years of expertise at your service. Contact us directly to schedule.'}
          </p>
          <div data-reveal data-reveal-delay="0.14" className="mt-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[3.25rem] items-center gap-2.5 bg-red px-10 font-body text-sm font-medium text-white transition-colors hover:bg-[#9a0e1a] active:scale-[0.97]"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem] shrink-0" aria-hidden="true" />
              {locale === 'es' ? 'Escribir por WhatsApp' : 'Message on WhatsApp'}
            </a>
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
