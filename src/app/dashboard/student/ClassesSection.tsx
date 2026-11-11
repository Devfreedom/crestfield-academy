'use client';

import SectionCard from '@/components/SectionCard';
import { TIMETABLE } from '@/lib/data';
import type { Student } from '@/types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export default function ClassesSection({ student }: { student: Student }) {
  const classEntries = TIMETABLE.filter((entry) => entry.classLevel === student.class);
  const todayEntries = classEntries.filter((entry) => entry.day === 'Monday');
  const entries = todayEntries.length > 0 ? todayEntries : classEntries;

  return (
    <SectionCard
      id="classes"
      title="Today&apos;s Classes"
      description={`${student.class} ${student.section} · timetable for the week`}
    >
      {entries.length === 0 ? (
        <p className="text-sm text-slate-500">No classes scheduled for {student.class} yet.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-navy">{entry.subject}</p>
                <p className="text-xs text-slate-500">
                  {entry.teacher} &middot; {entry.room} &middot; {entry.day}
                </p>
              </div>
              <span className="rounded bg-navy/10 px-2.5 py-1 text-xs font-medium text-navy">
                {entry.time}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <h3 className="mb-3 font-poppins text-base font-bold text-navy">Full week</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <caption className="sr-only">Weekly timetable for {student.class}</caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Day</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Time</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Room</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DAYS.flatMap((day) =>
                classEntries
                  .filter((entry) => entry.day === day)
                  .map((entry) => (
                    <tr key={entry.id} className="transition-colors hover:bg-slate-50">
                      <th scope="row" className="px-4 py-3 font-medium text-navy">{entry.day}</th>
                      <td className="px-4 py-3 text-slate-600">{entry.time}</td>
                      <td className="px-4 py-3 text-slate-600">{entry.subject}</td>
                      <td className="px-4 py-3 text-slate-600">{entry.room}</td>
                    </tr>
                  )),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}
