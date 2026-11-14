import Link from 'next/link';
import { ArrowRight, Users, GraduationCap, ShieldCheck, Award, BookOpen, Star } from 'lucide-react';
import HomeHero from '@/components/HomeHero';
import AtAGlancePanel from '@/components/AtAGlancePanel';
import HomeCtaBanner from '@/components/HomeCtaBanner';
import Reveal from '@/components/Reveal';
import AnimatedCounter from '@/components/AnimatedCounter';
import { NEWS_ITEMS } from '@/lib/data';

const STATS = [
  { label: 'Students', target: 850, suffix: '+', icon: Users },
  { label: 'Teachers', target: 62, suffix: '', icon: GraduationCap },
  { label: 'WAEC Pass Rate', target: 98, suffix: '%', icon: Award },
  { label: 'Years of Excellence', target: 14, suffix: '', icon: ShieldCheck },
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
    initials: 'FA',
    role: 'Parent of SS2 Student',
    text: 'Crestfield Academy has transformed my daughter\u2019s confidence and academic performance. The teachers truly care.',
  },
  {
    name: 'Mr. Chinedu Okafor',
    initials: 'CO',
    role: 'Parent of JSS1 Student',
    text: 'Excellent discipline, strong values, and outstanding academics. We are proud to be part of the Crestfield family.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HomeHero />

      <section className="bg-[#F5F6F8] pb-12">
        <div className="relative z-10 mx-auto -mt-8 max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 border-t-4 border-t-[#C9A227] bg-white p-6 text-center shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A227]/15 text-[#C9A227]">
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="font-poppins text-3xl font-bold text-[#0B1F4B] lg:text-4xl">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F6F8] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C9A227]">
              Why Choose Us
            </p>
            <h2 className="mb-4 font-poppins text-3xl font-bold text-navy">Why Crestfield Academy?</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A premium private secondary school committed to academic excellence and character formation.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY_CRESTFIELD.map((feature, index) => (
              <Reveal key={feature.title} delayMs={index * 100}>
                <div className="group h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#C9A227]/50 hover:shadow-md">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#0B1F4B]/5 text-[#0B1F4B] transition-colors duration-200 ease-out group-hover:bg-[#C9A227]/20">
                    <feature.icon
                      size={22}
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mb-2 font-poppins text-lg font-bold text-navy">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              </Reveal>
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
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                British-Nigerian Curriculum
              </p>
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
                className="group inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-medium text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-navy/90 hover:shadow-lg active:translate-y-0"
              >
                View Academics{' '}
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F6F8] py-16">
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
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <span className="mb-3 inline-block rounded bg-[#0B1F4B]/5 px-2.5 py-1 text-xs font-semibold text-[#0B1F4B]">
                    {news.date}
                  </span>
                  <h3 className="mb-3 font-poppins text-lg font-bold text-navy">{news.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{news.excerpt}</p>
                </div>
                <Link
                  href={news.id === 'n1' ? '/admissions' : '/academics'}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0B1F4B] transition-colors group-hover:text-[#C9A227]"
                >
                  Read More <ArrowRight size={16} aria-hidden="true" />
                </Link>
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
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="mb-4 flex gap-1 text-[#C9A227]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mb-5 leading-relaxed text-slate-600">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B1F4B] text-sm font-bold text-[#C9A227]"
                  >
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="font-bold text-navy">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <HomeCtaBanner />
    </div>
  );
}
