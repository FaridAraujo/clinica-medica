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
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
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
