'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import { ADMIN_USERS } from '@/lib/data';
import type { Role } from '@/types';

export type ManagedUser = {
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

export default function UsersSection() {
  const [users, setUsers] = useState<ManagedUser[]>(ADMIN_USERS);
  const [createOpen, setCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'admin' as Role,
    password: '',
  });

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

  return (
    <>
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
    </>
  );
}
