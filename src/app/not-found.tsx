import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-warm-white px-6">

      {/* Medical cross — brand mark */}
      <div className="mb-12 flex h-16 w-16 items-center justify-center border border-navy/[0.12]">
        <MedicalCrossIcon className="h-7 w-7 text-red" aria-hidden="true" />
      </div>

      {/* Number */}
      <p
        className="font-heading font-light leading-none text-navy/[0.07]"
        style={{ fontSize: 'clamp(8rem, 20vw, 16rem)' }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Heading */}
      <div className="-mt-4 flex flex-col items-center gap-6 text-center">
        <div className="h-[2px] w-12 bg-red" aria-hidden="true" />
        <h1
          className="font-heading font-light leading-[1.08] text-navy"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
        >
          Página no encontrada
        </h1>
        <p className="max-w-[40ch] font-body text-[1rem] leading-relaxed text-navy/55">
          La página que busca no existe o ha sido movida. Puede regresar al inicio o contactarnos directamente.
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/es"
          className="inline-flex h-12 items-center bg-navy px-8 font-body text-sm font-medium text-white transition-colors duration-200 hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        >
          Volver al inicio
        </Link>
        <Link
          href="/es/contacto"
          className="inline-flex h-12 items-center border border-navy/30 px-8 font-body text-sm font-medium text-navy/70 transition-colors duration-200 hover:border-navy hover:text-navy active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        >
          Contacto
        </Link>
      </div>

      {/* Footer mark */}
      <p className="mt-16 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-navy/25">
        Dr. Edwin Manuel Alvarado Arce · Heredia, Costa Rica
      </p>
    </main>
  );
}

function MedicalCrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" className={className}>
      <path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" />
    </svg>
  );
}
