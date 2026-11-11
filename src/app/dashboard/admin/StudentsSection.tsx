'use client';

import { useMemo, useState } from 'react';
import { Plus, User as UserIcon } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import { CLASS_LEVELS, FEES, STUDENTS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import type { Student } from '@/types';

const STATUS_TONE: Record<Student['status'], string> = {
  Active: 'bg-success/10 text-success',
  Suspended: 'bg-warning/10 text-warning',
  Graduated: 'bg-navy/10 text-navy',
};

export default function StudentsSection() {
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [classFilter, setClassFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [profile, setProfile] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: 'JSS1' as Student['class'],
    section: 'A' as Student['section'],
    gender: 'Male' as Student['gender'],
  });

  const classOptions = useMemo(() => ['all', ...CLASS_LEVELS], []);

  const handleAddStudent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const created: Student = {
      id: `s${students.length + 1}`,
      name: newStudent.name,
      class: newStudent.class,
      section: newStudent.section,
      gender: newStudent.gender,
      attendance: 100,
      feesOwed: 0,
      status: 'Active',
    };
    setStudents((current) => [...current, created]);
    setAddOpen(false);
    setNewStudent({ name: '', class: 'JSS1', section: 'A', gender: 'Male' });
  };

  const profileFees = profile ? FEES.filter((fee) => fee.studentId === profile.id) : [];

  return (
    <>
      <SectionCard
        id="students"
        title="Students"
        description="Search, filter, and add students to the roll."
        actions={
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy/90"
          >
            <Plus size={16} aria-hidden="true" />
            Add Student
          </button>
        }
      >
        <DataTable<Student>
          caption="Student roll"
          columns={[
            { key: 'name', label: 'Name' },
            {
              key: 'class',
              label: 'Class',
              render: (student) => `${student.class} ${student.section}`,
            },
            { key: 'gender', label: 'Gender' },
            { key: 'attendance', label: 'Attendance', format: (value) => `${value}%` },
            {
              key: 'feesOwed',
              label: 'Fees Owed',
              align: 'right',
              format: (value) => formatCurrency(Number(value)),
            },
            {
              key: 'status',
              label: 'Status',
              render: (student) => (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[student.status]}`}
                >
                  {student.status}
                </span>
              ),
            },
          ]}
          data={students}
          searchableKeys={['name', 'class', 'section']}
          searchPlaceholder="Search students..."
          emptyMessage="No students found."
          filters={[
            {
              id: 'class',
              label: 'Filter by class',
              value: classFilter,
              onChange: setClassFilter,
              options: classOptions.map((level) => ({
                value: level,
                label: level === 'all' ? 'All classes' : level,
              })),
            },
          ]}
          rowActions={(student) => (
            <button
              type="button"
              onClick={() => setProfile(student)}
              className="flex items-center gap-1.5 text-sm font-medium text-navy transition-colors hover:text-navy/70"
            >
              <UserIcon size={15} aria-hidden="true" />
              View Profile
            </button>
          )}
        />
        <p className="mt-4 text-sm text-slate-500">
          Showing {classFilter === 'all' ? 'all classes' : classFilter} &middot; {students.length} students on
          the roll.
        </p>
      </SectionCard>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add New Student"
        description="The student appears on the roll immediately."
        footer={
          <>
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-student-form"
              className="rounded-lg bg-navy px-4 py-2.5 font-medium text-white transition-colors hover:bg-navy/90"
            >
              Add Student
            </button>
          </>
        }
      >
        <form id="add-student-form" onSubmit={handleAddStudent} className="space-y-4">
          <div>
            <label htmlFor="student-name" className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="student-name"
              name="name"
              type="text"
              required
              autoComplete="off"
              autoFocus
              value={newStudent.name}
              onChange={(event) => setNewStudent({ ...newStudent, name: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="student-class" className="mb-2 block text-sm font-medium text-slate-700">
                Class
              </label>
              <select
                id="student-class"
                name="class"
                value={newStudent.class}
                onChange={(event) =>
                  setNewStudent({ ...newStudent, class: event.target.value as Student['class'] })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
              >
                {CLASS_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="student-section" className="mb-2 block text-sm font-medium text-slate-700">
                Section
              </label>
              <select
                id="student-section"
                name="section"
                value={newStudent.section}
                onChange={(event) =>
                  setNewStudent({ ...newStudent, section: event.target.value as Student['section'] })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            <div>
              <label htmlFor="student-gender" className="mb-2 block text-sm font-medium text-slate-700">
                Gender
              </label>
              <select
                id="student-gender"
                name="gender"
                value={newStudent.gender}
                onChange={(event) =>
                  setNewStudent({ ...newStudent, gender: event.target.value as Student['gender'] })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        open={profile !== null}
        onClose={() => setProfile(null)}
        title={profile ? `${profile.name} — Profile` : 'Student Profile'}
        description={profile ? `${profile.class} ${profile.section} · ${profile.status}` : undefined}
        footer={
          <button
            type="button"
            onClick={() => setProfile(null)}
            className="rounded-lg bg-navy px-4 py-2.5 font-medium text-white transition-colors hover:bg-navy/90"
          >
            Close
          </button>
        }
      >
        {profile && (
          <div className="space-y-5">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border border-slate-200 p-3">
                <dt className="text-xs font-semibold uppercase text-slate-500">Gender</dt>
                <dd className="mt-1 font-medium text-navy">{profile.gender}</dd>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <dt className="text-xs font-semibold uppercase text-slate-500">Attendance</dt>
                <dd className="mt-1 font-medium text-navy">{profile.attendance}%</dd>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <dt className="text-xs font-semibold uppercase text-slate-500">Fees Owed</dt>
                <dd className="mt-1 font-medium text-navy">{formatCurrency(profile.feesOwed)}</dd>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <dt className="text-xs font-semibold uppercase text-slate-500">Student ID</dt>
                <dd className="mt-1 font-medium text-navy">{profile.id.toUpperCase()}</dd>
              </div>
            </dl>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-navy">Fee history</h4>
              {profileFees.length === 0 ? (
                <p className="text-sm text-slate-500">No fee records for this student yet.</p>
              ) : (
                <ul className="space-y-2">
                  {profileFees.map((fee) => (
                    <li
                      key={fee.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                    >
                      <span className="font-medium text-navy">
                        {fee.term} &middot; {fee.session}
                      </span>
                      <span className="text-slate-600">
                        Paid {formatCurrency(fee.paid)} of {formatCurrency(fee.amount)}
                      </span>
                      <span
                        className={
                          fee.status === 'Paid' ? 'font-semibold text-success' : 'font-semibold text-warning'
                        }
                      >
                        {fee.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
