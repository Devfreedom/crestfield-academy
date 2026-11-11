'use client';

import SectionCard from '@/components/SectionCard';
import { TIMETABLE } from '@/lib/data';
import type { Teacher } from '@/types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export default function TimetableSection({ teacher }: { teacher: Teacher }) {
  const myEntries = TIMETABLE.filter((entry) => entry.teacher === teacher.name);
  const entries = myEntries.length > 0 ? myEntries : TIMETABLE;

  return (
    <SectionCard
      id="timetable"
      title="Weekly Timetable"
      description={
        myEntries.length > 0
          ? `Your teaching schedule for ${teacher.subject}.`
          : 'The school-wide timetable preview for the senior classes.'
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <caption className="sr-only">Weekly timetable</caption>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Day</th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Time</th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Teacher</th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Room</th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Class</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {DAYS.flatMap((day) =>
              entries
                .filter((entry) => entry.day === day)
                .map((entry) => (
                  <tr key={entry.id} className="transition-colors hover:bg-slate-50">
                    <th scope="row" className="px-4 py-3 font-medium text-navy">{entry.day}</th>
                    <td className="px-4 py-3 text-slate-600">{entry.time}</td>
                    <td className="px-4 py-3 text-slate-600">{entry.subject}</td>
                    <td className="px-4 py-3 text-slate-600">{entry.teacher}</td>
                    <td className="px-4 py-3 text-slate-600">{entry.room}</td>
                    <td className="px-4 py-3 text-slate-600">{entry.classLevel}</td>
                  </tr>
                )),
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
