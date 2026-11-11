'use client';

import SectionCard from '@/components/SectionCard';
import { STUDENTS } from '@/lib/data';
import type { Teacher } from '@/types';

export default function ClassesSection({ teacher }: { teacher: Teacher }) {
  return (
    <SectionCard
      id="classes"
      title="My Classes"
      description={`Classes assigned to ${teacher.name} (${teacher.subject}).`}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teacher.classes.map((classLevel) => {
          const students = STUDENTS.filter((student) => student.class === classLevel);
          const average = students.length
            ? Math.round(students.reduce((sum, student) => sum + student.attendance, 0) / students.length)
            : 0;

          return (
            <article
              key={classLevel}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-navy/30"
            >
              <h3 className="font-poppins text-lg font-bold text-navy">{classLevel}</h3>
              <p className="mt-1 text-sm text-slate-500">{teacher.subject}</p>
              <dl className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Students</dt>
                  <dd className="font-semibold text-navy">{students.length}</dd>
                </div>
                <div className="text-right">
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Avg Attendance</dt>
                  <dd className="font-semibold text-navy">{average}%</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
