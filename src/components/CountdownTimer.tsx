'use client';

import { useEffect, useState } from 'react';

type Props = {
  /** Target instant in time. */
  target: Date | string;
  /** Compact = mm:ss in a single chip. Default = full d/h/m/s blocks. */
  variant?: 'full' | 'compact';
  /** Label shown above the timer (full variant only). */
  label?: string;
  className?: string;
};

type Parts = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function diff(target: Date): Parts {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}

export function CountdownTimer({ target, variant = 'full', label, className = '' }: Props) {
  const targetMs = (typeof target === 'string' ? new Date(target) : target).getTime();
  const [parts, setParts] = useState<Parts>(() => diff(new Date(targetMs)));

  useEffect(() => {
    const d = new Date(targetMs);
    setParts(diff(d));
    const id = setInterval(() => setParts(diff(d)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (variant === 'compact') {
    const display = parts.done
      ? '00:00:00'
      : `${pad(parts.days)}:${pad(parts.hours)}:${pad(parts.minutes)}:${pad(parts.seconds)}`;
    return (
      <span
        className={`tabular rounded-md bg-spaceBlack/60 px-2 py-1 font-mono text-sm text-orange ${className}`}
        aria-label="time remaining"
      >
        {display}
      </span>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {label && (
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          {label}
        </span>
      )}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        <Block value={parts.days} unit="DAYS" />
        <Block value={parts.hours} unit="HOURS" />
        <Block value={parts.minutes} unit="MINS" />
        <Block value={parts.seconds} unit="SECS" highlight />
      </div>
    </div>
  );
}

function Block({ value, unit, highlight = false }: { value: number; unit: string; highlight?: boolean }) {
  return (
    <div
      className={`flex min-w-[64px] flex-col items-center justify-center rounded-lg border px-3 py-3 sm:min-w-[88px] sm:px-5 sm:py-4 ${
        highlight
          ? 'border-orange/50 bg-orange/10 text-orange'
          : 'border-white/10 bg-blackMid/70 text-white'
      }`}
    >
      <span className="tabular font-mono text-2xl font-bold leading-none sm:text-4xl">
        {pad(value)}
      </span>
      <span className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-muted">
        {unit}
      </span>
    </div>
  );
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}
