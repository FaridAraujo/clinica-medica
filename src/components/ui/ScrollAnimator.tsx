'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Kill all previous triggers on route change
    ScrollTrigger.getAll().forEach(t => t.kill());

    if (reduced) return;

    // Double RAF: wait for React to commit new DOM + browser to paint
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const els = document.querySelectorAll<HTMLElement>('[data-reveal]');

        els.forEach((el) => {
          const delay = parseFloat(el.dataset.revealDelay ?? '0');

          gsap.fromTo(
            el,
            { opacity: 0, y: 20, filter: 'blur(5px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              delay,
              ease: 'power3.out',
              clearProps: 'transform,filter',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            }
          );
        });

        // Filetes rojos — scaleX 0→1, sin fade, transform-origin left
        const rules = document.querySelectorAll<HTMLElement>('[data-reveal-rule]');

        rules.forEach((el) => {
          const delay = parseFloat(el.dataset.revealDelay ?? '0');

          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.55,
              delay,
              ease: 'power3.out',
              transformOrigin: 'left center',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                once: true,
              },
            }
          );
        });
      })
    );

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
