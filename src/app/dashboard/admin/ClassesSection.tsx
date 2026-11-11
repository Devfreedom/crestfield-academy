'use client';

import { useState } from 'react';
import { UserCog } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import { CLASSES, TEACHERS } from '@/lib/data';
import type { Class } from '@/types';

export default function ClassesSection() {
  const [classes, setClasses] = useState<Class[]>(CLASSES);
  const [target, setTarget] = useState<Class | null>(null);
  const [teacherId, setTeacherId] = useState('');

  const teacherName = (id?: string) => TEACHERS.find((teacher) => teacher.id === id)?.name ?? 'Unassigned';

  const handleAssign = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!target) return;
    setClasses((current) =>
      current.map((item) => (item.id === target.id ? { ...item, teacherId } : item)),
    );
    setTarget(null);
    setTeacherId('');
  };

  return (
    <>
      <SectionCard
        id="classes"
        title="Classes &amp; Timetable"
        description="Assign a subject teacher to each class."
      >
        <DataTable<Class>
          caption="Classes and assigned teachers"
          columns={[
            { key: 'name', label: 'Class' },
            { key: 'level', label: 'Level' },
            { key: 'studentCount', label: 'Students', align: 'right' },
            {
              key: 'teacherId',
              label: 'Assigned Teacher',
              render: (item) => teacherName(item.teacherId),
            },
          ]}
          data={classes}
          searchableKeys={['name', 'level']}
          searchPlaceholder="Search classes..."
          emptyMessage="No classes found."
          rowActions={(item) => (
            <button
              type="button"
              onClick={() => {
                setTarget(item);
                setTeacherId(item.teacherId ?? '');
              }}
              className="flex items-center gap-1.5 text-sm font-medium text-navy transition-colors hover:text-navy/70"
            >
              <UserCog size={15} aria-hidden="true" />
              Assign Teacher
            </button>
          )}
        />
      </SectionCard>

      <Modal
        open={target !== null}
        onClose={() => setTarget(null)}
        title="Assign Teacher"
        description={target ? `Choose the subject teacher for ${target.name}.` : undefined}
        footer={
          <>
            <button
              type="button"
              onClick={() => setTarget(null)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="assign-teacher-form"
              className="rounded-lg bg-navy px-4 py-2.5 font-medium text-white transition-colors hover:bg-navy/90"
            >
              Save Assignment
            </button>
          </>
        }
      >
        <form id="assign-teacher-form" onSubmit={handleAssign}>
          <label htmlFor="assign-teacher" className="mb-2 block text-sm font-medium text-slate-700">
            Subject Teacher
          </label>
          <select
            id="assign-teacher"
            name="teacherId"
            required
            autoFocus
            value={teacherId}
            onChange={(event) => setTeacherId(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          >
            <option value="">Unassigned</option>
            {TEACHERS.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} — {teacher.subject}
              </option>
            ))}
          </select>
          <p className="mt-3 text-xs text-slate-500">
            {target ? `${target.name} currently has ${target.studentCount} students.` : ''}
          </p>
        </form>
      </Modal>
    </>
  );
}
