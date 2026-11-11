'use client';

import { useEffect, useState } from 'react';
import { requireRole } from '@/lib/auth';
import { getCurrentUser } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import StatCard from '@/components/StatCard';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import { STUDENTS, TEACHERS, FEES, ADMIN_USERS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Users, GraduationCap, CreditCard, Shield, Plus, Trash2, Edit } from 'lucide-react';

export default function SuperAdminDashboard() {
  if (typeof window !== 'undefined') {
    requireRole(['super_admin']);
  }

  const [users, setUsers] = useState(ADMIN_USERS);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'admin' as 'admin' | 'teacher' | 'student', password: '' });

  useEffect(() => {
    requireRole(['super_admin']);
  }, []);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([...users, { id: `u${users.length + 1}`, ...newUser }]);
    setShowCreateUser(false);
    setNewUser({ name: '', email: '', role: 'admin', password: '' });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const totalStudents = STUDENTS.length;
  const totalTeachers = TEACHERS.length;
  const totalRevenue = FEES.reduce((sum, f) => sum + f.paid, 0);
  const totalAdmins = users.filter((u) => u.role === 'admin').length;

  return (
    <DashboardShell allowedRoles={['super_admin']}>
      <div className="space-y-6">
        <PageHeader title="Super Admin Dashboard" subtitle="Manage users, roles, and school settings" breadcrumb="Dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Students" value={totalStudents} change="+12 this term" changeType="positive" icon={<Users className="w-5 h-5" />} />
          <StatCard title="Total Teachers" value={totalTeachers} change="+3 this term" changeType="positive" icon={<GraduationCap className="w-5 h-5" />} />
          <StatCard title="Revenue Collected" value={formatCurrency(totalRevenue)} change="+8.5% vs last term" changeType="positive" icon={<CreditCard className="w-5 h-5" />} />
          <StatCard title="Admins" value={totalAdmins} change="2 active" changeType="neutral" icon={<Shield className="w-5 h-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-navy">Manage Users</h2>
              <button
                onClick={() => setShowCreateUser(true)}
                className="flex items-center gap-2 bg-navy text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-navy/90 transition-colors"
              >
                <Plus size={16} /> Create User
              </button>
            </div>
            <DataTable
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'role', label: 'Role', format: (r: string) => r.replace('_', ' ').toUpperCase() },
              ]}
              data={users}
              searchableKeys={['name', 'email']}
              emptyMessage="No users found."
              actions={(user) => (
                <div className="flex gap-2">
                  <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            />
          </div>

          {showCreateUser && (
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
              <h2 className="font-bold text-lg text-navy mb-6">Create New User</h2>
              <form onSubmit={handleCreateUser} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'teacher' | 'student' })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-navy text-white px-4 py-3 rounded-lg font-medium hover:bg-navy/90 transition-colors">
                    Create User
                  </button>
                  <button type="button" onClick={() => setShowCreateUser(false)} className="flex-1 bg-white text-slate-600 border border-slate-200 px-4 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
          <h2 className="font-bold text-lg text-navy mb-6">Manage Roles (Read-Only)</h2>
          <p className="text-sm text-slate-500 mb-6">Permission matrix for each role. Phase 1: view only.</p>
          <DataTable
            columns={[
              { key: 'name', label: 'User' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role', format: (r: string) => r.replace('_', ' ').toUpperCase() },
            ]}
            data={users}
            searchableKeys={['name', 'email']}
            emptyMessage="No roles configured."
          />
        </div>
      </div>
    </DashboardShell>
  );
}