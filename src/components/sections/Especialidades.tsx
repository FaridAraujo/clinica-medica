'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP } from '@/lib/gsap';

interface Item {
  title: string;
  description: string;
}

export default function Especialidades() {
  const t = useTranslations('especialidades');
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.fromTo(
      '.esp-reveal',
      { opacity: 0, y: reduced ? 0 : 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      }
    );
  }, { scope: ref });

  const items = t.raw('items') as Item[];

  return (
    <section ref={ref} id="especialidades" className="bg-blue-pale py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="esp-reveal mb-14">
          <span className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy/40">
            {t('sectionLabel')}
          </span>
          <h2
            className="mt-2.5 font-heading font-light leading-tight text-navy"
            style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
          >
            {t('title')}
          </h2>
          <div className="mt-4 h-[2px] w-14 bg-red" aria-hidden="true" />
        </div>

        {/* Cards — gap-px + bg on grid = gutters as lines */}
        <div className="grid grid-cols-1 gap-px bg-navy/[0.09] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="esp-reveal flex flex-col gap-4 bg-blue-pale p-8 lg:p-10"
            >
              {/* Number */}
              <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-navy/30">
                0{i + 1}
              </span>

              {/* Title */}
              <h3 className="font-heading text-[1.35rem] font-medium leading-tight text-navy">
                {item.title}
              </h3>

              {/* Divider */}
              <div className="h-px w-8 bg-red/60" aria-hidden="true" />

              {/* Description */}
              <p className="font-body text-[0.875rem] leading-relaxed text-navy/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
