'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Route-level error boundary. Next's default fallback here is a bare
// "Application error: a client-side exception has occurred" shell that
// still returns 200 and gets indexed — Google has clustered pages that
// render this shell (notably /is-star-citizen-free) with a spam-mirror's
// soft-404 space and hijacked the canonical. This boundary replaces that
// shell with branded content AND forces the page noindex client-side
// (Google's renderer executes JS and honors a JS-injected robots meta),
// so a transient render failure can never again be mistaken for real,
// indexable content.
export default function Error({
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
    <main className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="eyebrow">Error</span>
      <h1 className="heading-display mt-5 text-4xl sm:text-6xl">
        freeflyevent.com hit a temporary error
      </h1>
      <p className="mt-5 max-w-md text-muted">
        Free Fly event info is still here — this page just tripped over
        itself. Reload to try again, or head back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => reset()} className="btn-primary">
          Reload
        </button>
        <Link href="/" className="btn-secondary">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
