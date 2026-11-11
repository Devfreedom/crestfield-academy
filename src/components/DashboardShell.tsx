'use client';

import { useEffect, useState } from 'react';
import { Bell, LogOut, Menu, ShieldCheck } from 'lucide-react';
import Sidebar from './Sidebar';
import Modal from './Modal';
import { useCurrentUser } from '@/lib/useAuth';
import { logout, type Role } from '@/lib/auth';
import { ANNOUNCEMENTS } from '@/lib/data';
import { formatDate } from '@/lib/utils';

type DashboardShellProps = {
  allowedRoles: Role[];
  children: React.ReactNode;
};

const ROLE_LABEL: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin: 'Administrator',
  teacher: 'Teacher',
  student: 'Student',
};

export default function DashboardShell({ allowedRoles, children }: DashboardShellProps) {
  const { user, ready } = useCurrentUser();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const authorised = ready && user !== null && allowedRoles.includes(user.role);

  // Redirect to login when the visitor is signed in with the wrong role.
  useEffect(() => {
    if (!ready) return;
    if (!user || !allowedRoles.includes(user.role)) {
      window.location.href = '/login?error=access-denied';
    }
  }, [ready, user, allowedRoles]);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileNavOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileNavOpen]);

  if (!ready || !authorised) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <ShieldCheck size={18} aria-hidden="true" />
          Checking your access&hellip;
        </p>
      </div>
    );
  }

  const relevantAnnouncements = ANNOUNCEMENTS.filter((announcement) =>
    announcement.audience.includes(user.role),
  );

  return (
    <div className="min-h-screen bg-slate-50 md:pl-64">
      <Sidebar
        role={user.role}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
              aria-controls="dashboard-navigation"
              className="rounded-lg p-2 text-navy transition-colors hover:bg-slate-100 md:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-poppins text-lg font-bold text-navy">
              Crestfield Portal
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              aria-label={`Notifications (${relevantAnnouncements.length} unread)`}
              className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy"
            >
              <Bell size={20} />
              {relevantAnnouncements.length > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger"
                />
              )}
            </button>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-2 sm:pl-4">
              <div className="hidden flex-col items-end md:flex">
                <p className="text-sm font-medium text-navy">{user.name}</p>
                <p className="text-xs text-slate-500">{ROLE_LABEL[user.role]}</p>
              </div>
              <div
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-medium text-white"
              >
                {user.name.charAt(0)}
              </div>
              <button
                type="button"
                onClick={logout}
                aria-label="Sign out"
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy md:hidden"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>

      <Modal
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        title="Notifications"
        description="Announcements published for your role."
      >
        {relevantAnnouncements.length === 0 ? (
          <p className="text-sm text-slate-500">You have no new notifications.</p>
        ) : (
          <ul className="space-y-3">
            {relevantAnnouncements.map((announcement) => (
              <li key={announcement.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="font-medium text-navy">{announcement.title}</p>
                <p className="mt-1 text-sm text-slate-600">{announcement.content}</p>
                <p className="mt-2 text-xs text-slate-400">{formatDate(announcement.date)}</p>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
}
