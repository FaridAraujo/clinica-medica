import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AccordionList } from '@/components/ui/AccordionList';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Especialidades — Dr. Edwin Alvarado | Cirugía Cardiovascular',
    description:
      'Áreas de atención: cirugía de corazón abierto, válvulas cardíacas, aorta, revascularización coronaria, cirugía general y consultas especializadas en Heredia, Costa Rica.',
  };
}

export default async function EspecialidadesPage({ params }: Props) {
  const { locale } = await params;

  const tE   = await getTranslations({ locale, namespace: 'especialidades' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const items = tE.raw('items') as { title: string; description: string }[];

  /**
   * Categorización editorial — derivada del contenido, no inventada.
   * Las primeras 4 son cardiovasculares, la 5 es general, la 6 es consulta.
   * El acento categórico reemplaza la numeración: ubica al lector
   * agrupando visualmente sin imponer una jerarquía rígida.
   */
  const categoryFor = (i: number): string => {
    if (i <= 3) return 'Cardiovascular';
    if (i === 4) return 'General';
    return 'Consulta';
  };

  const consultationFacts = [
    'No se requiere referencia médica previa para agendar una cita.',
    'La consulta incluye una evaluación clínica completa y criterio quirúrgico personalizado.',
    'La coordinación de citas se realiza directamente por WhatsApp o por teléfono al consultorio.',
  ];

  return (
    <main className="pt-16">

      {/* ══════════════════════════════════════════════════════════════
          1. HEADER
      ══════════════════════════════════════════════════════════════ */}
      {/* Header reducido — solo el título, el listado es el contenido */}
      <section className="bg-warm-white pt-14 pb-8 sm:pt-20 sm:pb-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col">
            <h1
              data-reveal
              className="font-heading font-light leading-[1.02] text-navy"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)' }}
            >
              {tE('title')}
            </h1>
            <p data-reveal data-reveal-delay="0.08" className="mt-8 max-w-[55ch] font-body text-[1.0625rem] leading-[1.85] text-navy/55">
              Más de cuatro décadas de experiencia clínica en procedimientos cardiovasculares mayores y cirugía general, respaldadas por formación de especialidad en el Hospital Ramón y Cajal de Madrid.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. LISTA EDITORIAL DE ESPECIALIDADES
          Cada especialidad como un "artículo" con categoría + título +
          descripción, separados por hairlines navy/[0.08].
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <AccordionList
            items={items.map((item, i) => ({
              heading: (
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="hidden items-center gap-1.5 sm:flex">
                    <MedicalCrossIcon className="h-[0.5rem] w-[0.5rem] shrink-0 text-red" aria-hidden="true" />
                    <span className="w-[80px] font-body text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                      {categoryFor(i)}
                    </span>
                  </div>
                  <h2 className="font-heading font-light leading-snug text-navy" style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.875rem)' }}>
                    {item.title}
                  </h2>
                </div>
              ),
              body: (
                <p className="max-w-[52ch] font-body text-[1rem] leading-[1.95] text-navy/65 sm:pl-[128px]">
                  {item.description}
                </p>
              ),
            }))}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. SOBRE LAS CONSULTAS — información práctica al cierre
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-warm-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">

            {/* Encabezado */}
            <div className="flex flex-col gap-4">
              <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                Información práctica
              </span>
              <h2
                data-reveal data-reveal-delay="0.06"
                className="font-heading font-light leading-[1.05] text-navy"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
              >
                Sobre las consultas
              </h2>
              <p data-reveal data-reveal-delay="0.1" className="mt-2 max-w-[42ch] font-body text-[0.9375rem] leading-[1.85] text-navy/55">
                El Dr. Alvarado evalúa personalmente cada caso. Estos son los puntos prácticos para tomar en cuenta antes de agendar.
              </p>
            </div>

            {/* Lista de puntos prácticos */}
            <ul className="flex flex-col" role="list">
              {consultationFacts.map((fact, i) => (
                <li
                  key={i}
                  data-reveal
                  data-reveal-delay={String(0.12 + i * 0.05)}
                  className="flex items-start gap-5 border-t border-navy/[0.08] py-6 last:border-b last:border-b-navy/[0.08]"
                >
                  <div className="mt-3 h-px w-5 shrink-0 bg-red" aria-hidden="true" />
                  <span className="font-body text-[1rem] leading-[1.85] text-navy/70">
                    {fact}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function MedicalCrossIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" className={className} {...props}>
      <path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" />
    </svg>
  );
}
