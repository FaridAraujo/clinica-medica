'use client';

import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Status  = 'loading' | 'ready' | 'error';
type Variant = 'dark' | 'light';

interface PDFThumbnailProps {
  pdfPath: string;
  width?: number;
  fill?: boolean;
  variant?: Variant;
  onStatusChange?: (status: Status) => void;
}

export default function PDFThumbnail({
  pdfPath,
  width = 180,
  fill = false,
  variant = 'dark',
  onStatusChange,
}: PDFThumbnailProps) {
  const [status, setStatus] = useState<Status>('loading');

  const updateStatus = (s: Status) => {
    setStatus(s);
    onStatusChange?.(s);
  };
  const [renderW, setRenderW]     = useState(fill ? 0 : width);
  const containerRef              = useRef<HTMLDivElement>(null);

  // fill mode — mide el contenedor y actualiza al cambiar
  useEffect(() => {
    if (!fill) return;
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setRenderW(Math.floor(entry.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [fill]);

  const skeletonCls = variant === 'dark'
    ? 'animate-pulse bg-white/[0.06]'
    : 'animate-pulse bg-navy/[0.04]';

  const dark = variant === 'dark';

  if (fill) {
    return (
      <div ref={containerRef} className="relative h-full w-full overflow-hidden">
        {/* Skeleton / error */}
        <div
          className={[
            'absolute inset-0 transition-opacity duration-300',
            status === 'ready' ? 'opacity-0' : 'opacity-100',
            status === 'error' ? 'opacity-0' : skeletonCls,
          ].join(' ')}
        />

        {/* PDF canvas */}
        {renderW > 0 && (
          <div className={['transition-opacity duration-500', status === 'ready' ? 'opacity-100' : 'opacity-0'].join(' ')}>
            <Document
              file={pdfPath}
              onLoadSuccess={() => updateStatus('ready')}
              onLoadError={() => updateStatus('error')}
              loading={null}
              error={null}
            >
              <Page
                pageNumber={1}
                width={renderW}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                loading={null}
                error={null}
              />
            </Document>
          </div>
        )}
      </div>
    );
  }

  // Fixed-width mode
  const H = Math.round(width * 1.414);
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width, height: H }}
    >
      <div
        className={[
          'absolute inset-0 transition-opacity duration-300',
          status === 'ready' ? 'opacity-0' : 'opacity-100',
          status === 'error'
            ? dark
              ? 'flex flex-col items-center justify-center gap-2 bg-white/[0.03]'
              : 'flex flex-col items-center justify-center gap-2 bg-navy/[0.04]'
            : skeletonCls,
        ].join(' ')}
      >
        {status === 'error' && (
          <>
            <FileIcon className={dark ? 'h-6 w-6 text-white/25' : 'h-6 w-6 text-navy/20'} />
            <span className={[
              'px-2 text-center font-body text-[0.5rem] font-medium uppercase tracking-[0.12em]',
              dark ? 'text-white/20' : 'text-navy/30',
            ].join(' ')}>
              Preview no disponible
            </span>
          </>
        )}
      </div>

      <div className={['transition-opacity duration-500', status === 'ready' ? 'opacity-100' : 'opacity-0'].join(' ')}>
        <Document
          file={pdfPath}
          onLoadSuccess={() => updateStatus('ready')}
          onLoadError={() => updateStatus('error')}
          loading={null}
          error={null}
        >
          <Page
            pageNumber={1}
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading={null}
            error={null}
          />
        </Document>
      </div>
    </div>
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
