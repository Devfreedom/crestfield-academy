import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Decorative background is built entirely in CSS, so the hero needs no
          image request and the LCP element paints immediately. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(201,162,39,0.28),transparent_45%),radial-gradient(circle_at_88%_8%,rgba(255,255,255,0.12),transparent_42%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="max-w-4xl">
          <span className="mb-6 inline-block rounded-full border border-gold/30 bg-gold/20 px-4 py-1.5 text-sm font-semibold text-gold">
            Admissions Open for 2025/2026 Session
          </span>
          <h1 className="mb-6 font-poppins text-4xl font-bold leading-tight lg:text-6xl">
            Where Character Meets Excellence
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-200 lg:text-xl">
            Crestfield Academy offers a world-class British-Nigerian curriculum from JSS1 to SS3,
            nurturing future leaders with integrity, discipline, and academic excellence in Abuja.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/admissions"
              className="flex items-center justify-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-bold text-navy transition-colors hover:bg-gold/90"
            >
              Apply Now <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link
              href="/academics"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10"
            >
              Explore Academics
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
