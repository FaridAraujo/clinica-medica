import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import AesculapiusRod from '@/components/ui/AesculapiusRod';
import { AccordionList } from '@/components/ui/AccordionList';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata(_: Props): Promise<Metadata> {
  return {
    title: 'Dr. Edwin Alvarado — Sobre el Doctor | Cirujano Cardiovascular',
    description:
      'Más de 40 años de trayectoria en cirugía cardiovascular y general. Formado en el Hospital Ramón y Cajal de Madrid. Ex jefe del Servicio de Cirugía Cardiovascular del Hospital México (CCSS).',
  };
}

export default async function DoctorPage({ params }: Props) {
  const { locale } = await params;

  const tS   = await getTranslations({ locale, namespace: 'sobre' });
  const tT   = await getTranslations({ locale, namespace: 'trayectoria' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const paragraphs  = tS('body').split('\n\n');
  const trayectoria = tT.raw('entries') as {
    year: string; title: string; institution: string; description: string;
  }[];

  // Credenciales agrupadas por categoría (mejor jerarquía que una lista plana)
  const credentialGroups = [
    {
      label: 'Especialización médica',
      items: [
        tS('credentials.cardiovascular'),
        tS('credentials.general'),
      ],
    },
    {
      label: 'Cargos institucionales',
      items: [
        tS('credentials.hospital'),
      ],
    },
    {
      label: 'Docencia universitaria',
      items: [
        tS('credentials.ucr'),
        tS('credentials.ucimed'),
      ],
    },
  ];

  return (
    <main className="pt-16">

      {/* ══════════════════════════════════════════════════════════════
          1. HEADER — nombre + subtítulo + retrato contenido
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-warm-white pt-14 pb-10 sm:pt-20 sm:pb-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:items-center lg:gap-20 xl:grid-cols-[1fr_360px]">

            {/* Texto */}
            <div className="flex flex-col">
              <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                {tNav('sobre')}
              </span>
              <h1
                data-reveal data-reveal-delay="0.06"
                className="mt-5 font-heading font-light leading-[1.04] text-navy"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                Dr. Edwin Manuel<br />Alvarado Arce
              </h1>
              <div data-reveal data-reveal-delay="0.11" className="mt-7 h-[2px] w-14 bg-red" aria-hidden="true" />
              <p data-reveal data-reveal-delay="0.15" className="mt-7 font-body text-[0.825rem] font-medium uppercase tracking-[0.22em] text-navy/45">
                Cirujano Cardiovascular y General · Heredia, Costa Rica
              </p>
            </div>

            {/* Retrato */}
            <div
              data-reveal data-reveal-delay="0.18"
              className="relative max-h-[480px] overflow-hidden lg:max-h-none"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src="/images/Edwin-Alvaradoo.png"
                alt="Dr. Edwin Manuel Alvarado Arce"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. BIO NARRATIVA + CREDENCIALES SIDEBAR
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-20">
        {/* Vara de Esculapio — watermark de fondo, esquina inferior derecha */}
        <AesculapiusRod className="pointer-events-none absolute -right-10 -bottom-16 h-[480px] w-auto text-navy/[0.04]" />
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_320px] lg:gap-20 xl:grid-cols-[1fr_360px]">

            {/* Biografía narrativa */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                  Biografía
                </span>
                <h2
                  data-reveal data-reveal-delay="0.05"
                  className="font-heading font-light leading-[1.05] text-navy"
                  style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}
                >
                  {tS('title')}
                </h2>
              </div>

              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-reveal
                  data-reveal-delay={String(0.08 + i * 0.05)}
                  className="max-w-[62ch] font-body text-[1.0625rem] leading-[1.95] text-navy/70"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Sidebar — credenciales agrupadas, sticky en desktop */}
            <aside
              data-reveal data-reveal-delay="0.12"
              className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start"
            >
              <div className="flex flex-col gap-4">
                <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                  Credenciales
                </span>
                <div className="h-px w-8 bg-red" aria-hidden="true" />
              </div>

              <div className="flex flex-col">
                {credentialGroups.map((group, i) => (
                  <div key={i} className="flex gap-4 border-t border-navy/[0.08] py-4">
                    <p className="w-16 shrink-0 pt-0.5 font-body text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.06em] text-navy/30">
                      {group.label}
                    </p>
                    <ul className="flex flex-col gap-2" role="list">
                      {group.items.map((item, j) => (
                        <li key={j} className="font-body text-[0.825rem] leading-snug text-navy/70">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Línea final — experiencia destacada */}
                <div className="flex flex-col gap-2 border-t border-navy/[0.08] pt-6">
                  <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
                    Trayectoria
                  </p>
                  <p className="font-heading text-[1.625rem] font-medium leading-none text-navy">
                    +40 años
                  </p>
                  <p className="font-body text-[0.8rem] leading-relaxed text-navy/55">
                    de experiencia clínica continua
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. TRAYECTORIA EXTENDIDA — timeline con descripciones completas
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-warm-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-14">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:mb-12">
            <span data-reveal className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              {tT('sectionLabel')}
            </span>
            <h2
              data-reveal data-reveal-delay="0.06"
              className="font-heading font-light leading-[1.05] text-navy"
              style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}
            >
              {tT('title')}
            </h2>
          </div>

          <AccordionList
            items={trayectoria.map(entry => ({
              heading: (
                <div className="flex items-center gap-5">
                  <span className="w-[72px] shrink-0 font-body text-[0.575rem] font-semibold uppercase tracking-[0.2em] text-navy/40 sm:w-[90px]">
                    {entry.year}
                  </span>
                  <h3 className="font-heading text-[1.25rem] font-medium leading-snug text-navy sm:text-[1.375rem]">
                    {entry.title}
                  </h3>
                </div>
              ),
              body: (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[90px_1fr] sm:gap-5">
                  <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-navy/40 sm:pt-1">
                    {entry.institution}
                  </p>
                  <p className="max-w-[58ch] font-body text-[0.9375rem] leading-[1.85] text-navy/65">
                    {entry.description}
                  </p>
                </div>
              ),
            }))}
          />
        </div>
      </section>
    </main>
  );
}
