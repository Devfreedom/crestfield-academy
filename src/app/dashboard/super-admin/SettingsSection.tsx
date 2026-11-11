'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import { SCHOOL_SETTINGS, SESSION_OPTIONS, TERM_OPTIONS } from '@/lib/data';

export default function SettingsSection() {
  const [settings, setSettings] = useState(SCHOOL_SETTINGS);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <SectionCard
      id="settings"
      title="School Settings"
      description="Term, session, and contact details shown across the portals."
    >
      <form onSubmit={handleSubmit} className="grid max-w-3xl gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="school-name" className="mb-2 block text-sm font-medium text-slate-700">
            School Name
          </label>
          <input
            id="school-name"
            name="schoolName"
            type="text"
            required
            autoComplete="organization"
            value={settings.schoolName}
            onChange={(event) => setSettings({ ...settings, schoolName: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="term" className="mb-2 block text-sm font-medium text-slate-700">
            Current Term
          </label>
          <select
            id="term"
            name="term"
            value={settings.term}
            onChange={(event) => setSettings({ ...settings, term: event.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          >
            {TERM_OPTIONS.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="session" className="mb-2 block text-sm font-medium text-slate-700">
            Session
          </label>
          <select
            id="session"
            name="session"
            value={settings.session}
            onChange={(event) => setSettings({ ...settings, session: event.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          >
            {SESSION_OPTIONS.map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-700">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            autoComplete="street-address"
            value={settings.address}
            onChange={(event) => setSettings({ ...settings, address: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="school-email" className="mb-2 block text-sm font-medium text-slate-700">
            Contact Email
          </label>
          <input
            id="school-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={settings.email}
            onChange={(event) => setSettings({ ...settings, email: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="school-phone" className="mb-2 block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            id="school-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={settings.phone}
            onChange={(event) => setSettings({ ...settings, phone: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4 sm:col-span-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-medium text-white transition-colors hover:bg-navy/90"
          >
            <Save size={16} aria-hidden="true" />
            Save Settings
          </button>
          {saved && (
            <p role="status" className="text-sm font-medium text-success">
              Settings saved successfully.
            </p>
          )}
        </div>
      </form>
    </SectionCard>
  );
}
