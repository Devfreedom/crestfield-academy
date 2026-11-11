import Link from 'next/link';
import { ArrowRight, Quote, Users, Shield, BookOpen, Flame } from 'lucide-react';

const VALUES = [
  {
    name: 'Excellence',
    description: 'We strive for the highest standards in academics, character, and every endeavour.',
    icon: Flame,
  },
  {
    name: 'Integrity',
    description: 'Honesty, transparency, and strong moral principles guide all we do.',
    icon: Shield,
  },
  {
    name: 'Discipline',
    description: 'A structured learning environment that fosters responsibility and self-control.',
    icon: BookOpen,
  },
  {
    name: 'Service',
    description: 'We nurture students who serve their community and lead with compassion.',
    icon: Users,
  },
];

const TIMELINE = [
  { year: '2010', event: 'Crestfield Academy founded with a vision for excellence in Abuja.' },
  { year: '2012', event: 'First set of JSS1 students admitted; pioneer teachers employed.' },
  { year: '2015', event: 'Science laboratory and computer center commissioned.' },
  { year: '2018', event: 'First SS3 class graduated with a 100% WAEC pass rate.' },
  { year: '2022', event: 'Expanded to include boarding facilities and new classroom blocks.' },
  { year: '2025', event: '98% WAEC pass rate; admissions open for the 2025/2026 session.' },
];

export default function About() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full border border-gold/30 bg-gold/20 px-4 py-1.5 text-sm font-semibold text-gold">
              About Us
            </span>
            <h1 className="mt-4 mb-6 font-poppins text-4xl font-bold text-navy">Our Story</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Crestfield Academy is a leading secondary school in Abuja, Nigeria, offering world-class
              education from JSS1 to SS3. Founded on the principles of excellence, integrity, discipline,
              and service, we are committed to nurturing well-rounded leaders of tomorrow.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-6 leading-relaxed text-slate-600">
                Located in Plot 12, Gwarinpa, Abuja, Crestfield Academy provides a safe, nurturing,
                and academically rigorous environment where every student is known, valued, and challenged
                to reach their full potential.
              </p>
              <p className="mb-6 leading-relaxed text-slate-600">
                Our British-Nigerian curriculum combines the best of both educational traditions,
                preparing students for WAEC, NECO, and IGCSE examinations while building character
                that lasts a lifetime.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-medium text-white transition-colors hover:bg-navy/90"
              >
                Apply Now <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <figure className="relative">
              <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-gold/10 blur-xl" />
              <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                <Quote className="mb-4 h-10 w-10 text-gold" aria-hidden="true" />
                <blockquote className="mb-6 leading-relaxed text-slate-600 italic">
                  &ldquo;At Crestfield, we do not just teach subjects &mdash; we build futures.&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-bold text-navy">Dr. Adaeze Okonkwo</p>
                  <p className="text-sm text-slate-500">Principal, Crestfield Academy</p>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-poppins text-3xl font-bold text-navy">Our Core Values</h2>
            <p className="mx-auto max-w-2xl text-slate-600">The principles that guide everything we do.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div
                key={value.name}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <value.icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-poppins text-lg font-bold text-navy">{value.name}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-poppins text-3xl font-bold text-navy">Our Journey</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Milestones in Crestfield Academy&rsquo;s history.</p>
          </div>
          <ol className="relative mx-auto max-w-3xl">
            <div aria-hidden="true" className="absolute bottom-0 left-3 top-0 w-0.5 bg-slate-200" />
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative pb-12 pl-12">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-white bg-navy"
                />
                <p className="text-xs font-bold uppercase tracking-wider text-navy/70">{item.year}</p>
                <p className="mt-1 text-slate-600">{item.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
