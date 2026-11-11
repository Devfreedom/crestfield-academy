'use client';

import SectionCard from '@/components/SectionCard';
import { PERMISSIONS } from '@/lib/data';
import type { Role } from '@/types';

const ROLE_LABEL: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  teacher: 'Teacher',
  student: 'Student',
};

const ROLES: Role[] = ['super_admin', 'admin', 'teacher', 'student'];

export default function RolesSection() {
  return (
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
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Area
              </th>
              {ROLES.map((role) => (
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
                {ROLES.map((role) => (
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
  );
}
