'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HERO_SLIDES } from '@/data/heroImages';

const ROTATE_MS = 9000;

type Props = {
  /** Per-page offset into the shared slide roster so each page opens on a
   *  different image. Any integer is fine — it wraps. */
  seed?: number;
};

/**
 * Rotating in-game imagery behind the top of interior pages. Renders as an
 * absolutely-positioned band anchored to the document top (behind the
 * translucent nav) that crossfades through the hero roster and dissolves
 * into the page background. Decorative only — pointer-events pass through
 * and screen readers skip it.
 */
export function PageBackdrop({ seed = 0 }: Props) {
  const start = ((seed % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length;
  const [index, setIndex] = useState(start);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden sm:h-[480px]"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <Image
            src={HERO_SLIDES[index].src}
            alt=""
            fill
            priority={index === start}
            sizes="100vw"
            className={`object-cover ${reducedMotion ? '' : 'animate-slow-zoom'}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dissolve into the page background for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-spaceBlack/60 via-spaceBlack/80 to-spaceBlack"
        aria-hidden
      />
      <div className="starfield absolute inset-0" aria-hidden />
    </div>
  );
}
