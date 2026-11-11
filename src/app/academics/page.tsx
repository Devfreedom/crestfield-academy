import { BookOpen, GraduationCap, ShieldCheck, Award } from 'lucide-react';

const JSS_SUBJECTS = [
  'English Language',
  'Mathematics',
  'Basic Science',
  'Basic Technology',
  'Social Studies',
  'Civic Education',
  'Agricultural Science',
  'Physical & Health Education',
  'Christian Religious Studies',
  'Islamic Religious Studies',
  'French',
  'Computer Studies',
];

const SSS_STREAMS = [
  {
    name: 'Science',
    subjects: [
      'Mathematics',
      'English Language',
      'Physics',
      'Chemistry',
      'Biology',
      'Further Mathematics',
      'Agricultural Science',
    ],
    description: 'For students targeting medicine, engineering, and pure sciences.',
  },
  {
    name: 'Arts',
    subjects: [
      'English Language',
      'Literature-in-English',
      'Government',
      'History',
      'CRS/IRS',
      'French',
      'Economics',
    ],
    description: 'For students targeting law, arts, humanities, and social sciences.',
  },
  {
    name: 'Commercial',
    subjects: [
      'English Language',
      'Mathematics',
      'Economics',
      'Accounting',
      'Commerce',
      'Business Studies',
      'Computer Studies',
    ],
    description: 'For students targeting business, accounting, and entrepreneurship.',
  },
];

const EXAMS = [
  {
    name: 'WAEC',
    fullName: 'West African Examinations Council',
    focus: 'SS3 final examinations',
  },
  {
    name: 'NECO',
    fullName: 'National Examinations Council',
    focus: 'National secondary school certificate',
  },
  {
    name: 'IGCSE',
    fullName: 'International General Certificate of Secondary Education',
    focus: 'International curriculum option',
  },
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
    <div className="flex flex-1 flex-col">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full border border-gold/30 bg-gold/20 px-4 py-1.5 text-sm font-semibold text-gold">
              Academics
            </span>
            <h1 className="mt-4 mb-6 font-poppins text-4xl font-bold text-navy">Academic Excellence</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              From JSS1 to SS3, Crestfield Academy offers a comprehensive British-Nigerian curriculum
              with Science, Arts, and Commercial streams. Our students consistently achieve outstanding
              results in WAEC, NECO, and IGCSE examinations.
            </p>
          </div>

          <div className="mb-16 grid gap-8 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <BookOpen className="mb-4 h-8 w-8 text-gold" aria-hidden="true" />
              <h2 className="mb-2 font-poppins text-lg font-bold text-navy">
                Junior Secondary (JSS1&ndash;JSS3)
              </h2>
              <p className="mb-4 text-sm text-slate-600">Foundational years with broad subject exposure.</p>
              <ul className="space-y-1 text-xs text-slate-500">
                {JSS_SUBJECTS.slice(0, 6).map((subject) => (
                  <li key={subject} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-gold">
                      &#10003;
                    </span>
                    {subject}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <GraduationCap className="mb-4 h-8 w-8 text-gold" aria-hidden="true" />
              <h2 className="mb-2 font-poppins text-lg font-bold text-navy">
                Senior Secondary (SS1&ndash;SS3)
              </h2>
              <p className="mb-4 text-sm text-slate-600">Specialized streams for career pathways.</p>
              <ul className="space-y-1 text-xs text-slate-500">
                {SSS_STREAMS.map((stream) => (
                  <li key={stream.name} className="mb-1 flex items-center gap-2">
                    <span aria-hidden="true" className="text-gold">
                      &#10003;
                    </span>
                    {stream.name} Stream
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <Award className="mb-4 h-8 w-8 text-gold" aria-hidden="true" />
              <h2 className="mb-2 font-poppins text-lg font-bold text-navy">External Examinations</h2>
              <p className="mb-4 text-sm text-slate-600">WAEC, NECO, and IGCSE preparation.</p>
              <ul className="space-y-1 text-xs text-slate-500">
                {EXAMS.map((exam) => (
                  <li key={exam.name} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-gold">
                      &#10003;
                    </span>
                    {exam.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 font-poppins text-2xl font-bold text-navy">Senior Secondary Streams</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {SSS_STREAMS.map((stream) => (
                <article
                  key={stream.name}
                  className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <h3 className="mb-2 font-poppins text-xl font-bold text-navy">{stream.name} Stream</h3>
                  <p className="mb-4 text-sm text-slate-600">{stream.description}</p>
                  <p className="mb-3 text-xs font-semibold text-navy/70">Core Subjects:</p>
                  <ul className="flex flex-wrap gap-2">
                    {stream.subjects.map((subject) => (
                      <li
                        key={subject}
                        className="rounded border border-navy/20 bg-navy/10 px-2.5 py-1 text-xs font-medium text-navy"
                      >
                        {subject}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 font-poppins text-xl font-bold text-navy">
                Weekly Timetable Preview (SS2)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Weekly timetable preview for SS2</caption>
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-500">Day</th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-500">Subjects</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {TIMETABLE.map((day) => (
                      <tr key={day.day} className="transition-colors hover:bg-slate-50">
                        <th scope="row" className="px-4 py-3 font-medium text-navy">{day.day}</th>
                        <td className="px-4 py-3 text-slate-600">{day.subjects.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 font-poppins text-xl font-bold text-navy">Examination Bodies</h2>
              <ul className="space-y-4">
                {EXAMS.map((exam) => (
                  <li
                    key={exam.name}
                    className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-3"
                  >
                    <ShieldCheck className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-medium text-navy">{exam.name}</p>
                      <p className="text-xs text-slate-500">{exam.fullName}</p>
                    </div>
                    <span className="ml-auto shrink-0 text-xs text-slate-400">{exam.focus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
