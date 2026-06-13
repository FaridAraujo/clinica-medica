'use client';

import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Status  = 'loading' | 'ready' | 'error';
type Variant = 'dark' | 'light';

interface PDFThumbnailProps {
  pdfPath: string;
  // fixed width mode (sidebar list)
  width?: number;
  // fill mode: stretches to container width (card grid)
  fill?: boolean;
  variant?: Variant;
}

export default function PDFThumbnail({
  pdfPath,
  width = 180,
  fill = false,
  variant = 'dark',
}: PDFThumbnailProps) {
  const [status, setStatus]       = useState<Status>('loading');
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
    : 'animate-pulse bg-navy/[0.05]';

  const errorBgCls = variant === 'dark'
    ? 'flex items-center justify-center bg-white/[0.04]'
    : 'flex items-center justify-center bg-navy/[0.04]';

  const iconCls = variant === 'dark' ? 'h-7 w-7 text-white/20' : 'h-7 w-7 text-navy/20';

  if (fill) {
    return (
      <div ref={containerRef} className="relative h-full w-full overflow-hidden">
        {/* Skeleton / error */}
        <div
          className={[
            'absolute inset-0 transition-opacity duration-300',
            status === 'ready' ? 'opacity-0' : 'opacity-100',
            status === 'error' ? errorBgCls : skeletonCls,
          ].join(' ')}
        >
          {status === 'error' && <FileIcon className={iconCls} />}
        </div>

        {/* PDF canvas */}
        {renderW > 0 && (
          <div className={['transition-opacity duration-500', status === 'ready' ? 'opacity-100' : 'opacity-0'].join(' ')}>
            <Document
              file={pdfPath}
              onLoadSuccess={() => setStatus('ready')}
              onLoadError={() => setStatus('error')}
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
          status === 'error' ? errorBgCls : skeletonCls,
        ].join(' ')}
      >
        {status === 'error' && <FileIcon className={iconCls} />}
      </div>

      <div className={['transition-opacity duration-500', status === 'ready' ? 'opacity-100' : 'opacity-0'].join(' ')}>
        <Document
          file={pdfPath}
          onLoadSuccess={() => setStatus('ready')}
          onLoadError={() => setStatus('error')}
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
