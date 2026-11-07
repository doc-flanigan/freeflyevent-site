'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { logClick } from '@/lib/log-click';

const Ctx = createContext<(() => void) | null>(null);
const SRC = '/images/aurora-mk2-cloudbuster.webp';
const ALT = 'Aurora Mk II Cloudbuster paint';

/** Provider: owns open state + modal. Triggers below open it; focus returns to the trigger on close. */
export function PaintLightbox({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const from = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const show = useCallback(() => {
    from.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    logClick(label, '');
  }, [label]);
  const close = useCallback(() => {
    setOpen(false);
    from.current?.focus();
  }, []);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);
  return (
    <Ctx.Provider value={show}>
      {children}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={ALT}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-2xl leading-none text-white hover:bg-black/80"
            >
              &times;
            </button>
            <Image src={SRC} alt={ALT} width={1600} height={900} sizes="100vw" className="max-h-[90vh] max-w-[96vw] object-contain" onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body,
        )}
    </Ctx.Provider>
  );
}

/** Wraps the image; clickable with no visible style change. */
export function PaintLightboxImageButton({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const show = useContext(Ctx);
  return (
    <button type="button" aria-label="View the Cloudbuster paint full size" onClick={() => show?.()} className={`cursor-zoom-in ${className}`}>
      {children}
    </button>
  );
}

/** Small text link near the credit line. */
export function PaintLightboxLink({ className = '' }: { className?: string }) {
  const show = useContext(Ctx);
  return (
    <button type="button" onClick={() => show?.()} className={`hover:underline ${className}`}>
      View the paint full size
    </button>
  );
}
