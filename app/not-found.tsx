import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--cream)' }}>
      <div className="text-center max-w-lg">
        <p
          className="text-[8rem] md:text-[12rem] leading-none font-bold select-none"
          style={{ fontFamily: 'var(--font-cursive)', color: 'var(--gold-light)' }}
        >
          404
        </p>
        <h1
          className="text-2xl md:text-3xl font-semibold mt-2 mb-4"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)' }}
        >
          Page not found
        </h1>
        <p className="text-base mb-8" style={{ color: 'var(--gold)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 text-sm font-semibold tracking-wide uppercase border-2 rounded-full transition-all duration-300 hover:scale-105"
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--gold-dark)',
            borderColor: 'var(--gold)',
            background: 'transparent',
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
