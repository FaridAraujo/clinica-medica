import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ui/ContactForm';
import {
  WHATSAPP_URL,
  PHONE_OFFICE,
  PHONE_MOBILE,
  EMAIL,
  CLINIC_ADDRESS,
  CLINIC_HOURS,
} from '@/lib/constants';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contacto — Dr. Edwin Alvarado | Agendar Cita',
    description:
      'Agende su consulta con el Dr. Edwin Manuel Alvarado Arce. Atención privada de cirugía cardiovascular y general en Heredia, Costa Rica.',
  };
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;

  const tNav      = await getTranslations({ locale, namespace: 'nav' });
  const tContacto = await getTranslations({ locale, namespace: 'contacto' });

  return (
    <main className="pt-16">

      {/* ══════════════════════════════════════════════════════════════
          1+2. TÍTULO + CANALES DIRECTOS — una sola entrada de acción
          Sin header separado: el título compacto vive sobre las tarjetas.
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white pt-20 sm:pt-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          {/* Título compacto — encabeza las tarjetas sin sección propia */}
          <div className="mb-10 flex flex-col gap-3 sm:mb-12">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              {tNav('contacto')}
            </span>
            <h1
              data-reveal data-reveal-delay="0.05"
              className="font-heading font-light leading-[1.04] text-navy"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {tContacto('title')}
            </h1>
            <p data-reveal data-reveal-delay="0.09" className="mt-1 max-w-[52ch] font-body text-[1rem] leading-[1.85] text-navy/55">
              {tContacto('subtitle')}
            </p>
          </div>

          <div
            data-reveal
            className="grid grid-cols-1 border-t border-navy/[0.08] divide-y divide-navy/[0.08] sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
          >
            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 px-7 py-12 transition-colors duration-200 hover:bg-warm-white sm:px-8 sm:py-14"
            >
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                WhatsApp
              </p>
              <p className="font-body text-[1.75rem] font-medium leading-none tracking-[-0.015em] text-navy">
                {PHONE_MOBILE}
              </p>
              <p className="font-body text-[0.875rem] leading-relaxed text-navy/55">
                La forma más rápida de contactarnos directamente.
              </p>
              <span className="mt-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-red">
                Escribir
              </span>
            </a>

            {/* Teléfono */}
            <a
              href={`tel:+506${PHONE_OFFICE.replace(/-/g, '')}`}
              className="group flex flex-col gap-4 px-7 py-12 transition-colors duration-200 hover:bg-warm-white sm:px-8 sm:py-14"
            >
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                Teléfono consultorio
              </p>
              <p className="font-body text-[1.75rem] font-medium leading-none tracking-[-0.015em] text-navy">
                {PHONE_OFFICE}
              </p>
              <p className="font-body text-[0.875rem] leading-relaxed text-navy/55">
                Para llamadas directas al consultorio.
              </p>
              <span className="mt-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy">
                Llamar
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group flex flex-col gap-4 px-7 py-12 transition-colors duration-200 hover:bg-warm-white sm:px-8 sm:py-14"
            >
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-navy/45">
                Correo electrónico
              </p>
              <p className="font-body text-[1.125rem] font-medium leading-snug text-navy break-all">
                {EMAIL}
              </p>
              <p className="font-body text-[0.875rem] leading-relaxed text-navy/55">
                Para consultas no urgentes o adjuntar exámenes.
              </p>
              <span className="mt-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy">
                Escribir
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. FORMULARIO RÁPIDO
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">

            {/* Texto introductorio */}
            <div className="flex flex-col">
              <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                Formulario rápido
              </span>
              <h2
                data-reveal data-reveal-delay="0.06"
                className="mt-5 font-heading font-light leading-[1.05] text-navy"
                style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}
              >
                Envíenos su consulta
              </h2>
              <div data-reveal data-reveal-delay="0.11" className="mt-6 h-[2px] w-12 bg-red" aria-hidden="true" />
              <p data-reveal data-reveal-delay="0.15" className="mt-6 max-w-[42ch] font-body text-[1rem] leading-[1.85] text-navy/60">
                Complete el formulario y elija si prefiere enviarlo por WhatsApp o por correo electrónico. Le confirmaremos disponibilidad a la brevedad.
              </p>
              <p data-reveal data-reveal-delay="0.19" className="mt-5 max-w-[42ch] font-body text-[0.875rem] leading-[1.85] text-navy/45">
                Si su caso es urgente, le recomendamos contactarnos directamente por teléfono o WhatsApp.
              </p>
            </div>

            {/* Formulario */}
            <div data-reveal data-reveal-delay="0.12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. INFORMACIÓN PRÁCTICA — antes de su visita
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

          <div className="mb-12 flex flex-col gap-4">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              Antes de su visita
            </span>
            <h2
              data-reveal data-reveal-delay="0.06"
              className="font-heading font-light leading-[1.05] text-navy"
              style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}
            >
              Información práctica
            </h2>
          </div>

          {/* 4 columnas con info — algunas placeholder */}
          <div className="grid grid-cols-1 border-t border-navy/[0.08] divide-y divide-navy/[0.08] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">

            {/* Horario */}
            <div className="flex flex-col gap-4 px-7 py-10 sm:px-8 sm:py-12 sm:border-b sm:border-b-navy/[0.08] lg:border-b-0">
              <div className="h-px w-7 bg-red" aria-hidden="true" />
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/45">
                Horario de atención
              </p>
              {CLINIC_HOURS ? (
                <p className="font-body text-[0.9375rem] leading-relaxed text-navy/70">
                  {CLINIC_HOURS}
                </p>
              ) : (
                <p className="font-body text-[0.9375rem] leading-relaxed italic text-navy/35">
                  Por confirmar. Escríbanos por WhatsApp.
                </p>
              )}
            </div>

            {/* Dirección */}
            <div className="flex flex-col gap-4 px-7 py-10 sm:px-8 sm:py-12 sm:border-b sm:border-b-navy/[0.08] lg:border-b-0">
              <div className="h-px w-7 bg-red" aria-hidden="true" />
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/45">
                Dirección
              </p>
              <p className="font-body text-[0.9375rem] leading-relaxed text-navy/70">
                {CLINIC_ADDRESS}
              </p>
            </div>

            {/* Referencia médica */}
            <div className="flex flex-col gap-4 px-7 py-10 sm:px-8 sm:py-12">
              <div className="h-px w-7 bg-red" aria-hidden="true" />
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/45">
                Referencia médica
              </p>
              <p className="font-body text-[0.9375rem] leading-relaxed text-navy/70">
                No se requiere referencia previa para agendar una cita.
              </p>
            </div>

            {/* Cancelaciones */}
            <div className="flex flex-col gap-4 px-7 py-10 sm:px-8 sm:py-12">
              <div className="h-px w-7 bg-red" aria-hidden="true" />
              <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/45">
                Cancelaciones
              </p>
              <p className="font-body text-[0.9375rem] leading-relaxed italic text-navy/35">
                Política por confirmar.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
