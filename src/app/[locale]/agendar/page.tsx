import type { Metadata } from 'next';
import BookingFlow from '@/components/ui/BookingFlow';
import { AccordionList } from '@/components/ui/AccordionList';
import { PHONE_OFFICE, WHATSAPP_URL, CLINIC_ADDRESS, EMAIL } from '@/lib/constants';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Agendar Cita — Dr. Edwin Alvarado | Cirugía Cardiovascular',
    description:
      'Solicite su cita con el Dr. Edwin Manuel Alvarado Arce. Seleccione fecha y horario disponible. Confirmación directa por WhatsApp.',
  };
}

export default async function AgendarPage({ params }: Props) {
  await params;

  return (
    <main className="min-h-screen bg-warm-white pt-16">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-16 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-20 xl:grid-cols-[320px_1fr]">

          {/* ── Panel izquierdo — contexto, sticky en desktop ──────── */}
          {/* order-last en mobile → el flujo de agendamiento aparece primero */}
          <aside className="order-last flex flex-col gap-8 lg:order-none lg:sticky lg:top-28">

            {/* Identidad del doctor */}
            <div className="flex flex-col gap-3">
              <div className="h-[2px] w-10 bg-red" aria-hidden="true" />
              <p className="font-heading text-[1.375rem] font-medium leading-snug text-navy">
                Dr. Edwin Manuel Alvarado Arce
              </p>
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
                Cirugía Cardiovascular y General · Heredia
              </p>
            </div>

            {/* Cómo funciona — un solo accordion que despliega los 3 pasos */}
            <AccordionList
              items={[{
                heading: (
                  <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy/50">
                    Cómo funciona
                  </span>
                ),
                body: (
                  <ol className="flex flex-col">
                    {[
                      { n: '01', title: 'Elija fecha y horario', body: 'Vea los espacios disponibles y escoja el que mejor le quede.' },
                      { n: '02', title: 'Ingrese sus datos',     body: 'Solo necesitamos su nombre y número de WhatsApp.' },
                      { n: '03', title: 'Confirme por WhatsApp', body: 'Le respondemos en menos de 24 horas hábiles para confirmar.' },
                    ].map(({ n, title, body }, i) => (
                      <li
                        key={n}
                        className={['grid grid-cols-[24px_1fr] gap-x-3 gap-y-1 py-3.5', i > 0 ? 'border-t border-navy/[0.07]' : ''].join(' ')}
                      >
                        <span className="row-span-2 pt-[2px] font-body text-[0.65rem] font-semibold tabular-nums tracking-[0.08em] text-red">
                          {n}
                        </span>
                        <p className="font-body text-[0.85rem] font-medium leading-snug text-navy">{title}</p>
                        <p className="font-body text-[0.775rem] leading-relaxed text-navy/50">{body}</p>
                      </li>
                    ))}
                  </ol>
                ),
              }]}
            />

            {/* Separador */}
            <div className="h-px bg-navy/[0.08]" aria-hidden="true" />

            {/* Contacto directo — siempre disponible */}
            <div className="flex flex-col gap-4">
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy/35">
                ¿Prefiere contacto directo?
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 self-start font-body text-[0.875rem] font-medium text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden="true" />
                Escribir al consultorio
              </a>
              <a
                href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                className="group inline-flex items-center gap-2.5 self-start font-body text-[0.875rem] text-navy/60 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <PhoneIcon className="h-4 w-4 shrink-0 text-navy/35" aria-hidden="true" />
                {PHONE_OFFICE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2.5 self-start font-body text-[0.875rem] text-navy/60 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <EmailIcon className="h-4 w-4 shrink-0 text-navy/35" aria-hidden="true" />
                {EMAIL}
              </a>
              <p className="font-body text-[0.725rem] leading-relaxed text-navy/35">
                {CLINIC_ADDRESS}
              </p>
            </div>
          </aside>

          {/* ── Panel derecho — flujo de agendamiento ──────────────── */}
          {/* order-first en mobile → aparece antes que el panel de contexto */}
          <div className="order-first lg:order-none">
            <BookingFlow />
          </div>

        </div>
      </div>
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}
