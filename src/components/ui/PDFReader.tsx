'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Status = 'loading' | 'ready' | 'error';

interface PDFReaderProps {
  pdfPath: string;
  title: string;
  /** Botón de descarga y apertura externa (pasado desde el padre) */
  downloadHref: string;
}

export default function PDFReader({ pdfPath, title, downloadHref }: PDFReaderProps) {
  const [status, setStatus]           = useState<Status>('loading');
  const [numPages, setNumPages]       = useState(0);
  const [pageNumber, setPageNumber]   = useState(1);
  const [containerW, setContainerW]   = useState(800);
  const containerRef                  = useRef<HTMLDivElement>(null);

  // Mide el contenedor para escalar el PDF al ancho disponible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerW(Math.floor(entry.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pageW = Math.min(containerW - 48, 840);

  const prev = useCallback(() => setPageNumber(p => Math.max(1, p - 1)), []);
  const next = useCallback(() => setPageNumber(p => Math.min(numPages, p + 1)), [numPages]);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setStatus('ready');
  }, []);

  const onLoadError = useCallback(() => setStatus('error'), []);

  return (
    <div className="flex h-full flex-col overflow-hidden">

      {/* ── Barra de paginación ───────────────────────────────────── */}
      {status === 'ready' && numPages > 1 && (
        <div className="flex shrink-0 items-center justify-center gap-5 border-b border-white/[0.07] py-3">
          <button
            onClick={prev}
            disabled={pageNumber <= 1}
            style={{ touchAction: 'manipulation' }}
            className="flex h-8 w-8 items-center justify-center text-white/40 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="min-w-[60px] text-center font-body text-[0.7rem] tabular-nums text-white/35">
            {pageNumber} / {numPages}
          </span>

          <button
            onClick={next}
            disabled={pageNumber >= numPages}
            style={{ touchAction: 'manipulation' }}
            className="flex h-8 w-8 items-center justify-center text-white/40 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── Área scrollable del PDF ───────────────────────────────── */}
      <div
        ref={containerRef}
        className="flex flex-1 flex-col items-center overflow-y-auto py-6 px-4"
      >

        {/* Loading */}
        {status === 'loading' && (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/[0.12] border-t-white/50" />
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-5">
            <p className="font-body text-[0.875rem] text-white/35">
              No se pudo cargar el documento.
            </p>
            <div className="flex gap-3">
              <a
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 bg-white/10 px-5 font-body text-[0.8rem] text-white transition-colors hover:bg-white/15"
              >
                Abrir PDF
              </a>
              <a
                href={downloadHref}
                download
                className="inline-flex h-10 items-center gap-2 border border-white/20 px-5 font-body text-[0.8rem] text-white/60 transition-colors hover:text-white"
              >
                Descargar
              </a>
            </div>
          </div>
        )}

        {/* Documento */}
        <Document
          file={pdfPath}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading={null}
          error={null}
          className={status !== 'ready' ? 'hidden' : ''}
        >
          <Page
            pageNumber={pageNumber}
            width={pageW}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading={null}
            error={null}
            className="shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
          />
        </Document>
      </div>

    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
