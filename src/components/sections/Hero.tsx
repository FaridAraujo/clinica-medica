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

      // Text block items stagger in
      gsap.fromTo(
        '.hero-item',
        { opacity: 0, y: reduced ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.3 : 0.7,
          stagger: reduced ? 0.04 : 0.10,
          ease: 'power3.out',
          clearProps: 'transform',
          delay: 0.08,
        }
      );

      // Credential items slide up slightly later
      gsap.fromTo(
        '.credential-item',
        { opacity: 0, y: reduced ? 0 : 16 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.3 : 0.55,
          stagger: reduced ? 0.03 : 0.08,
          ease: 'power2.out',
          clearProps: 'transform',
          delay: reduced ? 0.2 : 0.6,
        }
      );

      // Photo column fades in
      gsap.fromTo(
        '.hero-photo-col',
        { opacity: 0 },
        {
          opacity: 1,
          duration: reduced ? 0.3 : 0.9,
          ease: 'power2.out',
          delay: reduced ? 0.05 : 0.15,
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
  ] as const;

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen bg-warm-white pt-16"
    >
      {/* Very subtle blue wash top-right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[55%] w-[42%] bg-gradient-to-bl from-blue/[0.03] to-transparent" />
      </div>

      {/*
        ── Grid layout ───────────────────────────────────────────────
        Mobile: single column, photo on top, text below, credential strip at foot
        Desktop: [text col] [photo col — full height]
        The outer section is min-h-screen; the inner grid stretches to fill it.
      */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 min-h-[520px] lg:h-[640px] lg:grid-cols-[1fr_42%]">

        {/* ── LEFT: text + credential strip ──────────────────────── */}
        <div className="flex flex-col justify-between">

          {/* Text block */}
          <div className="flex flex-col gap-5 px-5 py-14 sm:px-8 lg:flex-1 lg:justify-center lg:px-10 lg:py-0 xl:px-14">

            {/* Eyebrow */}
            <div className="hero-item flex items-center gap-2.5">
              <MedicalCrossIcon className="h-3 w-3 shrink-0 text-red" aria-hidden="true" />
              <span className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
                {t('eyebrow')}
              </span>
            </div>

            {/* Doctor name */}
            <h1
              id="hero-heading"
              className="hero-item font-heading font-light leading-[1.07] text-navy"
              style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.25rem)' }}
            >
              {t('title')}
            </h1>

            {/* Red rule */}
            <div className="hero-item h-[2px] w-16 bg-red" aria-hidden="true" />

            {/* Subtitle */}
            <p className="hero-item max-w-[48ch] font-body text-[1.0625rem] leading-relaxed text-navy/60">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="hero-item flex flex-wrap items-center gap-4 pt-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[3.25rem] items-center gap-2.5 bg-red px-6 font-body text-sm font-medium text-white transition-colors duration-150 hover:bg-[#9a0e1a] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
              >
                <WhatsAppIcon className="h-[1.125rem] w-[1.125rem] shrink-0" aria-hidden="true" />
                {t('cta')}
              </a>

              <a
                href="#sobre"
                className="font-body text-sm text-navy/50 underline-offset-4 transition-colors duration-150 hover:text-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
              >
                {t('ctaSecondary')}
                <span aria-hidden="true"> →</span>
              </a>
            </div>
          </div>

          {/* ── Credential strip ───────────────────────────────────── */}
          <div className="border-t border-navy/[0.07] px-5 sm:px-8 lg:px-10 xl:px-14">
            <dl className="grid grid-cols-2 gap-px bg-navy/[0.07] sm:grid-cols-4">
              {stats.map(({ key, value, label }) => (
                <div
                  key={key}
                  className="credential-item flex flex-col gap-1.5 bg-warm-white px-4 py-5 sm:px-5"
                >
                  <dt className="font-body text-[1.25rem] font-semibold leading-none tracking-tight text-navy">
                    {value}
                  </dt>
                  <dd className="font-body text-[0.675rem] font-medium uppercase tracking-[0.12em] leading-tight text-navy/45">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── RIGHT: full-height photo column ────────────────────── */}
        {/*
          Mobile: fixed aspect ratio box (order-first, on top)
          Desktop: absolutely / sticky fills the right track of the grid
        */}
        <div
          className="hero-photo-col order-first lg:order-last"
          aria-hidden="true"
        >
          {/* Mobile photo — fixed aspect ratio, zoom-stable */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] overflow-hidden sm:max-w-[380px] lg:hidden">
            <Image
              src="/images/Edwin-Alvaradoo.png"
              alt="Dr. Edwin Manuel Alvarado Arce, Médico Cirujano especialista en Cirugía Cardiovascular"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 640px) 340px, 380px"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-1 w-12 bg-red"
            />
          </div>

          {/* Desktop photo — inherits fixed grid row height (860px), no vh dependency */}
          <div className="relative hidden h-full overflow-hidden lg:block">
            <Image
              src="/images/Edwin-Alvaradoo.png"
              alt="Dr. Edwin Manuel Alvarado Arce, Médico Cirujano especialista en Cirugía Cardiovascular"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1280px) 340px, 380px"
            />
            {/* Red accent bar */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-1 w-14 bg-red"
            />
            {/* Subtle left-edge fade so photo meets text column gracefully */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-warm-white/20 to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden">
        <div className="h-10 w-px animate-[scrollPulse_2.2s_ease-in-out_infinite] bg-gradient-to-b from-navy/30 to-transparent" />
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

function WhatsAppIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
