import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CTAButton } from '@/components/CTAButton';
import { PageBackdrop } from '@/components/PageBackdrop';

export default function NotFound() {
  return (
    <>
      <NavBar />
      <PageBackdrop seed={7} />
      <main className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="eyebrow">404</span>
        <h1 className="heading-display mt-5 text-5xl sm:text-7xl">Lost in quantum.</h1>
        <p className="mt-5 max-w-md text-muted">
          That page didn&apos;t make the jump. Try the homepage or the event
          guide.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-secondary">
            ← Back to home
          </Link>
          <CTAButton trackingLabel="404-referral" />
        </div>
      </main>
      <Footer />
    </>
  );
}
