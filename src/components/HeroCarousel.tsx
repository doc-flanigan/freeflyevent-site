'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HERO_SLIDES as SLIDES } from '@/data/heroImages';

const START = 14;

const ROTATE_MS = 6000;

export function HeroCarousel({ children }: { children?: React.ReactNode }) {
  const [index, setIndex] = useState(START);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="relative h-[68vh] min-h-[520px] w-full overflow-hidden bg-spaceBlack">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <Image
            src={SLIDES[index].src}
            alt={SLIDES[index].alt}
            fill
            priority={index === START}
            sizes="100vw"
            className="object-cover animate-slow-zoom"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic gradient + grid overlay for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-spaceBlack/30 via-spaceBlack/55 to-spaceBlack"
        aria-hidden
      />
      <div className="starfield absolute inset-0" aria-hidden />

      {/* Foreground content */}
      <div className="container-wide relative z-10 flex h-full flex-col justify-end pb-16 sm:pb-24">
        {children}
      </div>

      {/* Slide indicator */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all ${
              i === index ? 'w-8 bg-orange' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
