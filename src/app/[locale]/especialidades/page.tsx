import { getTranslations } from 'next-intl/server';
import { WHATSAPP_URL } from '@/lib/constants';

interface Props { params: Promise<{ locale: string }> }

export default async function EspecialidadesPage({ params }: Props) {
  const { locale } = await params;

  const tE   = await getTranslations({ locale, namespace: 'especialidades' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const items = tE.raw('items') as { title: string; description: string }[];

  return (
    <main className="pt-16">

      {/* ── Encabezado ──────────────────────────────────────────── */}
      <section className="grain bg-navy pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/30">
            {tNav('especialidades')}
          </span>
          <h1
            data-reveal data-reveal-delay="0.07"
            className="mt-5 font-heading font-light leading-[1.02] text-white"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)' }}
          >
            {tE('title')}
          </h1>
          <p data-reveal data-reveal-delay="0.13" className="mt-6 max-w-[50ch] font-body text-[1.0625rem] leading-relaxed text-white/50">
            {locale === 'es'
              ? 'Más de cuatro décadas de experiencia en cirugía cardiovascular y general, respaldadas por formación internacional en España.'
              : 'Over four decades of experience in cardiovascular and general surgery, backed by international training in Spain.'}
          </p>
        </div>
      </section>

      {/* ── Especialidades — filas alternas full-width ───────────── */}
      <div>
        {items.map((item, i) => {
          const even = i % 2 === 0;
          return (
            <div
              key={i}
              className={[
                'grid grid-cols-1 lg:grid-cols-2',
                even ? 'bg-white' : 'bg-warm-white',
              ].join(' ')}
            >
              {/* Número + título */}
              <div
                data-reveal
                className={[
                  'flex flex-col justify-center gap-5 border-navy/[0.07] px-8 py-14 sm:px-12 sm:py-16 lg:px-16',
                  even ? 'lg:border-r' : 'lg:order-last lg:border-l',
                ].join(' ')}
              >
                <span className="font-heading text-[4rem] font-light leading-none text-navy/[0.07] sm:text-[5.5rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2
                  className="font-heading font-medium leading-tight text-navy"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                >
                  {item.title}
                </h2>
              </div>

              {/* Descripción */}
              <div
                data-reveal data-reveal-delay="0.1"
                className={[
                  'flex flex-col justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-16',
                  even ? '' : 'lg:order-first',
                ].join(' ')}
              >
                <p className="font-body text-[1rem] leading-[1.9] text-navy/60">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ¿No sabe si aplica? — franja navy ───────────────────── */}
      <section className="grain bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">

            <div className="flex flex-col gap-5">
              <h2
                data-reveal
                className="font-heading font-light leading-[1.05] text-white"
                style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)' }}
              >
                {locale === 'es'
                  ? '¿No sabe si su caso aplica?'
                  : 'Unsure if your case applies?'}
              </h2>
              <p data-reveal data-reveal-delay="0.07" className="font-body text-[1rem] leading-[1.85] text-white/55">
                {locale === 'es'
                  ? 'El Dr. Alvarado evalúa personalmente cada caso en consulta. No se requiere referencia previa. Puede contactarnos para orientación antes de agendar.'
                  : 'Dr. Alvarado personally evaluates each case in consultation. No prior referral needed. You can contact us for guidance before booking.'}
              </p>
            </div>

            <div data-reveal data-reveal-delay="0.1" className="flex flex-col gap-6 border-t border-white/[0.08] pt-8 lg:border-l lg:border-t-0 lg:pl-24 lg:pt-0">
              <ul className="flex flex-col gap-5" role="list">
                {[
                  locale === 'es' ? 'No se requiere referencia médica previa.' : 'No prior medical referral required.',
                  locale === 'es' ? 'La consulta incluye evaluación clínica completa.' : 'Consultation includes a full clinical evaluation.',
                  locale === 'es' ? 'Coordinación directa por WhatsApp o teléfono.' : 'Direct scheduling via WhatsApp or phone.',
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    <span className="font-body text-[0.9375rem] text-white/65">{text}</span>
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-[3.25rem] items-center gap-2.5 self-start bg-red px-8 font-body text-sm font-medium text-white transition-colors hover:bg-[#9a0e1a] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <WhatsAppIcon className="h-[1.1rem] w-[1.1rem] shrink-0" aria-hidden="true" />
                {locale === 'es' ? 'Consultar disponibilidad' : 'Check availability'}
              </a>
            </div>
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
