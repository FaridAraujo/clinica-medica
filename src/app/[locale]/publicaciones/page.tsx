import type { Metadata } from 'next';
import { publications } from '@/data/publications';
import PublicationsClient from '@/components/ui/PublicationsClient';

export const metadata: Metadata = {
  title: 'Publicaciones — Dr. Edwin Alvarado | Cirugía Cardiovascular',
  description:
    'Artículos científicos, trabajos de investigación y material académico del Dr. Edwin Manuel Alvarado Arce en cirugía cardiovascular y general.',
};

export default function PublicacionesPage() {
  return (
    <main className="bg-warm-white pt-16">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section className="px-6 pb-12 pt-14 sm:px-10 sm:pb-16 sm:pt-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <span
            data-reveal
            className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy/35"
          >
            Publicaciones
          </span>
          <h1
            data-reveal
            data-reveal-delay="0.06"
            className="mt-5 font-heading font-light leading-[1.04] text-navy"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Contribuciones académicas
          </h1>
          <div
            data-reveal
            data-reveal-delay="0.11"
            className="mt-7 h-[2px] w-14 bg-red"
            aria-hidden="true"
          />
          <p
            data-reveal
            data-reveal-delay="0.15"
            className="mt-7 max-w-[52ch] font-body text-[1.0625rem] leading-[1.85] text-navy/50"
          >
            Artículos científicos y material de investigación del Dr. Edwin Manuel
            Alvarado Arce en cirugía cardiovascular y general.
          </p>
        </div>
      </section>

      {/* ── Grid ────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 sm:px-10 sm:pb-28 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <PublicationsClient items={publications} />
        </div>
      </section>

    </main>
  );
}
