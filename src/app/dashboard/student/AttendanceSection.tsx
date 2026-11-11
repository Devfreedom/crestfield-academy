'use client';

import SectionCard from '@/components/SectionCard';
import ProgressBar from '@/components/ProgressBar';
import { ATTENDANCE } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import type { Student } from '@/types';

export default function AttendanceSection({ student }: { student: Student }) {
  const records = ATTENDANCE.filter((record) => record.studentId === student.id);
  const present = records.filter((record) => record.status === 'Present').length;
  const absent = records.filter((record) => record.status === 'Absent').length;
  const late = records.filter((record) => record.status === 'Late').length;

  const tone =
    student.attendance >= 90 ? 'success' : student.attendance >= 75 ? 'warning' : 'danger';

  return (
    <SectionCard
      id="attendance"
      title="Attendance"
      description={`Your attendance rate for this term is ${student.attendance}%.`}
    >
      <div className="mb-6">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-medium text-navy">{student.attendance}%</span>
          <span className="text-slate-500">Attendance rate</span>
        </div>
        <ProgressBar value={student.attendance} label="Term attendance rate" tone={tone} />
      </div>

      <p className="mb-6 text-sm text-slate-600">
        {student.attendance >= 90
          ? 'Excellent attendance. Keep it up — you are in good standing for every examination.'
          : 'Attendance is below the 90% target. Speak to your form teacher to improve it.'}
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Present</p>
          <p className="mt-1 font-poppins text-xl font-bold text-success">{present}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Absent</p>
          <p className="mt-1 font-poppins text-xl font-bold text-danger">{absent}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Late</p>
          <p className="mt-1 font-poppins text-xl font-bold text-warning">{late}</p>
        </div>
      </div>

      {records.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 font-poppins text-base font-bold text-navy">Recent records</h3>
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
            {records.map((record) => (
              <li key={record.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="text-slate-600">{formatDate(record.date)}</span>
                <span
                  className={
                    record.status === 'Present'
                      ? 'font-semibold text-success'
                      : record.status === 'Absent'
                        ? 'font-semibold text-danger'
                        : 'font-semibold text-warning'
                  }
                >
                  {record.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionCard>
  );
}
