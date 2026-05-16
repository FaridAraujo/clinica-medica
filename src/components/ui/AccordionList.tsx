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
              className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue sm:py-6"
            >
              {item.heading}
              <span
                aria-hidden="true"
                className={[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
                  isOpen
                    ? 'rotate-45 border-red/40 text-red'
                    : 'border-navy/[0.18] text-navy/35',
                ].join(' ')}
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

            <div
              className={[
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              ].join(' ')}
            >
              <div className="overflow-hidden">
                <div className="pb-7">
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-navy/[0.08]" aria-hidden="true" />
    </div>
  );
}
