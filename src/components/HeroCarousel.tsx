'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  { src: '/images/hero/hero-01.jpg', alt: 'Star Citizen spacecraft approaching a space station above a gas giant' },
  { src: '/images/hero/hero-02.jpg', alt: 'Explorer on foot on a rocky alien moon with a spacecraft in the distance' },
  { src: '/images/hero/hero-03.jpg', alt: 'Interior of a capital ship hangar with multiple docked spacecraft' },
  { src: '/images/hero/hero-04.jpg', alt: 'Aerial view of a Star Citizen landing zone city at dusk' },
  { src: '/images/hero/hero-05.jpg', alt: 'Two spacecraft flying in formation through an asteroid field' },
  { src: '/images/hero/hero-06.jpg', alt: 'Ground crew near a landed starship on an alien planet surface' },
  { src: '/images/hero/hero-07.jpg', alt: 'Star Citizen pilot cockpit view overlooking a space station dock' },
  { src: '/images/hero/hero-08.jpg', alt: 'Massive capital ship silhouetted against a bright star in deep space' },
  { src: '/images/hero/hero-09.jpg', alt: 'Quantum travel light-tunnel effect surrounding a spacecraft at jump' },
  { src: '/images/hero/hero-10.jpg', alt: 'Space station exterior with approaching ships against a nebula backdrop' },
  { src: '/images/hero/hero-11.jpg', alt: 'Star Citizen spacecraft hull detail with planet curvature in background' },
  { src: '/images/hero/hero-12.jpg', alt: 'Combat spacecraft banking through an asteroid field debris cloud' },
];

const ROTATE_MS = 6000;

export function HeroCarousel({ children }: { children?: React.ReactNode }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

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
            priority={index === 0}
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
