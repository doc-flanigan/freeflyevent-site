'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  { src: '/images/hero/hero-01.jpg', alt: 'A UEE Bengal carrier in orbit high above a planet' },
  { src: '/images/hero/hero-02.jpg', alt: 'An armored trooper overlooking a Star Citizen city skyline' },
  { src: '/images/hero/hero-03.jpg', alt: 'A spacecraft backlit by the sun on a snowy planet surface' },
  { src: '/images/hero/hero-04.jpg', alt: 'The interior of a capital-ship hangar with docked spacecraft' },
  { src: '/images/hero/hero-05.jpg', alt: 'A spacecraft in orbit above a cloud-wrapped planet' },
  { src: '/images/hero/hero-06.jpg', alt: 'A starship and ground rover on a misty frontier moon' },
  { src: '/images/hero/hero-07.jpg', alt: 'A pilot beside a ship in an orange desert dust storm' },
  { src: '/images/hero/hero-08.jpg', alt: 'A glowing blue orbital hologram inside a space station' },
  { src: '/images/hero/hero-09.jpg', alt: 'A large industrial capital ship seen up close' },
  { src: '/images/hero/hero-10.jpg', alt: 'A banded gas giant framed by a rocky canyon arch' },
  { src: '/images/hero/hero-11.jpg', alt: 'A spacecraft streaking through quantum travel' },
  { src: '/images/hero/hero-12.jpg', alt: 'A starship silhouetted against a golden sunset on a mountain ridge' },
  { src: '/images/hero/hero-13.jpg', alt: 'A Sabre fighter banking over a green planet' },
  { src: '/images/hero/hero-14.jpg', alt: 'A Hammerhead gunship patrolling above a cratered moon' },
  { src: '/images/hero/hero-15.jpg', alt: 'A formation of fighters over a lake at sunset' },
  { src: '/images/hero/hero-16.jpg', alt: 'Two bombers flying above golden sunset clouds' },
  { src: '/images/hero/hero-17.jpg', alt: 'An F8C Lightning on a landing pad in a hazy city' },
  { src: '/images/hero/hero-18.jpg', alt: 'An Idris frigate firing its railgun in a bright flash' },
];

const START = 14;

const ROTATE_MS = 6000;

export function HeroCarousel({ children }: { children?: React.ReactNode }) {
  const [index, setIndex] = useState(START);

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
