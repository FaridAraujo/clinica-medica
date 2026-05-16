'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP } from '@/lib/gsap';
import { WHATSAPP_URL } from '@/lib/constants';

export default function Hero() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.fromTo(
        '.hero-item',
        { opacity: 0, y: reduced ? 0 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.3 : 0.75,
          stagger: reduced ? 0.04 : 0.10,
          ease: 'power3.out',
          clearProps: 'transform',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        '.credential-item',
        { opacity: 0, y: reduced ? 0 : 12 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.3 : 0.55,
          stagger: reduced ? 0.03 : 0.08,
          ease: 'power2.out',
          clearProps: 'transform',
          delay: reduced ? 0.2 : 0.75,
        }
      );

      gsap.fromTo(
        '.ecg-flourish',
        { opacity: 0 },
        {
          opacity: 1,
          duration: reduced ? 0.3 : 0.9,
          ease: 'power2.out',
          delay: reduced ? 0.2 : 0.65,
        }
      );
    },
    { scope: containerRef }
  );

  const stats = [
    { key: 'experience', value: t('stats.experience.value'), label: t('stats.experience.label') },
    { key: 'service',    value: t('stats.service.value'),    label: t('stats.service.label')    },
    { key: 'teaching',   value: t('stats.teaching.value'),   label: t('stats.teaching.label')   },
    { key: 'union',      value: t('stats.union.value'),      label: t('stats.union.label')      },
    { key: 'madrid',     value: t('stats.madrid.value'),     label: t('stats.madrid.label')     },
    { key: 'clinic',     value: t('stats.clinic.value'),     label: t('stats.clinic.label')     },
  ] as const;

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col bg-navy pt-16"
    >
      {/* ── Background image ────────────────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/donManuel.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Móvil: overlay oscuro uniforme para que el texto sea legible */}
        <div className="absolute inset-0 bg-[#0d1520]/75 sm:hidden" />
        {/* Desktop: gradiente izquierda→derecha — texto en zona oscura izquierda */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0d1520]/93 via-[#0d1520]/68 to-[#0d1520]/20 sm:block" />
        {/* Bottom gradient: blends into credential strip */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0d1520] via-[#0d1520]/60 to-transparent" />
      </div>

      {/* ── Text content ────────────────────────────────────────── */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-20 sm:px-10 lg:px-14">
        <div className="max-w-sm lg:max-w-xl">

          {/* Eyebrow */}
          <div className="hero-item mb-7 flex items-center gap-2.5">
            <MedicalCrossIcon className="h-3 w-3 shrink-0 text-red" aria-hidden="true" />
            <span className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              {t('eyebrow')}
            </span>
          </div>

          {/* Name */}
          <h1
            id="hero-heading"
            className="hero-item font-heading font-light leading-[1.08] text-white"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
          >
            Dr. Edwin Manuel<br />Alvarado Arce
          </h1>

          {/* Red rule */}
          <div className="hero-item my-7 h-[2px] w-14 bg-red" aria-hidden="true" />

          {/* Subtitle */}
          <p className="hero-item max-w-[46ch] font-body text-[1.0625rem] leading-relaxed text-white/60">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="hero-item mt-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center bg-red px-7 font-body text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-[#9a0e1a] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      </div>

      {/* ── ECG flourish — guiño médico antes del strip ──────────── */}
      <div className="ecg-flourish relative flex justify-center pb-4 sm:pb-5" aria-hidden="true">
        <ECGTrace className="h-4 w-32 text-white/30 sm:h-5 sm:w-44" />
      </div>

      {/* ── Credential strip ────────────────────────────────────── */}
      <div className="relative border-t border-white/[0.08]">
        <dl className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-3 lg:grid-cols-6">
          {stats.map(({ key, value, label }) => (
            <div
              key={key}
              className={[
                'credential-item flex flex-col gap-1.5 bg-[#0d1520]/40 px-6 py-6 sm:px-8 backdrop-blur-sm',
                // Ocultar los últimos 2 en móvil — se muestran desde sm en adelante
                (key === 'madrid' || key === 'clinic') ? 'hidden sm:flex' : '',
              ].join(' ')}
            >
              <dt className="font-body text-[1.25rem] font-semibold leading-none tracking-tight text-white">
                {value}
              </dt>
              <dd className="font-body text-[0.675rem] font-medium uppercase tracking-[0.12em] leading-tight text-white/40">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="absolute bottom-28 right-8 hidden lg:block">
        <div className="h-12 w-px animate-[scrollPulse_2.2s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>
    </section>
  );
}

function MedicalCrossIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" className={className} {...props}>
      <path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" />
    </svg>
  );
}

/**
 * Trazo de ECG estilizado — el complejo QRS-T característico del latido cardíaco.
 * Es el guiño médico más reconocible: línea de base, espiga ascendente brusca,
 * espiga descendente, onda T suave, y de vuelta a la línea de base.
 *
 * Coordenadas pensadas con un viewBox 100×24, midline en y=12:
 *   - 0→40:  línea de base
 *   - 40→44: onda P pequeña hacia arriba
 *   - 44→46: dip Q
 *   - 46→47: espiga R (sube hasta y=2)
 *   - 47→49: espiga S (baja hasta y=22)
 *   - 49→55: vuelta a base + onda T
 *   - 55→100: línea de base
 */
function ECGTrace({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M0,12 L40,12 L42,11 L44,12 L46,13 L47,3 L49,21 L50,12 L55,10.5 L58,12 L100,12" />
    </svg>
  );
}

