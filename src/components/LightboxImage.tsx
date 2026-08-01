'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  /** Intrinsic width for Next.js optimisation — CSS controls display size */
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
};

export function LightboxImage({ src, alt, width, height, className = '', containerClassName = '' }: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <>
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${containerClassName}`}
        aria-label={`View ${alt} full size`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`rounded-lg transition-opacity group-hover:opacity-90 ${className}`}
        />
        {/* Zoom hint */}
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          Click to enlarge
        </span>
      </button>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal
          aria-label={alt}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-xl border border-white/20 shadow-[0_0_60px_rgba(255,85,0,0.25)]">
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
              />
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange text-xs font-bold text-spaceBlack shadow-lg transition-transform hover:scale-110"
            >
              ✕
            </button>
            <p className="mt-3 text-center text-xs text-white/50">Click outside or press Esc to close</p>
          </div>
        </div>
      )}
    </>
  );
}
