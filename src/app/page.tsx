import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, GraduationCap, ShieldCheck, Award, BookOpen } from 'lucide-react';

const STATS = [
  { label: 'Students', value: '850+', icon: Users },
  { label: 'Teachers', value: '62', icon: GraduationCap },
  { label: 'WAEC Pass Rate', value: '98%', icon: Award },
  { label: 'Years of Excellence', value: '14', icon: ShieldCheck },
];

const WHY_CRESTFIELD = [
  {
    title: 'Academic Excellence',
    description: 'Rigorous British-Nigerian curriculum preparing students for WAEC, NECO, and IGCSE with outstanding results.',
    icon: BookOpen,
  },
  {
    title: 'Character Formation',
    description: 'We build integrity, discipline, and service-minded leaders who excel beyond the classroom.',
    icon: ShieldCheck,
  },
  {
    title: 'Qualified Teachers',
    description: '62 certified, passionate educators dedicated to every student\'s success across all subjects.',
    icon: Users,
  },
  {
    title: 'Modern Facilities',
    description: 'Well-equipped science labs, computer center, library, and sports facilities for holistic learning.',
    icon: GraduationCap,
  },
  {
    title: 'Small Class Sizes',
    description: 'Personalized attention with optimal teacher-to-student ratios in every class from JSS1 to SS3.',
    icon: Users,
  },
  {
    title: 'Moral & Spiritual Growth',
    description: 'Values-based education rooted in excellence, integrity, discipline, and service to others.',
    icon: ShieldCheck,
  },
];

const NEWS = [
  {
    title: 'WAEC Registration Now Open',
    date: 'November 8, 2025',
    excerpt: 'SS3 students can now register for the 2025 WAEC examinations. Deadline: November 30.',
  },
  {
    title: 'Mid-Term Break Announcement',
    date: 'November 10, 2025',
    excerpt: 'School will be closed from November 15-17 for mid-term break. Classes resume Monday, November 18.',
  },
  {
    title: 'Science Fair 2025',
    date: 'October 25, 2025',
    excerpt: 'Our annual science fair showcased innovative student projects in robotics, chemistry, and environmental science.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Mrs. Folake Adebayo',
    role: 'Parent of SS2 Student',
    text: 'Crestfield Academy has transformed my daughter\'s confidence and academic performance. The teachers truly care.',
  },
  {
    name: 'Mr. Chinedu Okafor',
    role: 'Parent of JSS1 Student',
    text: 'Excellent discipline, strong values, and outstanding academics. We are proud to be part of the Crestfield family.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="relative bg-navy text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center lg:text-left max-w-4xl lg:max-w-none">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-semibold mb-6 border border-gold/30">
              Admissions Open for 2025/2026 Session
            </span>
            <h1 className="font-poppins text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Where Character Meets Excellence
            </h1>
            <p className="text-lg lg:text-xl text-slate-200 mb-8 max-w-2xl lg:max-w-lg leading-relaxed">
              Crestfield Academy offers a world-class British-Nigerian curriculum from JSS1 to SS3,
              nurturing future leaders with integrity, discipline, and academic excellence in Abuja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/admissions" className="bg-gold text-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2">
                Apply Now <ArrowRight size={20} />
              </Link>
              <Link href="/academics" className="border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                Explore Academics
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-xl border border-slate-200 bg-slate-50">
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <p className="text-2xl font-bold text-navy font-poppins">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-navy mb-4">Why Crestfield Academy?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A premium private secondary school committed to academic excellence and character formation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {WHY_CRESTFIELD.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-poppins text-lg font-bold text-navy mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <Image
                src="/next.svg"
                alt="Academics"
                className="rounded-xl shadow-lg"
                width={600}
                height={400}
                priority
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="font-poppins text-3xl font-bold text-navy mb-6">Comprehensive Academics</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                From JSS1 to SS3, we offer Science, Arts, and Commercial streams with expert teachers
                and modern facilities. Our students consistently achieve outstanding results in WAEC,
                NECO, and IGCSE examinations.
              </p>
              <Link href="/academics" className="bg-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-navy/90 transition-colors inline-flex items-center gap-2">
                View Academics <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-navy mb-4">News & Events</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Stay updated with the latest from Crestfield Academy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map((news) => (
              <div key={news.title} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">{news.date}</p>
                <h3 className="font-poppins text-lg font-bold text-navy mb-3">{news.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{news.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-navy mb-4">What Parents Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <p className="text-slate-600 italic mb-4">"{t.text}"</p>
                <p className="font-bold text-navy">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-poppins text-3xl font-bold mb-6">Ready to Join Crestfield?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Give your child the foundation for excellence. Applications are open for the 2025/2026 session.
          </p>
          <Link href="/admissions" className="bg-gold text-navy px-10 py-4 rounded-lg font-bold text-lg inline-block hover:bg-gold/90 transition-colors">
            Start Application
          </Link>
        </div>
      </section>
    </div>
  );
}
