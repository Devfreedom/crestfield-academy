import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Landing-page hero.
 *
 * The photograph is served from /public/images (see ATTRIBUTION.md next to it)
 * so the page makes no third-party requests and the strict CSP still holds.
 * `priority` + `fetchPriority="high"` make it the LCP resource.
 *
 * Contrast: the photo is covered by a navy gradient that is 85% opaque on the
 * left (where the text sits) and 35% opaque on the right, plus a bottom fade.
 * All foreground text is white, off-white or gold on navy — never navy on navy.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[540px] items-center overflow-hidden bg-navy lg:min-h-[640px]">
      <Image
        src="/images/hero-students.jpg"
        alt="Students in navy-blue school uniforms outside a school building on a bright day"
        fill
        /* Next 16 deprecates `priority` in favour of `preload`, which inserts a
           <link rel="preload"> in the head so the LCP image starts downloading
           before the body is parsed. `fetchPriority="high"` raises the fetch
           priority of the request itself. */
        preload
        fetchPriority="high"
        sizes="100vw"
        /* Slow 8s settle from scale 1.08 → 1. The origin matches the
           object-position crop focus so faces stay anchored; transform-only,
           so it never causes layout shift. Reduced motion disables it. */
        className="origin-[50%_20%] object-cover object-[center_20%] animate-[hero-zoom_8s_ease-out_forwards]"
      />

      {/* Directional readability overlay: strong on the left where the copy sits,
          opening up on the right so the students look vibrant and natural. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,75,0.92)_0%,rgba(11,31,75,0.78)_42%,rgba(11,31,75,0.20)_100%)]"
      />
      {/* Bottom fade so the elevated stats strip blends cleanly. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,rgba(11,31,75,0.85)_0%,rgba(11,31,75,0)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          <span
            className="mb-6 inline-flex animate-[fade-up_0.6s_ease-out_both] items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#0B1F4B]/60 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm"
            style={{ animationDelay: '0ms' }}
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#C9A227]" />
            Admissions Open for 2026/2027 Academic Session
          </span>

          <h1
            className="mb-6 animate-[fade-up_0.6s_ease-out_both] font-poppins text-4xl font-bold leading-tight text-white lg:text-6xl"
            style={{ animationDelay: '100ms' }}
          >
            Where Character Meets Excellence
          </h1>

          <p
            className="mb-8 max-w-2xl animate-[fade-up_0.6s_ease-out_both] text-lg leading-relaxed text-slate-200 lg:text-xl"
            style={{ animationDelay: '200ms' }}
          >
            Crestfield Academy offers a world-class British-Nigerian curriculum from JSS1 to SS3,
            nurturing future leaders with integrity, discipline, and academic excellence in Abuja.
          </p>

          <div
            className="flex flex-col gap-4 animate-[fade-up_0.6s_ease-out_both] sm:flex-row"
            style={{ animationDelay: '300ms' }}
          >
            <Link
              href="/admissions"
              className="group flex items-center justify-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-bold text-navy transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
            >
              Apply Now{' '}
              <ArrowRight
                size={20}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/academics"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition-all duration-200 ease-out hover:border-gold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Academics
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
