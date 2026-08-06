'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { Publication } from '@/data/publications';

const PDFThumbnail = dynamic(() => import('./PDFThumbnail'), {
  ssr: false,
  loading: () => <CardThumbnailSkeleton />,
});

const PDFReader = dynamic(() => import('./PDFReader'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-1 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/[0.12] border-t-white/50" />
    </div>
  ),
});

type Filter = 'all' | 'article' | 'video' | 'recognition' | 'reference';

const FILTER_LABELS: Record<Filter, string> = {
  all:         'Todos',
  article:     'Artículos',
  video:       'Videos',
  recognition: 'Reconocimientos',
  reference:   'Referencias',
};

// ─── Skeletons ────────────────────────────────────────────────────────────────

function CardThumbnailSkeleton() {
  return <div className="h-full w-full animate-pulse bg-navy/[0.05]" />;
}

// ─── Badges ───────────────────────────────────────────────────────────────────

const TYPE_BADGE: Record<Publication['type'], { label: string; cls: string }> = {
  article:     { label: 'Artículo',       cls: 'bg-red/[0.1] text-red' },
  video:       { label: 'Video',          cls: 'bg-blue/[0.1] text-blue' },
  recognition: { label: 'Reconocimiento', cls: 'bg-navy/[0.07] text-navy/55' },
  reference:   { label: 'Referencia',     cls: 'bg-navy/[0.05] text-navy/40' },
};

function TypeBadge({ type }: { type: Publication['type'] }) {
  const { label, cls } = TYPE_BADGE[type];
  return (
    <span className={[
      'inline-flex items-center rounded-full px-2.5 py-0.5 font-body text-[0.5rem] font-semibold uppercase tracking-[0.16em]',
      cls,
    ].join(' ')}>
      {label}
    </span>
  );
}

// ─── Video thumbnail ──────────────────────────────────────────────────────────

function VideoThumbnail({ videoId }: { videoId: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-navy/40">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
          <PlayIcon className="h-4 w-4 translate-x-0.5 text-navy" />
        </div>
      </div>
    </div>
  );
}

// ─── Colores de placeholder por tipo ─────────────────────────────────────────

const PLACEHOLDER_BG: Record<Publication['type'], string> = {
  article:     'bg-red/[0.06]',
  video:       'bg-blue/[0.06]',
  recognition: 'bg-navy/[0.05]',
  reference:   'bg-navy/[0.04]',
};

// ─── Tarjeta ──────────────────────────────────────────────────────────────────

function PublicationCard({
  pub,
  onOpen,
}: {
  pub: Publication;
  onOpen: (p: Publication) => void;
}) {
  const [pdfStatus, setPdfStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const isInteractive = !!(pub.pdfPath || pub.videoId);

  const handleClick = () => {
    if (!isInteractive) return;
    // Reconocimientos y referencias — abrir PDF en nueva pestaña siempre
    if (pub.pdfPath && (pub.type === 'recognition' || pub.type === 'reference')) {
      window.open(pub.pdfPath, '_blank', 'noopener,noreferrer');
      return;
    }
    // Artículo que pdfjs no pudo cargar → también nueva pestaña
    if (pub.pdfPath && pdfStatus === 'error') {
      window.open(pub.pdfPath, '_blank', 'noopener,noreferrer');
      return;
    }
    onOpen(pub);
  };

  return (
    <article
      className={[
        'group flex flex-row sm:flex-col border border-navy/[0.11] bg-white',
        'shadow-[0_2px_12px_-2px_rgba(13,34,64,0.09)]',
        'transition-[box-shadow,transform] duration-200',
        isInteractive
          ? 'cursor-pointer hover:shadow-[0_8px_36px_-6px_rgba(13,34,64,0.18)] hover:-translate-y-0.5'
          : '',
      ].join(' ')}
      onClick={handleClick}
      style={isInteractive ? { touchAction: 'manipulation' } : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
      } : undefined}
      aria-label={isInteractive ? `Abrir: ${pub.title}` : undefined}
    >
      {/* ── Thumbnail ─────────────────────────────────────── */}
      {/* Mobile: franja vertical fija izquierda. sm+: barra horizontal con aspect ratio */}
      <div className="relative w-[96px] shrink-0 overflow-hidden bg-navy/[0.03] sm:w-full sm:aspect-[16/10]">
        {pub.pdfPath ? (
          <>
            <div className={pdfStatus === 'error' ? 'invisible absolute inset-0' : 'absolute inset-0'}>
              <PDFThumbnail
                pdfPath={pub.pdfPath}
                fill
                variant="light"
                onStatusChange={setPdfStatus}
              />
            </div>

            {pdfStatus === 'error' && (
              <div className={[
                'absolute inset-0 flex flex-col justify-between overflow-hidden p-3 sm:p-5',
                PLACEHOLDER_BG[pub.type],
              ].join(' ')}>
                <TypeBadge type={pub.type} />
                <span
                  className="select-none self-end font-heading font-light leading-none text-navy/[0.1]"
                  style={{ fontSize: 'clamp(2rem, 8vw, 5.5rem)' }}
                  aria-hidden="true"
                >
                  {pub.year}
                </span>
              </div>
            )}
          </>
        ) : pub.type === 'video' && pub.videoId ? (
          <VideoThumbnail videoId={pub.videoId} />
        ) : (
          <CardThumbnailSkeleton />
        )}

        {isInteractive && (
          <div className="absolute inset-0 bg-navy/0 transition-colors duration-200 group-hover:bg-navy/[0.04]" />
        )}
      </div>

      {/* ── Contenido ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-2 p-4 sm:gap-3 sm:p-6">

        {/* Meta superior */}
        <div className="flex items-center gap-2">
          <TypeBadge type={pub.type} />
          {pub.journal && (
            <span className="hidden sm:inline font-body text-[0.65rem] text-navy/55 before:mr-2 before:text-navy/30 before:content-['·']">
              {pub.journal}
            </span>
          )}
          <span className="ml-auto font-body text-[0.6rem] tabular-nums text-navy/45">{pub.year}</span>
        </div>

        {/* Título */}
        <h3
          className="font-heading font-light leading-snug text-navy transition-colors duration-150 group-hover:text-blue"
          style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.5rem)' }}
        >
          {pub.title}
        </h3>

        {/* Autores */}
        <p className="font-body text-[0.75rem] leading-relaxed text-navy/60 sm:text-[0.775rem]">
          {pub.authors}
        </p>

        {/* Abstract — solo en desktop */}
        {pub.abstract && (
          <p className="hidden sm:block line-clamp-3 font-body text-[0.825rem] leading-[1.75] text-navy/50">
            {pub.abstract}
          </p>
        )}

        {/* Tags — solo en desktop */}
        {pub.tags.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1.5 pt-1">
            {pub.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full border border-navy/[0.15] px-2.5 py-0.5 font-body text-[0.5rem] font-medium uppercase tracking-[0.13em] text-navy/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Acciones */}
        <div className="mt-auto flex items-center gap-3 border-t border-navy/[0.08] pt-3 sm:gap-5 sm:pt-5">
          {isInteractive && (
            <button
              onClick={(e) => { e.stopPropagation(); handleClick(); }}
              style={{ touchAction: 'manipulation' }}
              className="inline-flex items-center gap-1.5 font-body text-[0.75rem] font-medium text-navy/65 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40"
            >
              <EyeIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">
                {pub.type === 'video' ? 'Ver video' : (pub.type === 'recognition' || pub.type === 'reference') ? 'Ver documento' : 'Leer artículo'}
              </span>
            </button>
          )}
          {pub.pdfPath && (
            <a
              href={pub.pdfPath}
              download
              onClick={(e) => e.stopPropagation()}
              style={{ touchAction: 'manipulation' }}
              className="ml-auto inline-flex items-center gap-1.5 font-body text-[0.75rem] text-navy/35 transition-colors hover:text-navy/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40"
            >
              <DownloadIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Descargar</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function PublicationModal({ pub, onClose }: { pub: Publication; onClose: () => void }) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { closeBtnRef.current?.focus(); }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={pub.title}
        className="fixed inset-x-3 inset-y-3 z-[61] flex flex-col bg-[#0b1524] sm:inset-x-6 sm:inset-y-6 lg:inset-x-10 lg:inset-y-8"
      >
        <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/[0.08] px-5">
          <div className="flex min-w-0 items-center gap-3">
            <TypeBadge type={pub.type} />
            <p className="truncate font-body text-[0.775rem] text-white/45">{pub.title}</p>
          </div>
          <div className="flex shrink-0 items-center">
            {(pub.pdfPath || pub.videoId) && (
              <a
                href={pub.pdfPath ?? `https://www.youtube.com/watch?v=${pub.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center text-white/30 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                title="Abrir en nueva pestaña"
              >
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            )}
            {pub.pdfPath && (
              <a
                href={pub.pdfPath}
                download
                className="flex h-10 w-10 items-center justify-center text-white/30 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                title="Descargar PDF"
              >
                <DownloadIcon className="h-4 w-4" />
              </a>
            )}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              style={{ touchAction: 'manipulation' }}
              className="flex h-10 w-10 items-center justify-center text-white/30 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Cerrar"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {pub.type === 'article' && pub.pdfPath ? (
            <div className="flex w-full flex-col overflow-hidden">
              <PDFReader pdfPath={pub.pdfPath} title={pub.title} downloadHref={pub.pdfPath} />
            </div>
          ) : pub.type === 'video' && pub.videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${pub.videoId}?autoplay=1&rel=0`}
              title={pub.title}
              className="h-full w-full"
              style={{ border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function PublicationsClient({ items }: { items: Publication[] }) {
  const [filter, setFilter]     = useState<Filter>('all');
  const [selected, setSelected] = useState<Publication | null>(null);

  const availableTypes = (['article', 'video', 'recognition', 'reference'] as const).filter(t =>
    items.some(p => p.type === t)
  );
  const showFilters = availableTypes.length > 1;

  const filtered = items.filter(p => filter === 'all' || p.type === filter);

  const open = useCallback((pub: Publication) => {
    if (!pub.pdfPath && !pub.videoId) return;
    setSelected(pub);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected, close]);

  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  return (
    <>
      {/* Barra superior */}
      <div className="flex items-center justify-between border-b border-navy/[0.07] py-5">
        <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy/30">
          {filtered.length === 1 ? '1 resultado' : `${filtered.length} resultados`}
        </span>

        {showFilters && (
          <div className="flex gap-5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filtrar">
            {(['all', ...availableTypes] as Filter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ touchAction: 'manipulation' }}
                aria-pressed={filter === f}
                className={[
                  'font-body text-[0.725rem] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40',
                  filter === f
                    ? 'font-medium text-navy'
                    : 'text-navy/40 [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy/70',
                ].join(' ')}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-20 text-center">
          <FileIcon className="h-12 w-12 text-navy/15" />
          <div className="flex flex-col gap-2">
            <p className="font-heading text-[1.375rem] font-light text-navy/40">
              Publicaciones en preparación
            </p>
            <p className="max-w-[38ch] font-body text-[0.875rem] leading-relaxed text-navy/30">
              Próximamente encontrará aquí artículos científicos y material
              académico del Dr. Alvarado.
            </p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-12 font-body text-[0.9rem] italic text-navy/35">
          No hay publicaciones en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2">
          {filtered.map(pub => (
            <PublicationCard key={pub.id} pub={pub} onOpen={open} />
          ))}
        </div>
      )}

      {selected && <PublicationModal pub={selected} onClose={close} />}
    </>
  );
}

// ─── Iconos ───────────────────────────────────────────────────────────────────

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className={className}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
