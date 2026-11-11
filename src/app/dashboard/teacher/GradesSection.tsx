'use client';

import { useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import { STUDENTS } from '@/lib/data';
import type { Teacher } from '@/types';

export default function GradesSection({ teacher }: { teacher: Teacher }) {
  const [classLevel, setClassLevel] = useState(teacher.classes[0] ?? 'SS2');
  const [scores, setScores] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const classStudents = useMemo(
    () => STUDENTS.filter((student) => student.class === classLevel),
    [classLevel],
  );

  const numericScores = Object.values(scores)
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value) && value > 0);

  const average = numericScores.length
    ? Math.round(numericScores.reduce((sum, value) => sum + value, 0) / numericScores.length)
    : 0;

  const highest = numericScores.length ? Math.max(...numericScores) : 0;
  const lowest = numericScores.length ? Math.min(...numericScores) : 0;

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <SectionCard
      id="grades"
      title="Grades"
      description="Enter scores out of 100 for your class. The class average updates as you type."
    >
      <form onSubmit={handleSave}>
        <div className="mb-6 max-w-xs">
          <label htmlFor="grades-class" className="mb-2 block text-sm font-medium text-slate-700">
            Class
          </label>
          <select
            id="grades-class"
            name="class"
            value={classLevel}
            onChange={(event) => {
              setClassLevel(event.target.value);
              setScores({});
              setSaved(false);
            }}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          >
            {teacher.classes.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <caption className="sr-only">Enter scores for {classLevel}</caption>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Student</th>
                    <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Score (out of 100)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classStudents.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-4 py-8 text-center text-slate-500">
                        No students are registered for {classLevel} yet.
                      </td>
                    </tr>
                  )}
                  {classStudents.map((student) => (
                    <tr key={student.id} className="transition-colors hover:bg-slate-50">
                      <th scope="row" className="px-4 py-3 font-medium text-navy">
                        {student.name}
                      </th>
                      <td className="px-4 py-3">
                        <label htmlFor={`score-${student.id}`} className="sr-only">
                          Score for {student.name}
                        </label>
                        <input
                          id={`score-${student.id}`}
                          name={`score-${student.id}`}
                          type="number"
                          min={0}
                          max={100}
                          inputMode="numeric"
                          value={scores[student.id] ?? ''}
                          onChange={(event) => {
                            setScores((current) => ({
                              ...current,
                              [student.id]: event.target.value,
                            }));
                            setSaved(false);
                          }}
                          className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-4 font-poppins text-base font-bold text-navy">Class summary</h3>
            <dl className="space-y-3">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-slate-500">Class average</dt>
                <dd className="font-poppins text-xl font-bold text-navy">{average}%</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-slate-500">Highest score</dt>
                <dd className="font-semibold text-navy">{highest || '—'}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-slate-500">Lowest score</dt>
                <dd className="font-semibold text-navy">{lowest || '—'}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <dt className="text-sm text-slate-500">Scored</dt>
                <dd className="font-semibold text-navy">
                  {numericScores.length} of {classStudents.length}
                </dd>
              </div>
            </dl>

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 font-medium text-white transition-colors hover:bg-navy/90"
            >
              <Save size={16} aria-hidden="true" />
              Save Grades
            </button>
            {saved && (
              <p role="status" className="mt-3 text-sm font-medium text-success">
                Grades saved successfully.
              </p>
            )}
          </aside>
        </div>
      </form>
    </SectionCard>
  );
}
