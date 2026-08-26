'use client';

import { useEffect } from 'react';

// Catches errors thrown by the root layout itself (framer-motion's
// PageBackdrop, or anything else that can crash before app/error.tsx's
// boundary is even mounted). Per Next.js, global-error.tsx replaces the
// entire root layout, so it has to supply its own <html>/<body> — none of
// layout.tsx's fonts, nav, or footer are available here. Kept intentionally
// dependency-free (no framer-motion, no client components that touch
// localStorage/timers) so it can never itself be the thing that fails.
// Same noindex-injection logic as app/error.tsx: this shell must never be
// mistaken by Google for real, indexable content.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  useEffect(() => {
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex';
    document.title = 'Temporary error — freeflyevent.com';
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Temporary error — freeflyevent.com</title>
        <meta name="robots" content="noindex" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '5rem 1.5rem',
          background: '#080c14',
          color: '#f5f8ff',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            borderRadius: 999,
            border: '1px solid rgba(255,85,0,0.3)',
            background: 'rgba(255,85,0,0.05)',
            padding: '0.25rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: '#ff5500',
          }}
        >
          Error
        </span>
        <h1 style={{ marginTop: '1.25rem', fontSize: '2.5rem', fontWeight: 700 }}>
          freeflyevent.com hit a temporary error
        </h1>
        <p style={{ marginTop: '1.25rem', maxWidth: 420, color: '#6b7890' }}>
          Free Fly event info is still here — this page just tripped over
          itself. Reload to try again.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              padding: '0.75rem 1.5rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              color: '#080c14',
              background: 'linear-gradient(to bottom, #ff8a3d, #ff5500 55%, #cc4400)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
