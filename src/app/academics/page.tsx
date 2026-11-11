import Link from 'next/link';
import { BookOpen, GraduationCap, ShieldCheck, Award, Clock } from 'lucide-react';

const JSS_SUBJECTS = [
  'English Language', 'Mathematics', 'Basic Science', 'Basic Technology',
  'Social Studies', 'Civic Education', 'Agricultural Science', 'Physical & Health Education',
  'Christian Religious Studies', 'Islamic Religious Studies', 'French', 'Computer Studies',
];

const SSS_STREAMS = [
  {
    name: 'Science',
    subjects: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Further Mathematics', 'Agricultural Science'],
    description: 'For students targeting medicine, engineering, and pure sciences.',
  },
  {
    name: 'Arts',
    subjects: ['English Language', 'Literature-in-English', 'Government', 'History', 'CRS/IRS', 'French', 'Economics'],
    description: 'For students targeting law, arts, humanities, and social sciences.',
  },
  {
    name: 'Commercial',
    subjects: ['English Language', 'Mathematics', 'Economics', 'Accounting', 'Commerce', 'Business Studies', 'Computer Studies'],
    description: 'For students targeting business, accounting, and entrepreneurship.',
  },
];

const EXAMS = [
  { name: 'WAEC', fullName: 'West African Examinations Council', focus: 'SS3 final examinations' },
  { name: 'NECO', fullName: 'National Examinations Council', focus: 'National secondary school certificate' },
  { name: 'IGCSE', fullName: 'International General Certificate of Secondary Education', focus: 'International curriculum option' },
];

const TIMETABLE = [
  { day: 'Monday', subjects: ['Mathematics', 'English Language', 'Biology', 'Civic Education'] },
  { day: 'Tuesday', subjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'] },
  { day: 'Wednesday', subjects: ['Biology', 'English Language', 'Mathematics', 'Further Mathematics'] },
  { day: 'Thursday', subjects: ['Chemistry', 'Physics', 'English Language', 'Agricultural Science'] },
  { day: 'Friday', subjects: ['Mathematics', 'Biology', 'Civic Education', 'Computer Studies'] },
];

export default function Academics() {
  return (
    <div className="flex flex-col flex-1">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-semibold border border-gold/30">
              Academics
            </span>
            <h1 className="font-poppins text-4xl font-bold text-navy mt-4 mb-6">Academic Excellence</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              From JSS1 to SS3, Crestfield Academy offers a comprehensive British-Nigerian curriculum
              with Science, Arts, and Commercial streams. Our students consistently achieve outstanding
              results in WAEC, NECO, and IGCSE examinations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <BookOpen className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-poppins text-lg font-bold text-navy mb-2">Junior Secondary (JSS1–JSS3)</h3>
              <p className="text-sm text-slate-600 mb-4">Foundational years with broad subject exposure.</p>
              <ul className="text-xs text-slate-500 space-y-1">
                {JSS_SUBJECTS.slice(0, 6).map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="text-gold">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <GraduationCap className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-poppins text-lg font-bold text-navy mb-2">Senior Secondary (SS1–SS3)</h3>
              <p className="text-sm text-slate-600 mb-4">Specialized streams for career pathways.</p>
              <ul className="text-xs text-slate-500 space-y-1">
                {SSS_STREAMS.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 mb-1">
                    <span className="text-gold">✓</span> {s.name} Stream
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <Award className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-poppins text-lg font-bold text-navy mb-2">External Examinations</h3>
              <p className="text-sm text-slate-600 mb-4">WAEC, NECO, and IGCSE preparation.</p>
              <ul className="text-xs text-slate-500 space-y-1">
                {EXAMS.map((e) => (
                  <li key={e.name} className="flex items-center gap-2">
                    <span className="text-gold">✓</span> {e.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="font-poppins text-2xl font-bold text-navy mb-6">Senior Secondary Streams</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {SSS_STREAMS.map((stream) => (
                <div key={stream.name} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-poppins text-xl font-bold text-navy mb-2">{stream.name} Stream</h3>
                  <p className="text-sm text-slate-600 mb-4">{stream.description}</p>
                  <p className="text-xs font-semibold text-navy/70 mb-3">Core Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {stream.subjects.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded bg-navy/10 text-navy text-xs font-medium border border-navy/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-poppins text-xl font-bold text-navy mb-6">Weekly Timetable Preview (SS2)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 text-slate-500 font-semibold">Day</th>
                      <th className="px-4 py-3 text-slate-500 font-semibold">Subjects</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {TIMETABLE.map((day) => (
                      <tr key={day.day} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-navy">{day.day}</td>
                        <td className="px-4 py-3 text-slate-600">{day.subjects.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-poppins text-xl font-bold text-navy mb-6">Examination Bodies</h2>
              <div className="space-y-4">
                {EXAMS.map((exam) => (
                  <div key={exam.name} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-5 h-5 text-gold" />
                    <div>
                      <p className="font-medium text-navy">{exam.name}</p>
                      <p className="text-xs text-slate-500">{exam.fullName}</p>
                    </div>
                    <span className="text-xs text-slate-400 ml-auto">{exam.focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}