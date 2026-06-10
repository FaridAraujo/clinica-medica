'use client';

import { useState } from 'react';

interface AccordionItem {
  heading: React.ReactNode;
  body: React.ReactNode;
}

export function AccordionList({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-t border-navy/[0.08]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{ touchAction: 'manipulation' }}
              className="flex w-full items-center justify-between gap-6 py-5 text-left active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue sm:py-6"
            >
              {item.heading}
              <span
                aria-hidden="true"
                className={[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                  'motion-safe:transition-[transform,border-color,color] motion-safe:duration-[220ms]',
                  isOpen ? 'border-red/40 text-red' : 'border-navy/[0.18] text-navy/35',
                ].join(' ')}
                style={{
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
                }}
              >
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  className="h-2.5 w-2.5"
                >
                  <path d="M6 1v10M1 6h10" />
                </svg>
              </span>
            </button>

            {/* Open: 220ms ease-out — Close: 140ms ease-in (asymmetric per motion principles) */}
            <div
              className={[
                'grid',
                isOpen
                  ? 'grid-rows-[1fr] opacity-100 motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-[220ms] motion-safe:ease-out'
                  : 'grid-rows-[0fr] opacity-0 motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-[140ms] motion-safe:ease-in',
              ].join(' ')}
            >
              <div className="overflow-hidden">
                <div className="pb-7">{item.body}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-navy/[0.08]" aria-hidden="true" />
    </div>
  );
}
