'use client';

import { useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import { STUDENTS } from '@/lib/data';
import { useToday } from '@/lib/useClock';
import { formatDate } from '@/lib/utils';
import type { AttendanceRecord, Teacher } from '@/types';

type Status = AttendanceRecord['status'];

const STATUS_OPTIONS: Status[] = ['Present', 'Absent', 'Late'];

const STATUS_TONE: Record<Status, string> = {
  Present: 'bg-success/10 text-success',
  Absent: 'bg-danger/10 text-danger',
  Late: 'bg-warning/10 text-warning',
};

export default function AttendanceSection({ teacher }: { teacher: Teacher }) {
  const today = useToday();
  const [classLevel, setClassLevel] = useState(teacher.classes[0] ?? 'SS2');
  const [pickedDate, setPickedDate] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [savedRecords, setSavedRecords] = useState<AttendanceRecord[]>([]);
  const [saved, setSaved] = useState(false);

  const date = pickedDate ?? today;

  const classStudents = useMemo(
    () => STUDENTS.filter((student) => student.class === classLevel),
    [classLevel],
  );

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const records: AttendanceRecord[] = classStudents.map((student) => ({
      id: `at-${date}-${student.id}`,
      studentId: student.id,
      date,
      status: statuses[student.id] ?? 'Present',
    }));
    setSavedRecords(records);
    setSaved(true);
  };

  const counts = STATUS_OPTIONS.map((status) => ({
    status,
    count: savedRecords.filter((record) => record.status === status).length,
  }));

  return (
    <SectionCard
      id="attendance"
      title="Take Attendance"
      description="Select a class and date, mark each student, then save the register."
    >
      <form onSubmit={handleSave}>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:max-w-xl">
          <div>
            <label htmlFor="attendance-class" className="mb-2 block text-sm font-medium text-slate-700">
              Class
            </label>
            <select
              id="attendance-class"
              name="class"
              value={classLevel}
              onChange={(event) => {
                setClassLevel(event.target.value);
                setStatuses({});
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

          <div>
            <label htmlFor="attendance-date" className="mb-2 block text-sm font-medium text-slate-700">
              Date
            </label>
            <input
              id="attendance-date"
              name="date"
              type="date"
              required
              value={date}
              onChange={(event) => {
                setPickedDate(event.target.value);
                setSaved(false);
              }}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <caption className="sr-only">Attendance register for {classLevel}</caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Student</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
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
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      {student.class} {student.section}
                    </span>
                  </th>
                  <td className="px-4 py-3">
                    <label htmlFor={`status-${student.id}`} className="sr-only">
                      Attendance status for {student.name}
                    </label>
                    <select
                      id={`status-${student.id}`}
                      name={`status-${student.id}`}
                      value={statuses[student.id] ?? 'Present'}
                      onChange={(event) => {
                        setStatuses((current) => ({
                          ...current,
                          [student.id]: event.target.value as Status,
                        }));
                        setSaved(false);
                      }}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-bold text-white transition-colors hover:bg-navy/90"
          >
            <Save size={18} aria-hidden="true" />
            Save Attendance
          </button>
          {saved && (
            <p role="status" className="text-sm font-medium text-success">
              Attendance saved successfully.
            </p>
          )}
        </div>
      </form>

      {savedRecords.length > 0 && (
        <div className="mt-8 border-t border-slate-100 pt-6">
          <h3 className="mb-3 font-poppins text-base font-bold text-navy">
            Saved register &middot; {formatDate(date)}
          </h3>
          <div className="mb-4 flex flex-wrap gap-3">
            {counts.map((entry) => (
              <span
                key={entry.status}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[entry.status]}`}
              >
                {entry.count} {entry.status}
              </span>
            ))}
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {savedRecords.map((record) => {
              const student = STUDENTS.find((item) => item.id === record.studentId);
              return (
                <li
                  key={record.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-2 text-sm"
                >
                  <span className="font-medium text-navy">{student?.name ?? record.studentId}</span>
                  <span className={STATUS_TONE[record.status]}>{record.status}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </SectionCard>
  );
}
