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
    { href: `/${locale}`,             label: t('inicio')         },
    { href: `/${locale}/consultorio`, label: t('consultorio')   },
    { href: `/${locale}/doctor`,      label: t('sobre')         },
    { href: `/${locale}/especialidades`, label: t('especialidades') },
    { href: `/${locale}/contacto`,    label: t('contacto')      },
  ];

  const isActive = (href: string) => {
    const isHome = href === `/${locale}` || href === `/${locale}/`;
    return isHome ? pathname === href || pathname === `/${locale}/` : pathname === href || pathname.startsWith(`${href}/`);
  };

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
            <MedicalCrossIcon
              className={[
                'h-3.5 w-3.5 shrink-0 text-red transition-opacity duration-300',
                overHero ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
              aria-hidden="true"
            />
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

      {/* ─── Mobile Menu — backdrop ──────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={close}
        className={[
          'fixed inset-0 z-40 bg-navy/40 backdrop-blur-[3px] lg:hidden',
          'transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* ─── Mobile Menu — drawer ────────────────────────────────── */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={[
          'fixed top-0 right-0 bottom-0 z-50 flex w-[min(88vw,340px)] flex-col bg-warm-white lg:hidden',
          'shadow-[-24px_0_48px_-12px_rgba(13,34,64,0.18)]',
          'transition-transform duration-300 ease-[cubic-bezier(0.32,0,0.2,1)]',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Panel header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-navy/[0.08] px-6">
          <Link
            href={`/${locale}`}
            onClick={close}
            tabIndex={open ? 0 : -1}
            className="inline-flex items-center gap-2 font-body text-[0.8rem] font-medium text-navy/55 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M10 3L5 8l5 5" />
            </svg>
            Inicio
          </Link>
          <button
            onClick={close}
            aria-label="Cerrar menú"
            className="flex h-9 w-9 items-center justify-center text-navy/35 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav aria-label="Menú de navegación" className="flex flex-1 flex-col overflow-y-auto">
          <ul role="list" className="flex flex-col px-6">
            {links.map(({ href, label }, i) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? 'page' : undefined}
                    style={{ transitionDelay: open ? `${i * 45 + 60}ms` : '0ms' }}
                    className={[
                      'flex items-center border-b border-navy/[0.07] py-5',
                      'font-heading text-[1.5rem] font-light leading-none',
                      'transition-colors duration-150',
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

          {/* CTA + nota pie */}
          <div className="mt-auto px-6 pb-8 pt-6">
            <Link
              href={`/${locale}/agendar`}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="flex h-14 w-full items-center justify-center bg-navy font-body text-sm font-medium tracking-wide text-warm-white transition-colors hover:bg-blue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {t('agendar')}
            </Link>
            <p className="mt-5 font-body text-[0.625rem] font-medium uppercase tracking-[0.18em] text-navy/30">
              Cirugía Cardiovascular · Heredia, CR
            </p>
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
