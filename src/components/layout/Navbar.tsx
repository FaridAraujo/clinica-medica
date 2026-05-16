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

  const links = [
    { href: `/${locale}/consultorio`, label: t('consultorio') },
    { href: `/${locale}/doctor`,      label: t('sobre') },
    { href: `/${locale}/especialidades`, label: t('especialidades') },
    { href: `/${locale}/contacto`,    label: t('contacto') },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Sobre el hero: navbar transparente con texto blanco
  // Fuera del hero (o páginas internas): fondo sólido con texto navy
  const overHero = !ctaVisible;

  return (
    <>
      {/* ─── Header ─────────────────────────────────────────────── */}
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
          overHero ? 'bg-transparent' : 'bg-warm-white',
          scrolled && !overHero ? 'shadow-[0_1px_0_0_rgba(13,34,64,0.08)]' : '',
        ].join(' ')}
      >
        <nav
          aria-label="Navegación principal"
          className="flex h-16 items-center justify-between px-6 sm:px-10 lg:px-14"
        >
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <MedicalCrossIcon className="h-3.5 w-3.5 shrink-0 text-red" aria-hidden="true" />
            <div className="flex flex-col leading-none">
              <span className={[
                'font-heading text-[1.125rem] font-medium transition-colors duration-300',
                overHero ? 'text-white' : 'text-navy',
              ].join(' ')}>
                Dr. Alvarado
              </span>
              <span className={[
                'font-body text-[0.625rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
                overHero ? 'text-white/40' : 'text-navy/40',
              ].join(' ')}>
                Consultorio Médico · Heredia
              </span>
            </div>
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
                      overHero
                        ? active ? 'text-white' : 'text-white/55 hover:text-white'
                        : active ? 'text-navy'  : 'text-navy/55 hover:text-navy',
                    ].join(' ')}
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute -bottom-px left-0 h-px transition-[width] duration-200 ease-out',
                        overHero ? 'bg-white' : 'bg-blue',
                        active ? 'w-full' : 'w-0 group-hover:w-full',
                      ].join(' ')}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA — enlace editorial, no botón. Se oculta sobre el hero. */}
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
              href={`/${locale}/agendar`}
              tabIndex={ctaVisible ? 0 : -1}
              className="group relative inline-flex items-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            >
              <span className="relative font-body text-[0.825rem] font-medium text-navy transition-colors duration-200 group-hover:text-blue">
                {t('agendar')}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-navy/25 transition-colors duration-200 group-hover:bg-blue"
                />
              </span>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(v => !v)}
            className="relative flex h-11 w-11 flex-col items-center justify-center lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            {['', '', ''].map((_, i) => (
              <span key={i} aria-hidden="true" className={[
                'absolute block h-px w-[22px] origin-center transition-all duration-200 ease-out',
                overHero ? 'bg-white' : 'bg-navy',
                i === 0 ? (open ? 'rotate-45'    : '-translate-y-[6px]') : '',
                i === 1 ? (open ? 'opacity-0 scale-x-0 duration-150' : '') : '',
                i === 2 ? (open ? '-rotate-45'   : 'translate-y-[6px]')  : '',
              ].join(' ')} />
            ))}
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
          aria-label="Menú de navegación"
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
              href={`/${locale}/agendar`}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="flex h-14 items-center justify-center bg-navy font-body font-medium text-warm-white transition-colors hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {t('agendar')}
            </Link>

          </div>
        </nav>
      </div>
    </>
  );
}

function MedicalCrossIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" className={className} {...props}>
      <path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" />
    </svg>
  );
}
