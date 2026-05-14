'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_H = 64; // 4rem — must match h-16 below

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // CTA visibility: hidden while hero is on screen, visible once hero scrolls away.
  // On inner pages (no hero) the button is always visible.
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [ctaVisible, setCtaVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) { setCtaVisible(true); return; }

    setCtaVisible(false);
    const hero = document.getElementById('hero');
    if (!hero) { setCtaVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => setCtaVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname, isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NAV_H);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const close = useCallback(() => setOpen(false), []);

  const otherLocale = locale === 'es' ? 'en' : 'es';
  const strippedPath = pathname.startsWith(`/${locale}`)
    ? pathname.slice(`/${locale}`.length) || '/'
    : pathname;
  const otherLocalePath = `/${otherLocale}${strippedPath === '/' ? '' : strippedPath}`;

  const links = [
    { href: `/${locale}/consultorio`, label: t('consultorio') },
    { href: `/${locale}/doctor`,      label: t('sobre') },
    { href: `/${locale}/especialidades`, label: t('especialidades') },
    { href: `/${locale}/contacto`,    label: t('contacto') },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const langLabel = locale === 'es' ? 'Idioma' : 'Language';
  const switchLabel = otherLocale === 'es' ? 'Cambiar a Español' : 'Switch to English';

  return (
    <>
      {/* ─── Header ─────────────────────────────────────────────── */}
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 bg-warm-white transition-shadow duration-300',
          scrolled ? 'shadow-[0_1px_0_0_rgba(13,34,64,0.08)]' : '',
        ].join(' ')}
      >
        <nav
          aria-label={locale === 'es' ? 'Navegación principal' : 'Main navigation'}
          className="flex h-16 items-center justify-between px-6 sm:px-10 lg:px-14"
        >
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <span className="font-heading text-[1.125rem] font-medium text-navy">
              Dr. Alvarado
            </span>
            <span className="font-body text-[0.625rem] font-medium uppercase tracking-[0.16em] text-navy/40">
              Consultorio Médico · Heredia
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex" role="list">
            {links.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'group relative py-1 font-body text-sm transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2',
                      active ? 'text-navy' : 'text-navy/55 hover:text-navy',
                    ].join(' ')}
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute -bottom-px left-0 h-px bg-blue transition-[width] duration-200 ease-out',
                        active ? 'w-full' : 'w-0 group-hover:w-full',
                      ].join(' ')}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA — se oculta mientras el hero es visible */}
          <div
            className={[
              'hidden items-center lg:flex',
              'transition-[opacity,transform] duration-300 ease-out',
              ctaVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-1 pointer-events-none',
            ].join(' ')}
          >
            <Link
              href={`/${locale}/contacto`}
              tabIndex={ctaVisible ? 0 : -1}
              className="inline-flex h-9 items-center border border-navy px-4 font-body text-[0.8rem] font-medium text-navy transition-colors duration-200 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {t('agendar')}
            </Link>
          </div>

          {/* Hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open
              ? (locale === 'es' ? 'Cerrar menú' : 'Close menu')
              : (locale === 'es' ? 'Abrir menú' : 'Open menu')}
            onClick={() => setOpen(v => !v)}
            className="relative flex h-11 w-11 flex-col items-center justify-center lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <span aria-hidden="true" className={['absolute block h-px w-[22px] bg-navy origin-center transition-all duration-200 ease-out', open ? 'rotate-45' : '-translate-y-[6px]'].join(' ')} />
            <span aria-hidden="true" className={['absolute block h-px w-[22px] bg-navy transition-all duration-150', open ? 'opacity-0 scale-x-0' : ''].join(' ')} />
            <span aria-hidden="true" className={['absolute block h-px w-[22px] bg-navy origin-center transition-all duration-200 ease-out', open ? '-rotate-45' : 'translate-y-[6px]'].join(' ')} />
          </button>
        </nav>
      </header>

      {/* ─── Mobile Menu ─────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={[
          'fixed inset-0 top-16 z-40 bg-warm-white lg:hidden',
          'transition-opacity duration-200 ease-out',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <nav
          aria-label={locale === 'es' ? 'Menú de navegación' : 'Navigation menu'}
          className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-2 sm:px-10"
        >
          <ul role="list" className="flex flex-col">
            {links.map(({ href, label }, i) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? 'page' : undefined}
                    style={{ transitionDelay: open ? `${i * 35 + 30}ms` : '0ms' }}
                    className={[
                      'flex items-center border-b border-navy/8 py-5 font-heading text-[1.625rem] transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue',
                      active ? 'text-blue' : 'text-navy hover:text-blue',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={`/${locale}/contacto`}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="flex h-14 items-center justify-center bg-navy font-body font-medium text-warm-white transition-colors hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {t('agendar')}
            </Link>

            {/* Language switcher — mobile */}
            <div
              role="group"
              aria-label={langLabel}
              className="flex items-center justify-center gap-3 py-2 font-body text-sm"
            >
              <span className="font-medium text-navy" aria-current="true">
                {locale === 'es' ? 'Español' : 'English'}
              </span>
              <span aria-hidden="true" className="h-3.5 w-px bg-navy/20" />
              <Link
                href={otherLocalePath}
                onClick={close}
                tabIndex={open ? 0 : -1}
                aria-label={switchLabel}
                className="text-navy/35 transition-colors duration-150 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                {otherLocale === 'es' ? 'Español' : 'English'}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
