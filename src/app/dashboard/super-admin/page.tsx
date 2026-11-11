'use client';

import DashboardShell from '@/components/DashboardShell';
import OverviewSection from './OverviewSection';
import AnalyticsSection from './AnalyticsSection';
import UsersSection from './UsersSection';
import RolesSection from './RolesSection';
import SettingsSection from './SettingsSection';
import { ADMIN_USERS } from '@/lib/data';

export default function SuperAdminDashboard() {
  const totalAdmins = ADMIN_USERS.filter(
    (user) => user.role === 'admin' || user.role === 'super_admin',
  ).length;

  return (
    <DashboardShell allowedRoles={['super_admin']}>
      <div className="space-y-6">
        <section id="overview" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="font-poppins text-2xl font-bold text-navy">Super Admin Dashboard</h2>
            <p className="mt-1 text-slate-600">
              Manage users, roles, and school settings for Crestfield Academy.
            </p>
          </div>
          <OverviewSection totalUsers={ADMIN_USERS.length} totalAdmins={totalAdmins} />
        </section>

        <AnalyticsSection />
        <UsersSection />
        <RolesSection />
        <SettingsSection />
      </div>
    </DashboardShell>
  );
}
