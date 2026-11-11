'use client';

import DashboardShell from '@/components/DashboardShell';
import OverviewSection from './OverviewSection';
import StudentsSection from './StudentsSection';
import ClassesSection from './ClassesSection';
import FeesSection from './FeesSection';
import AnnouncementsSection from './AnnouncementsSection';
import ReportsSection from './ReportsSection';

export default function AdminDashboard() {
  return (
    <DashboardShell allowedRoles={['admin']}>
      <div className="space-y-6">
        <section id="overview" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="font-poppins text-2xl font-bold text-navy">Admin Dashboard</h2>
            <p className="mt-1 text-slate-600">
              Manage students, classes, fees, announcements, and school reports.
            </p>
          </div>
          <OverviewSection />
        </section>

        <StudentsSection />
        <ClassesSection />
        <FeesSection />
        <AnnouncementsSection />
        <ReportsSection />
      </div>
    </DashboardShell>
  );
}
