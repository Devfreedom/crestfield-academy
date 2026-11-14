import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** Pre-footer admissions callout card on the landing page. */
export default function HomeCtaBanner() {
  return (
    <section className="bg-[#F5F6F8] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-[#C9A227]/30 bg-[#0B1F4B] p-8 text-center text-white shadow-xl lg:p-12">
          <h2 className="mb-3 font-poppins text-2xl font-bold text-white lg:text-3xl">
            Ready to Shape Your Child&rsquo;s Future?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-300">
            Give your child the foundation for excellence. Applications are open for the 2026/2027 academic session.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/admissions"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-8 py-4 text-base font-bold text-navy transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105 active:translate-y-0"
            >
              Start Application
              <ArrowRight
                size={20}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-base font-bold text-white transition-all duration-200 ease-out hover:border-[#C9A227] hover:bg-white/10"
            >
              Book a Campus Tour
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
