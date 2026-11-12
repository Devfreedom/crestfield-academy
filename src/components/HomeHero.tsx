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
    <section className="relative isolate flex min-h-[30rem] items-center overflow-hidden bg-navy lg:min-h-[36rem]">
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
        className="object-cover"
      />

      {/* Readability overlay: strong on the left where the copy sits, lighter
          on the right so the photograph stays visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,75,0.85)_0%,rgba(11,31,75,0.65)_45%,rgba(11,31,75,0.35)_100%)]"
      />
      {/* Vertical scrim over the text band. The horizontal gradient alone is
          not enough: the bright sky and school wall behind the headline
          would drop white text below the WCAG contrast minimum. This layer
          darkens the upper band where the copy sits and fades out below. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,31,75,0.6)_0%,rgba(11,31,75,0.5)_40%,rgba(11,31,75,0.15)_72%,rgba(11,31,75,0)_100%)]"
      />
      {/* Bottom fade so the next section blends into the photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(11,31,75,0.9)_0%,rgba(11,31,75,0)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          <span className="mb-6 inline-block rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-navy">
            Admissions Open for 2025/2026 Session
          </span>

          <h1 className="mb-6 font-poppins text-4xl font-bold leading-tight text-white lg:text-6xl">
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
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10"
            >
              Explore Academics
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
