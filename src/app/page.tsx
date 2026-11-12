import Link from 'next/link';
import { ArrowRight, Users, GraduationCap, ShieldCheck, Award, BookOpen } from 'lucide-react';
import HomeHero from '@/components/HomeHero';
import AtAGlancePanel from '@/components/AtAGlancePanel';
import Reveal from '@/components/Reveal';
import { NEWS_ITEMS } from '@/lib/data';

const STATS = [
  { label: 'Students', value: '850+', icon: Users },
  { label: 'Teachers', value: '62', icon: GraduationCap },
  { label: 'WAEC Pass Rate', value: '98%', icon: Award },
  { label: 'Years of Excellence', value: '14', icon: ShieldCheck },
];

const WHY_CRESTFIELD = [
  {
    title: 'Academic Excellence',
    description:
      'Rigorous British-Nigerian curriculum preparing students for WAEC, NECO, and IGCSE with outstanding results.',
    icon: BookOpen,
  },
  {
    title: 'Character Formation',
    description:
      'We build integrity, discipline, and service-minded leaders who excel beyond the classroom.',
    icon: ShieldCheck,
  },
  {
    title: 'Qualified Teachers',
    description:
      '62 certified, passionate educators dedicated to every student\u2019s success across all subjects.',
    icon: Users,
  },
  {
    title: 'Modern Facilities',
    description:
      'Well-equipped science labs, computer center, library, and sports facilities for holistic learning.',
    icon: GraduationCap,
  },
  {
    title: 'Small Class Sizes',
    description:
      'Personalized attention with optimal teacher-to-student ratios in every class from JSS1 to SS3.',
    icon: Users,
  },
  {
    title: 'Moral & Spiritual Growth',
    description:
      'Values-based education rooted in excellence, integrity, discipline, and service to others.',
    icon: ShieldCheck,
  },
];

const TESTIMONIALS = [
  {
    name: 'Mrs. Folake Adebayo',
    role: 'Parent of SS2 Student',
    text: 'Crestfield Academy has transformed my daughter\u2019s confidence and academic performance. The teachers truly care.',
  },
  {
    name: 'Mr. Chinedu Okafor',
    role: 'Parent of JSS1 Student',
    text: 'Excellent discipline, strong values, and outstanding academics. We are proud to be part of the Crestfield family.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HomeHero />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-gold" aria-hidden="true" />
                <p className="font-poppins text-2xl font-bold text-navy">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-poppins text-3xl font-bold text-navy">Why Crestfield Academy?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A premium private secondary school committed to academic excellence and character formation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {WHY_CRESTFIELD.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <feature.icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-poppins text-lg font-bold text-navy">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <AtAGlancePanel />
            </div>
            <div className="lg:w-1/2">
              <h2 className="mb-6 font-poppins text-3xl font-bold text-navy">Comprehensive Academics</h2>
              <p className="mb-6 leading-relaxed text-slate-600">
                From JSS1 to SS3, we offer Science, Arts, and Commercial streams with expert teachers
                and modern facilities. Our students consistently achieve outstanding results in WAEC,
                NECO, and IGCSE examinations.
              </p>
              <p className="mb-6 leading-relaxed text-slate-600">
                Every student is taught by a subject specialist, assessed continuously, and supported by
                pastoral care, counselling, and club activities that develop leadership and service.
              </p>
              <Link
                href="/academics"
                className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-medium text-white transition-colors hover:bg-navy/90"
              >
                View Academics <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-poppins text-3xl font-bold text-navy">News &amp; Events</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Stay updated with the latest from Crestfield Academy.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {NEWS_ITEMS.map((news) => (
              <article
                key={news.id}
                className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy/70">
                  {news.date}
                </p>
                <h3 className="mb-3 font-poppins text-lg font-bold text-navy">{news.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{news.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-poppins text-3xl font-bold text-navy">What Parents Say</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6"
              >
                <blockquote className="mb-4 text-slate-600">&ldquo;{testimonial.text}&rdquo;</blockquote>
                <figcaption>
                  <p className="font-bold text-navy">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-6 font-poppins text-3xl font-bold">Ready to Join Crestfield?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-300">
            Give your child the foundation for excellence. Applications are open for the 2025/2026 session.
          </p>
          <Link
            href="/admissions"
            className="inline-block rounded-lg bg-gold px-10 py-4 text-lg font-bold text-navy transition-colors hover:bg-gold/90"
          >
            Start Application
          </Link>
        </div>
      </section>
    </div>
  );
}
