import { MapPin, BookOpen, Award, Users } from 'lucide-react';

const AT_A_GLANCE = [
  { icon: MapPin, label: 'Location', value: 'Plot 12, Gwarinpa, Abuja' },
  { icon: BookOpen, label: 'Curriculum', value: 'British-Nigerian' },
  { icon: Award, label: 'Examinations', value: 'WAEC \u00b7 NECO \u00b7 IGCSE' },
  { icon: Users, label: 'Class Size', value: 'Average 24 students' },
];

/**
 * A CSS-only stand-in for a campus photograph, so the public site makes no
 * third-party image requests and the hero paints without a layout shift.
 */
export default function AtAGlancePanel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-navy to-[#162f63] p-8 text-white shadow-lg">
      <div className="mb-6 border-l-4 border-[#C9A227] pl-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">
          Crestfield at a glance
        </p>
        <h2 className="font-poppins text-2xl font-bold text-white">Comprehensive Academics</h2>
      </div>
      <ul className="space-y-4">
        {AT_A_GLANCE.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
              <item.icon size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-300">{item.label}</p>
              <p className="font-medium text-white">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
