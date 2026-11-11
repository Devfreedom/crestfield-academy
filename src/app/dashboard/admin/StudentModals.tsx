'use client';

import Modal from '@/components/Modal';
import { CLASS_LEVELS, FEES } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import type { Student } from '@/types';

export type NewStudent = {
  name: string;
  class: Student['class'];
  section: Student['section'];
  gender: Student['gender'];
};

type AddStudentModalProps = {
  open: boolean;
  onClose: () => void;
  value: NewStudent;
  onChange: (value: NewStudent) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function AddStudentModal({ open, onClose, value, onChange, onSubmit }: AddStudentModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Student"
      description="The student appears on the roll immediately."
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
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
      <form id="add-student-form" onSubmit={onSubmit} className="space-y-4">
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
            value={value.name}
            onChange={(event) => onChange({ ...value, name: event.target.value })}
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
              value={value.class}
              onChange={(event) =>
                onChange({ ...value, class: event.target.value as Student['class'] })
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
              value={value.section}
              onChange={(event) =>
                onChange({ ...value, section: event.target.value as Student['section'] })
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
              value={value.gender}
              onChange={(event) =>
                onChange({ ...value, gender: event.target.value as Student['gender'] })
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
  );
}

type StudentProfileModalProps = {
  student: Student | null;
  onClose: () => void;
};

export function StudentProfileModal({ student, onClose }: StudentProfileModalProps) {
  const fees = student ? FEES.filter((fee) => fee.studentId === student.id) : [];

  return (
    <Modal
      open={student !== null}
      onClose={onClose}
      title={student ? `${student.name} \u2014 Profile` : 'Student Profile'}
      description={student ? `${student.class} ${student.section} \u00b7 ${student.status}` : undefined}
      footer={
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-navy px-4 py-2.5 font-medium text-white transition-colors hover:bg-navy/90"
        >
          Close
        </button>
      }
    >
      {student && (
        <div className="space-y-5">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-slate-200 p-3">
              <dt className="text-xs font-semibold uppercase text-slate-500">Gender</dt>
              <dd className="mt-1 font-medium text-navy">{student.gender}</dd>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <dt className="text-xs font-semibold uppercase text-slate-500">Attendance</dt>
              <dd className="mt-1 font-medium text-navy">{student.attendance}%</dd>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <dt className="text-xs font-semibold uppercase text-slate-500">Fees Owed</dt>
              <dd className="mt-1 font-medium text-navy">{formatCurrency(student.feesOwed)}</dd>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <dt className="text-xs font-semibold uppercase text-slate-500">Student ID</dt>
              <dd className="mt-1 font-medium text-navy">{student.id.toUpperCase()}</dd>
            </div>
          </dl>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-navy">Fee history</h4>
            {fees.length === 0 ? (
              <p className="text-sm text-slate-500">No fee records for this student yet.</p>
            ) : (
              <ul className="space-y-2">
                {fees.map((fee) => (
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
  );
}
