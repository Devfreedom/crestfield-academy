'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { getCurrentUser, logout, type Role } from '@/lib/auth';

type DashboardShellProps = {
  allowedRoles: Role[];
  children: React.ReactNode;
};

export default function DashboardShell({ allowedRoles, children }: DashboardShellProps) {
  const pathname = usePathname();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !allowedRoles.includes(user.role)) {
      window.location.href = `/login?error=access-denied`;
    }
  }, [allowedRoles, pathname]);

  const user = getCurrentUser();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 text-navy hover:text-navy/90"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-bold text-lg text-navy font-poppins">Crestfield Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:text-navy relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden md:flex flex-col items-end">
                <p className="text-sm font-medium text-navy">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role || ''}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-medium text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <button
                onClick={logout}
                className="md:hidden p-2 text-slate-600 hover:text-navy"
                aria-label="Sign out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}