'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Worker via CDN — versión siempre alineada con pdfjs-dist instalado
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const W = 108;
const H = Math.round(W * 1.414); // ratio A4

type Status = 'loading' | 'ready' | 'error';

export default function PDFThumbnail({ pdfPath }: { pdfPath: string }) {
  const [status, setStatus] = useState<Status>('loading');

  return (
    <div
      className="relative shrink-0 overflow-hidden ring-1 ring-white/[0.1]"
      style={{ width: W, height: H }}
    >
      {/* Skeleton / error */}
      <div
        className={[
          'absolute inset-0 transition-opacity duration-300',
          status === 'ready' ? 'opacity-0' : 'opacity-100',
          status === 'error'
            ? 'flex items-center justify-center bg-white/[0.04]'
            : 'animate-pulse bg-white/[0.06]',
        ].join(' ')}
      >
        {status === 'error' && (
          <FileIcon className="h-7 w-7 text-white/20" />
        )}
      </div>

      {/* Página renderizada */}
      <div
        className={[
          'transition-opacity duration-500',
          status === 'ready' ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <Document
          file={pdfPath}
          onLoadSuccess={() => setStatus('ready')}
          onLoadError={() => setStatus('error')}
          loading={null}
          error={null}
        >
          <Page
            pageNumber={1}
            width={W}
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
