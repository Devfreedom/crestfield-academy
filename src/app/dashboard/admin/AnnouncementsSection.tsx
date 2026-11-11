'use client';

import { useState } from 'react';
import { Megaphone, Plus, Trash2 } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import Modal from '@/components/Modal';
import { ANNOUNCEMENTS } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import type { Announcement, Role } from '@/types';

const AUDIENCE_OPTIONS: { value: Role; label: string }[] = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'teacher', label: 'Teachers' },
  { value: 'student', label: 'Students' },
];

const AUDIENCE_TONE: Record<Role, string> = {
  super_admin: 'bg-navy/10 text-navy',
  admin: 'bg-navy/10 text-navy',
  teacher: 'bg-gold/10 text-gold',
  student: 'bg-slate-100 text-slate-600',
};

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    audience: ['super_admin', 'admin', 'teacher', 'student'] as Role[],
  });

  const toggleAudience = (role: Role) => {
    setForm((current) => ({
      ...current,
      audience: current.audience.includes(role)
        ? current.audience.filter((item) => item !== role)
        : [...current.audience, role],
    }));
  };

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const created: Announcement = {
      id: `an${announcements.length + 1}`,
      title: form.title,
      content: form.content,
      date: new Date().toISOString().slice(0, 10),
      audience: form.audience.length > 0 ? form.audience : ['student'],
    };
    setAnnouncements((current) => [created, ...current]);
    setCreateOpen(false);
    setForm({ title: '', content: '', audience: ['super_admin', 'admin', 'teacher', 'student'] });
  };

  const handleDelete = (id: string) => {
    setAnnouncements((current) => current.filter((item) => item.id !== id));
  };

  return (
    <>
      <SectionCard
        id="announcements"
        title="Announcements"
        description="Publish updates to the whole school or a specific audience."
        actions={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy/90"
          >
            <Plus size={16} aria-hidden="true" />
            New Announcement
          </button>
        }
      >
        {announcements.length === 0 ? (
          <p className="text-sm text-slate-500">No announcements published yet.</p>
        ) : (
          <ul className="space-y-4">
            {announcements.map((announcement) => (
              <li
                key={announcement.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-medium text-navy">
                    <Megaphone size={16} className="text-gold" aria-hidden="true" />
                    {announcement.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{announcement.content}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {announcement.audience.map((role) => (
                      <span
                        key={role}
                        className={`rounded px-2 py-0.5 text-xs font-medium ${AUDIENCE_TONE[role]}`}
                      >
                        {AUDIENCE_OPTIONS.find((option) => option.value === role)?.label ?? role}
                      </span>
                    ))}
                    <span className="text-xs text-slate-400">{formatDate(announcement.date)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(announcement.id)}
                  aria-label={`Delete announcement ${announcement.title}`}
                  className="rounded-lg p-1.5 text-danger transition-colors hover:bg-danger/10"
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New Announcement"
        description="Everyone in the selected audience sees this on their dashboard."
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
              form="create-announcement-form"
              className="rounded-lg bg-navy px-4 py-2.5 font-medium text-white transition-colors hover:bg-navy/90"
            >
              Publish
            </button>
          </>
        }
      >
        <form id="create-announcement-form" onSubmit={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="announcement-title" className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="announcement-title"
              name="title"
              type="text"
              required
              autoFocus
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="announcement-content" className="mb-2 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="announcement-content"
              name="content"
              required
              rows={4}
              value={form.content}
              onChange={(event) => setForm({ ...form, content: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-slate-700">Audience</legend>
            <div className="grid grid-cols-2 gap-3">
              {AUDIENCE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  htmlFor={`audience-${option.value}`}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    id={`audience-${option.value}`}
                    name="audience"
                    type="checkbox"
                    checked={form.audience.includes(option.value)}
                    onChange={() => toggleAudience(option.value)}
                    className="h-4 w-4 rounded border-slate-300 text-navy focus:ring-2 focus:ring-navy"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        </form>
      </Modal>
    </>
  );
}
