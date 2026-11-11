'use client';

import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import { GRADES } from '@/lib/data';
import type { Grade, Student } from '@/types';

export default function GradesSection({ student }: { student: Student }) {
  const grades = GRADES.filter((grade) => grade.studentId === student.id);
  const average = grades.length
    ? Math.round(grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length)
    : 0;
  const best = grades.length ? Math.max(...grades.map((grade) => grade.score)) : 0;

  return (
    <SectionCard
      id="grades"
      title="Grades / Report Card"
      description={`${grades[0]?.term ?? 'Second Term'} · ${grades.length} assessments · average ${average}%`}
    >
      <DataTable<Grade>
        caption="Report card"
        columns={[
          { key: 'subject', label: 'Subject' },
          { key: 'assessment', label: 'Assessment' },
          {
            key: 'score',
            label: 'Score',
            align: 'right',
            render: (grade) => (
              <span className="font-semibold text-navy">{grade.score}%</span>
            ),
          },
          {
            key: 'grade',
            label: 'Grade',
            render: (grade) => (
              <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
                {grade.grade}
              </span>
            ),
          },
          { key: 'remark', label: 'Remark' },
        ]}
        data={grades}
        searchableKeys={['subject', 'assessment']}
        searchPlaceholder="Search subjects..."
        emptyMessage="No grades recorded yet."
      />

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <dt className="text-xs font-semibold uppercase text-slate-500">Class average</dt>
          <dd className="mt-1 font-poppins text-xl font-bold text-navy">{average}%</dd>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <dt className="text-xs font-semibold uppercase text-slate-500">Best score</dt>
          <dd className="mt-1 font-poppins text-xl font-bold text-navy">{best || '—'}</dd>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <dt className="text-xs font-semibold uppercase text-slate-500">Assessments</dt>
          <dd className="mt-1 font-poppins text-xl font-bold text-navy">{grades.length}</dd>
        </div>
      </dl>
    </SectionCard>
  );
}
