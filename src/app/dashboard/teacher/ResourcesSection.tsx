'use client';

import { useRef, useState } from 'react';
import { Paperclip, Trash2, Upload } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import { RESOURCES } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import type { Resource, Teacher } from '@/types';

export default function ResourcesSection({ teacher }: { teacher: Teacher }) {
  const [resources, setResources] = useState<Resource[]>(RESOURCES);
  const [title, setTitle] = useState('');
  const [classLevel, setClassLevel] = useState(teacher.classes[0] ?? 'SS2');
  const [fileName, setFileName] = useState('');
  const [notice, setNotice] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const created: Resource = {
      id: `res${resources.length + 1}`,
      title,
      subject: teacher.subject,
      class: classLevel,
      fileName,
      size: '1.0 MB',
      uploadedOn: new Date().toISOString().slice(0, 10),
      uploadedBy: teacher.id,
    };
    setResources((current) => [created, ...current]);
    setNotice(`"${title}" was uploaded as ${fileName}.`);
    setTitle('');
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id: string) => {
    setResources((current) => current.filter((resource) => resource.id !== id));
    setNotice('');
  };

  return (
    <SectionCard
      id="resources"
      title="Resources"
      description="Upload lecture notes and supporting materials for your classes."
    >
      <form onSubmit={handleUpload} className="mb-8 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="resource-title" className="mb-2 block text-sm font-medium text-slate-700">
            Resource Title
          </label>
          <input
            id="resource-title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Simultaneous Equations Notes"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="resource-class" className="mb-2 block text-sm font-medium text-slate-700">
            Class
          </label>
          <select
            id="resource-class"
            name="class"
            value={classLevel}
            onChange={(event) => setClassLevel(event.target.value)}
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
          <label htmlFor="resource-file" className="mb-2 block text-sm font-medium text-slate-700">
            File
          </label>
          <input
            id="resource-file"
            name="file"
            type="file"
            required
            ref={fileInputRef}
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-navy/90"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 font-medium text-white transition-colors hover:bg-navy/90"
          >
            <Upload size={16} aria-hidden="true" />
            Upload Resource
          </button>
          {notice && (
            <p role="status" className="text-sm font-medium text-success">
              {notice}
            </p>
          )}
        </div>
      </form>

      {resources.length === 0 ? (
        <p className="text-sm text-slate-500">No resources uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {resources.map((resource) => (
            <li
              key={resource.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:border-navy/25"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/10 text-navy">
                  <Paperclip size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-navy">{resource.title}</p>
                  <p className="truncate text-xs text-slate-500">
                    {resource.fileName} &middot; {resource.size} &middot; {resource.class} &middot;{' '}
                    {resource.subject}
                  </p>
                  <p className="text-xs text-slate-400">Uploaded {formatDate(resource.uploadedOn)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(resource.id)}
                aria-label={`Delete ${resource.title}`}
                className="rounded-lg p-1.5 text-danger transition-colors hover:bg-danger/10"
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
