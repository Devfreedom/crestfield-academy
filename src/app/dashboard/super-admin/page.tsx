'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Users, GraduationCap, CreditCard, Shield, Plus, Trash2, Save, TrendingUp } from 'lucide-react';
import DashboardShell from '@/components/DashboardShell';
import StatCard from '@/components/StatCard';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import {
  ADMIN_USERS,
  ENROLLMENT_GROWTH,
  PERMISSIONS,
  REVENUE_BY_TERM,
  SCHOOL_SETTINGS,
  SESSION_OPTIONS,
  STUDENTS,
  TEACHERS,
  TERM_OPTIONS,
} from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import type { Role } from '@/types';

type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

const ROLE_LABEL: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  teacher: 'Teacher',
  student: 'Student',
};

const AXIS_PROPS = {
  stroke: '#94a3b8',
  fontSize: 12,
  tickLine: false,
  axisLine: false,
} as const;

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState<ManagedUser[]>(ADMIN_USERS);
  const [createOpen, setCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'admin' as Role,
    password: '',
  });
  const [settings, setSettings] = useState(SCHOOL_SETTINGS);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const created: ManagedUser = {
      id: `u${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    setUsers((current) => [...current, created]);
    setCreateOpen(false);
    setNewUser({ name: '', email: '', role: 'admin', password: '' });
  };

  const handleDeleteUser = (id: string) => {
    setUsers((current) => current.filter((user) => user.id !== id));
  };

  const handleSaveSettings = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSettingsSaved(true);
  };

  const totalStudents = STUDENTS.length;
  const totalTeachers = TEACHERS.length;
  const totalRevenue = REVENUE_BY_TERM.reduce((sum, term) => sum + term.collected, 0);
  const totalAdmins = users.filter((user) => user.role === 'admin' || user.role === 'super_admin').length;

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

          <div className="card-grid">
            <StatCard
              title="Total Students"
              value={totalStudents}
              change="+12 this term"
              changeType="positive"
              icon={<Users size={20} aria-hidden="true" />}
            />
            <StatCard
              title="Total Teachers"
              value={totalTeachers}
              change="+3 this term"
              changeType="positive"
              icon={<GraduationCap size={20} aria-hidden="true" />}
            />
            <StatCard
              title="Revenue Collected"
              value={formatCurrency(totalRevenue)}
              change="+8.5% vs last term"
              changeType="positive"
              icon={<CreditCard size={20} aria-hidden="true" />}
            />
            <StatCard
              title="Administrators"
              value={totalAdmins}
              change={`${users.length} portal users`}
              changeType="neutral"
              icon={<Shield size={20} aria-hidden="true" />}
            />
          </div>
        </section>

        <SectionCard
          id="analytics"
          title="Revenue &amp; Enrollment"
          description="Term-by-term revenue and five-year enrollment growth."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-navy">
                <TrendingUp size={16} className="text-gold" aria-hidden="true" />
                Revenue by term
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={REVENUE_BY_TERM} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="term" {...AXIS_PROPS} />
                    <YAxis
                      {...AXIS_PROPS}
                      width={62}
                      tickFormatter={(value: number) => `₦${Math.round(value / 1_000_000)}m`}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.75rem',
                      }}
                    />
                    <Bar dataKey="revenue" name="Billed" fill="#c9a227" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="collected" name="Collected" fill="#0b1f4b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-navy">
                <TrendingUp size={16} className="text-gold" aria-hidden="true" />
                Enrollment growth
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ENROLLMENT_GROWTH} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="session" {...AXIS_PROPS} />
                    <YAxis {...AXIS_PROPS} width={44} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.75rem',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="students"
                      name="Students"
                      stroke="#0b1f4b"
                      strokeWidth={3}
                      dot={{ r: 3, fill: '#c9a227' }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="teachers"
                      name="Teachers"
                      stroke="#c9a227"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#0b1f4b' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="users"
          title="Manage Users"
          description="Create portal accounts and revoke access."
          actions={
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy/90"
            >
              <Plus size={16} aria-hidden="true" />
              Create User
            </button>
          }
        >
          <DataTable<ManagedUser>
            caption="Portal users"
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role', format: (value) => ROLE_LABEL[value as Role] },
            ]}
            data={users}
            searchableKeys={['name', 'email']}
            searchPlaceholder="Search users..."
            emptyMessage="No users found."
            rowActions={(user) => (
              <button
                type="button"
                onClick={() => handleDeleteUser(user.id)}
                aria-label={`Delete ${user.name}`}
                className="rounded-lg p-1.5 text-danger transition-colors hover:bg-danger/10"
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            )}
          />
        </SectionCard>

        <SectionCard
          id="roles"
          title="Manage Roles"
          description="Permission matrix for each role. Read-only in Phase 1."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Role permissions matrix</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Area
                  </th>
                  {(['super_admin', 'admin', 'teacher', 'student'] as Role[]).map((role) => (
                    <th
                      key={role}
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {ROLE_LABEL[role]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PERMISSIONS.map((permission) => (
                  <tr key={permission.area} className="transition-colors hover:bg-slate-50">
                    <th scope="row" className="px-4 py-3 font-medium text-navy">
                      {permission.area}
                    </th>
                    {(['super_admin', 'admin', 'teacher', 'student'] as Role[]).map((role) => (
                      <td key={role} className="px-4 py-3 text-center">
                        {permission[role] ? (
                          <span className="font-semibold text-success">Yes</span>
                        ) : (
                          <span className="text-slate-400">&mdash;</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard
          id="settings"
          title="School Settings"
          description="Term, session, and contact details shown across the portals."
        >
          <form onSubmit={handleSaveSettings} className="grid max-w-3xl gap-5 sm:grid-cols-2">
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
              {settingsSaved && (
                <p role="status" className="text-sm font-medium text-success">
                  Settings saved successfully.
                </p>
              )}
            </div>
          </form>
        </SectionCard>
      </div>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create New User"
        description="The account can sign in with the password you set."
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
              form="create-user-form"
              className="rounded-lg bg-navy px-4 py-2.5 font-medium text-white transition-colors hover:bg-navy/90"
            >
              Create User
            </button>
          </>
        }
      >
        <form id="create-user-form" onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label htmlFor="new-user-name" className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="new-user-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              autoFocus
              value={newUser.name}
              onChange={(event) => setNewUser({ ...newUser, name: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="new-user-email" className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="new-user-email"
              name="email"
              type="email"
              required
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              value={newUser.email}
              onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="new-user-role" className="mb-2 block text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              id="new-user-role"
              name="role"
              value={newUser.role}
              onChange={(event) => setNewUser({ ...newUser, role: event.target.value as Role })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div>
            <label htmlFor="new-user-password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="new-user-password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={newUser.password}
              onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
            <p className="mt-1 text-xs text-slate-500">At least 8 characters.</p>
          </div>
        </form>
      </Modal>
    </DashboardShell>
  );
}
