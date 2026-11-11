'use client';

import SectionCard from '@/components/SectionCard';
import { ANNOUNCEMENTS } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export default function AnnouncementsSection() {
  const announcements = ANNOUNCEMENTS.filter((announcement) =>
    announcement.audience.includes('student'),
  );

  return (
    <SectionCard
      id="announcements"
      title="Announcements &amp; Events"
      description="Notices from the school leadership team."
    >
      {announcements.length === 0 ? (
        <p className="text-sm text-slate-500">No announcements right now. Check back soon.</p>
      ) : (
        <ul className="space-y-3">
          {announcements.map((announcement) => (
            <li
              key={announcement.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-navy/25"
            >
              <p className="font-medium text-navy">{announcement.title}</p>
              <p className="mt-1 text-sm text-slate-600">{announcement.content}</p>
              <p className="mt-2 text-xs text-slate-400">{formatDate(announcement.date)}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <h3 className="mb-3 font-poppins text-base font-bold text-navy">Upcoming events</h3>
        <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
          {[
            { date: 'November 15-17', title: 'Mid-Term Break', detail: 'School closed. Classes resume Monday, November 18.' },
            { date: 'November 22', title: 'Parent-Teacher Meeting', detail: '3:00 PM in the main hall for SS1 and SS2.' },
            { date: 'November 30', title: 'WAEC Registration Deadline', detail: 'Pay your fees at the bursary office before the deadline.' },
            { date: 'December 12', title: 'Inter-House Sports', detail: 'Closing ceremony begins at 2:00 PM on the school field.' },
          ].map((event) => (
            <li key={event.title} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="font-medium text-navy">{event.title}</p>
                <p className="text-xs text-slate-500">{event.detail}</p>
              </div>
              <span className="shrink-0 rounded bg-navy/10 px-2.5 py-1 text-xs font-medium text-navy">
                {event.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}
