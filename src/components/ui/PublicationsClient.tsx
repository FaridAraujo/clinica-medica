'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { Publication } from '@/data/publications';

// Carga diferida — react-pdf es ~1 MB, solo se descarga al visitar /publicaciones
const PDFThumbnail = dynamic(() => import('./PDFThumbnail'), {
  ssr: false,
  loading: () => <ThumbnailPlaceholder />,
});

const PDFReader = dynamic(() => import('./PDFReader'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-1 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/[0.12] border-t-white/50" />
    </div>
  ),
});

type Filter = 'all' | 'article' | 'video';

const FILTER_LABELS: Record<Filter, string> = {
  all:     'Todos',
  article: 'Artículos',
  video:   'Videos',
};

// ─── Placeholder mientras carga react-pdf ────────────────────────────────────

function ThumbnailPlaceholder() {
  return (
    <div
      className="shrink-0 animate-pulse bg-white/[0.06] ring-1 ring-white/[0.08]"
      style={{ width: 180, height: 255 }}
    />
  );
}

// ─── Badge de tipo ────────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: Publication['type'] }) {
  return (
    <span className={[
      'inline-flex items-center rounded-full px-2 py-0.5 font-body text-[0.5rem] font-semibold uppercase tracking-[0.16em]',
      type === 'article'
        ? 'bg-red/[0.15] text-red'
        : 'bg-white/[0.08] text-white/60',
    ].join(' ')}>
      {type === 'article' ? 'PDF' : 'Video'}
    </span>
  );
}

// ─── Thumbnail de video (YouTube) ─────────────────────────────────────────────

function VideoThumbnail({ videoId }: { videoId: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden ring-1 ring-white/[0.1]"
      style={{ width: 180, height: 255 }}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-navy/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
          <PlayIcon className="h-3.5 w-3.5 translate-x-0.5 text-navy" />
        </div>
      </div>
    </div>
  );
}

// ─── Fila de publicación ──────────────────────────────────────────────────────

function PublicationRow({
  pub,
  onOpen,
}: {
  pub: Publication;
  onOpen: (p: Publication) => void;
}) {
  const isInteractive = !!(pub.pdfPath || pub.videoId);

  return (
    <article
      className={[
        'group grid gap-x-6 gap-y-3 border-b border-white/[0.06] py-7 sm:py-9',
        'grid-cols-[180px_1fr] lg:grid-cols-[180px_1fr_auto]',
        isInteractive ? 'cursor-pointer' : '',
      ].join(' ')}
      onClick={isInteractive ? () => onOpen(pub) : undefined}
      style={isInteractive ? { touchAction: 'manipulation' } : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(pub); }
      } : undefined}
      aria-label={isInteractive ? `Abrir: ${pub.title}` : undefined}
    >
      {/* ── Col izquierda — thumbnail visual ─────────────────────── */}
      <div className="flex flex-col gap-2.5">
        {pub.type === 'article' && pub.pdfPath ? (
          <div className="transition-opacity duration-200 group-hover:opacity-80">
            <PDFThumbnail pdfPath={pub.pdfPath} />
          </div>
        ) : pub.type === 'video' && pub.videoId ? (
          <VideoThumbnail videoId={pub.videoId} />
        ) : (
          <ThumbnailPlaceholder />
        )}
        <span className="font-body text-[0.6rem] font-semibold tabular-nums tracking-[0.1em] text-white/30">
          {pub.year}
        </span>
        <TypeBadge type={pub.type} />
      </div>

      {/* ── Col central — título + meta ──────────────────────────── */}
      <div className="flex flex-col gap-3 pt-1">
        <h3
          className={[
            'font-heading font-light leading-snug text-white/75 transition-colors duration-200',
            isInteractive ? 'group-hover:text-white' : '',
          ].join(' ')}
          style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.625rem)' }}
        >
          {pub.title}
        </h3>

        <p className="font-body text-[0.775rem] text-white/30">
          {pub.journal && (
            <>
              <span>{pub.journal}</span>
              <span className="mx-2 opacity-40">·</span>
            </>
          )}
          {pub.authors}
        </p>

        {pub.abstract && (
          <p className="max-w-[58ch] font-body text-[0.85rem] leading-[1.8] text-white/25">
            {pub.abstract}
          </p>
        )}

        {pub.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {pub.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.1] px-2.5 py-0.5 font-body text-[0.525rem] font-medium uppercase tracking-[0.14em] text-white/25"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Acciones mobile */}
        {isInteractive && (
          <div className="mt-1 flex items-center gap-4 lg:hidden">
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(pub); }}
              style={{ touchAction: 'manipulation' }}
              className="inline-flex items-center gap-1.5 font-body text-[0.725rem] font-medium text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <EyeIcon className="h-3 w-3 shrink-0" />
              {pub.type === 'video' ? 'Ver video' : 'Leer'}
            </button>
            {pub.pdfPath && (
              <a
                href={pub.pdfPath}
                download
                onClick={(e) => e.stopPropagation()}
                style={{ touchAction: 'manipulation' }}
                className="inline-flex items-center gap-1.5 font-body text-[0.725rem] text-white/30 transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <DownloadIcon className="h-3 w-3 shrink-0" />
                Descargar
              </a>
            )}
          </div>
        )}

        {!isInteractive && (
          <p className="mt-1 font-body text-[0.7rem] italic text-white/20">
            Documento próximamente
          </p>
        )}
      </div>

      {/* ── Col derecha — acciones desktop ──────────────────────── */}
      <div className="hidden flex-col items-end gap-2.5 pt-1 lg:flex">
        {pub.pdfPath && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(pub); }}
              style={{ touchAction: 'manipulation' }}
              className="flex h-9 w-9 items-center justify-center text-white/20 transition-colors duration-150 group-hover:text-white/55 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              title="Leer artículo"
            >
              <EyeIcon className="h-4 w-4" />
            </button>
            <a
              href={pub.pdfPath}
              download
              onClick={(e) => e.stopPropagation()}
              style={{ touchAction: 'manipulation' }}
              className="flex h-9 w-9 items-center justify-center text-white/20 transition-colors duration-150 group-hover:text-white/55 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              title="Descargar PDF"
            >
              <DownloadIcon className="h-4 w-4" />
            </a>
          </>
        )}
        {pub.videoId && (
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(pub); }}
            style={{ touchAction: 'manipulation' }}
            className="flex h-9 w-9 items-center justify-center text-white/20 transition-colors duration-150 group-hover:text-white/55 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            title="Ver video"
          >
            <PlayIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </article>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function PublicationModal({
  pub,
  onClose,
}: {
  pub: Publication;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-navy/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={pub.title}
        className="fixed inset-x-3 inset-y-3 z-[61] flex flex-col bg-[#0b1524] sm:inset-x-6 sm:inset-y-6 lg:inset-x-10 lg:inset-y-8"
      >
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/[0.08] px-5">
          <div className="flex min-w-0 items-center gap-3">
            <TypeBadge type={pub.type} />
            <p className="truncate font-body text-[0.775rem] text-white/45">
              {pub.title}
            </p>
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

        {/* Cuerpo */}
        <div className="flex flex-1 overflow-hidden">
          {pub.type === 'article' && pub.pdfPath ? (
            <div className="flex w-full flex-col overflow-hidden">
              <PDFReader
                pdfPath={pub.pdfPath}
                title={pub.title}
                downloadHref={pub.pdfPath}
              />
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

  const hasArticles = items.some(p => p.type === 'article');
  const hasVideos   = items.some(p => p.type === 'video');
  const showFilters = hasArticles && hasVideos;

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
      {/* Barra superior: contador + filtros */}
      <div className="flex items-center justify-between border-b border-white/[0.06] py-5">
        <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/25">
          {filtered.length === 1 ? '1 resultado' : `${filtered.length} resultados`}
        </span>

        {showFilters && (
          <div className="flex gap-5" role="group" aria-label="Filtrar">
            {(['all', 'article', 'video'] as Filter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ touchAction: 'manipulation' }}
                aria-pressed={filter === f}
                className={[
                  'font-body text-[0.725rem] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
                  filter === f
                    ? 'font-medium text-white'
                    : 'text-white/35 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/70',
                ].join(' ')}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lista */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-20 text-center">
          <FileIcon className="h-12 w-12 text-white/15" />
          <div className="flex flex-col gap-2">
            <p className="font-heading text-[1.375rem] font-light text-white/40">
              Publicaciones en preparación
            </p>
            <p className="max-w-[38ch] font-body text-[0.875rem] leading-relaxed text-white/25">
              Próximamente encontrará aquí artículos científicos y material
              académico del Dr. Alvarado.
            </p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-12 font-body text-[0.9rem] italic text-white/30">
          No hay publicaciones en esta categoría.
        </p>
      ) : (
        <div>
          {filtered.map(pub => (
            <PublicationRow key={pub.id} pub={pub} onOpen={open} />
          ))}
        </div>
      )}

      {/* Modal */}
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
