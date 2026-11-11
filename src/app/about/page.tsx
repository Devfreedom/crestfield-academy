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
    description: 'Structured learning environment that fosters responsibility and self-control.',
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
  { year: '2018', event: 'First SS3 class graduated with 100% WAEC pass rate.' },
  { year: '2022', event: 'Expanded to include boarding facilities and new classroom blocks.' },
  { year: '2025', event: '98% WAEC pass rate; admissions open for 2025/2026 session.' },
];

export default function About() {
  return (
    <div className="flex flex-col flex-1">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-semibold border border-gold/30">
              About Us
            </span>
            <h1 className="font-poppins text-4xl font-bold text-navy mt-4 mb-6">Our Story</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Crestfield Academy is a leading secondary school in Abuja, Nigeria, offering world-class
              education from JSS1 to SS3. Founded on the principles of excellence, integrity, discipline,
              and service, we are committed to nurturing well-rounded leaders of tomorrow.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Located in Plot 12, Gwarinpa, Abuja, Crestfield Academy provides a safe, nurturing,
                and academically rigorous environment where every student is known, valued, and challenged
                to reach their full potential.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our British-Nigerian curriculum combines the best of both educational traditions,
                preparing students for WAEC, NECO, and IGCSE examinations while building character
                that lasts a lifetime.
              </p>
              <Link href="/admissions" className="bg-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-navy/90 transition-colors inline-flex items-center gap-2">
                Apply Now <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gold/10 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                <Quote className="w-10 h-10 text-gold mb-4" />
                <p className="text-slate-600 leading-relaxed mb-6 italic">
                  "At Crestfield, we don't just teach subjects — we build futures."
                </p>
                <p className="font-bold text-navy">Dr. Adaeze Okonkwo</p>
                <p className="text-sm text-slate-500">Principal, Crestfield Academy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-navy mb-4">Our Core Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <div key={value.name} className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mx-auto mb-4">
                  <value.icon size={24} />
                </div>
                <h3 className="font-poppins text-lg font-bold text-navy mb-2">{value.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-navy mb-4">Our Journey</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Milestones in Crestfield Academy's history.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-200" />
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="relative pl-12 pb-12">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-navy border-2 border-white" />
                <span className="text-xs font-bold text-navy/70 uppercase tracking-wider">{item.year}</span>
                <p className="text-slate-600 mt-1">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}