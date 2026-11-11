'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import { ASSIGNMENTS } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import type { Assignment, Teacher } from '@/types';

export default function AssignmentsSection({ teacher }: { teacher: Teacher }) {
  const [assignments, setAssignments] = useState<Assignment[]>(ASSIGNMENTS);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    class: teacher.classes[0] ?? 'SS2',
    subject: teacher.subject,
    dueDate: '',
    description: '',
  });

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const created: Assignment = {
      id: `a${assignments.length + 1}`,
      title: form.title,
      class: form.class,
      subject: form.subject,
      dueDate: form.dueDate,
      description: form.description,
      createdBy: teacher.id,
    };
    setAssignments((current) => [created, ...current]);
    setCreateOpen(false);
    setForm({
      title: '',
      class: teacher.classes[0] ?? 'SS2',
      subject: teacher.subject,
      dueDate: '',
      description: '',
    });
  };

  const handleDelete = (id: string) => {
    setAssignments((current) => current.filter((item) => item.id !== id));
  };

  return (
    <>
      <SectionCard
        id="assignments"
        title="Assignments"
        description="Set and track work for your classes."
        actions={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy/90"
          >
            <Plus size={16} aria-hidden="true" />
            Create Assignment
          </button>
        }
      >
        <DataTable<Assignment>
          caption="Assignments"
          columns={[
            {
              key: 'title',
              label: 'Title',
              render: (assignment) => (
                <div>
                  <p className="font-medium text-navy">{assignment.title}</p>
                  <p className="text-xs text-slate-500">{assignment.description}</p>
                </div>
              ),
            },
            { key: 'class', label: 'Class' },
            { key: 'subject', label: 'Subject' },
            { key: 'dueDate', label: 'Due Date', format: (value) => formatDate(String(value)) },
          ]}
          data={assignments}
          searchableKeys={['title', 'subject', 'class']}
          searchPlaceholder="Search assignments..."
          emptyMessage="No assignments found."
          rowActions={(assignment) => (
            <button
              type="button"
              onClick={() => handleDelete(assignment.id)}
              aria-label={`Delete assignment ${assignment.title}`}
              className="rounded-lg p-1.5 text-danger transition-colors hover:bg-danger/10"
            >
              <Trash2 size={18} aria-hidden="true" />
            </button>
          )}
        />
      </SectionCard>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Assignment"
        description="Students in the selected class will see this assignment."
        footer={
          <>
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="create-assignment-form"
              className="rounded-lg bg-navy px-4 py-2.5 font-medium text-white transition-colors hover:bg-navy/90"
            >
              Create Assignment
            </button>
          </>
        }
      >
        <form id="create-assignment-form" onSubmit={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="assignment-title" className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="assignment-title"
              name="title"
              type="text"
              required
              autoFocus
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="assignment-class" className="mb-2 block text-sm font-medium text-slate-700">
                Class
              </label>
              <select
                id="assignment-class"
                name="class"
                required
                value={form.class}
                onChange={(event) => setForm({ ...form, class: event.target.value })}
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
              <label htmlFor="assignment-subject" className="mb-2 block text-sm font-medium text-slate-700">
                Subject
              </label>
              <input
                id="assignment-subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="assignment-due" className="mb-2 block text-sm font-medium text-slate-700">
              Due Date
            </label>
            <input
              id="assignment-due"
              name="dueDate"
              type="date"
              required
              value={form.dueDate}
              onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="assignment-description" className="mb-2 block text-sm font-medium text-slate-700">
              Instructions
            </label>
            <textarea
              id="assignment-description"
              name="description"
              required
              rows={3}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
