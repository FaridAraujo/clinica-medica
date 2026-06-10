import type { Metadata } from 'next';
import BookingFlow from '@/components/ui/BookingFlow';
import { PHONE_OFFICE, WHATSAPP_URL } from '@/lib/constants';

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
    <main className="min-h-screen bg-warm-white">

      {/* ── Header editorial ─────────────────────────────────────────── */}
      <header className="bg-navy pt-16">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10 sm:py-18 lg:px-14 lg:py-20">
          <div className="flex flex-col gap-6">

            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <MedicalCrossIcon className="h-2.5 w-2.5 shrink-0 text-red" aria-hidden="true" />
              <span className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-white/35">
                Consultorio · Heredia, Costa Rica
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-heading font-light leading-[1.06] text-white"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)' }}
            >
              Agendar una consulta
            </h1>

            {/* Sub + proceso inline */}
            <div className="mt-1 flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
              <p className="max-w-[48ch] font-body text-[0.9375rem] leading-relaxed text-white/45">
                Cirujano Cardiovascular y General, Heredia, Costa Rica.
                Seleccione fecha y horario; le confirmamos en menos de 24 horas hábiles.
              </p>

              {/* Contacto directo */}
              <div className="flex shrink-0 flex-col gap-3 border-l border-white/[0.1] pl-7">
                <p className="font-body text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Contacto directo
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-[0.85rem] font-medium text-white/70 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <WaIcon className="h-3.5 w-3.5 shrink-0 text-[#25D366]" aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
                  className="inline-flex items-center gap-2 font-body text-[0.85rem] text-white/40 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-white/25" aria-hidden="true" />
                  {PHONE_OFFICE}
                </a>
              </div>
            </div>

            {/* 3 pasos — franja horizontal */}
            <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06] pt-6">
              {[
                { n: '01', label: 'Elija fecha y horario' },
                { n: '02', label: 'Ingrese sus datos' },
                { n: '03', label: 'Confirme por WhatsApp' },
              ].map(({ n, label }) => (
                <div key={n} className="flex items-baseline gap-3 px-4 first:pl-0 last:pr-0 sm:px-6 sm:first:pl-0">
                  <span className="font-body text-[0.575rem] font-semibold tabular-nums uppercase tracking-[0.1em] text-red/70">{n}</span>
                  <span className="font-body text-[0.775rem] leading-snug text-white/35">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Flujo de agendamiento ─────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <BookingFlow />
      </div>

    </main>
  );
}

function MedicalCrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" />
    </svg>
  );
}

function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
    </svg>
  );
}
