'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center relative overflow-hidden">
      {/* Giant 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[30vw] font-black text-brand-gold/5 leading-none">
          404
        </span>
      </div>

      <div className="relative z-10 text-center px-6">
        <p className="text-label text-brand-gold mb-6">PAGE NOT FOUND</p>
        <h1 className="text-display-lg mb-4">This Road Doesn&apos;t Exist.</h1>
        <p className="text-text-muted text-lg mb-10 font-body">
          Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-gold text-bg-primary font-semibold rounded-card
            hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all"
        >
          Back to Home
          <span>→</span>
        </Link>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" suppressHydrationWarning>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-brand-gold/20"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i % 2)}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
