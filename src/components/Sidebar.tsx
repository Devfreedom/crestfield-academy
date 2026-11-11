'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  User,
  GraduationCap,
  FileText,
  BarChart3,
  Settings,
  Shield,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Calendar,
  ClipboardList,
  CreditCard,
  Megaphone,
} from 'lucide-react';
import { getCurrentUser, logout, type Role } from '@/lib/auth';

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: Role[];
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard/super-admin', icon: LayoutDashboard, roles: ['super_admin', 'admin', 'teacher', 'student'] },
  { label: 'Manage Users', href: '/dashboard/super-admin/users', icon: Users, roles: ['super_admin'] },
  { label: 'Students', href: '/dashboard/admin/students', icon: User, roles: ['admin'] },
  { label: 'Classes & Timetable', href: '/dashboard/admin/classes', icon: GraduationCap, roles: ['admin'] },
  { label: 'Fees', href: '/dashboard/admin/fees', icon: CreditCard, roles: ['admin'] },
  { label: 'Announcements', href: '/dashboard/admin/announcements', icon: Megaphone, roles: ['admin'] },
  { label: 'My Classes', href: '/dashboard/teacher/classes', icon: GraduationCap, roles: ['teacher'] },
  { label: 'Attendance', href: '/dashboard/teacher/attendance', icon: ClipboardList, roles: ['teacher'] },
  { label: 'Assignments', href: '/dashboard/teacher/assignments', icon: FileText, roles: ['teacher'] },
  { label: 'Grades', href: '/dashboard/teacher/grades', icon: BarChart3, roles: ['teacher'] },
  { label: 'My Classes', href: '/dashboard/student/classes', icon: Calendar, roles: ['student'] },
  { label: 'Assignments', href: '/dashboard/student/assignments', icon: FileText, roles: ['student'] },
  { label: 'Grades', href: '/dashboard/student/grades', icon: BarChart3, roles: ['student'] },
  { label: 'Fees', href: '/dashboard/student/fees', icon: CreditCard, roles: ['student'] },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['super_admin', 'admin'] },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const user = getCurrentUser();
  const role = user?.role;

  const items = SIDEBAR_ITEMS.filter((item) => item.roles.includes(role as Role));

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 border-r border-slate-200 bg-white ${
          collapsed ? 'w-16 md:w-16' : 'w-64 md:w-64'
        } ${!collapsed && 'shadow-lg'}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center text-gold font-bold">
              CA
            </div>
            {!collapsed && (
              <span className="font-bold text-lg tracking-tight text-navy">Crestfield</span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 text-navy hover:text-navy/90 md:hidden"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={20} /> : <X size={20} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-navy hover:text-navy/90 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="py-4 space-y-1">
          {items.map((item) => {
            const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-navy/10 text-navy border-r-2 border-navy'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-navy'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-navy' : 'text-slate-400'}`} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-navy hover:bg-slate-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            {!collapsed && 'Sign out'}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed left-0 top-0 h-full z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300">
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
            <span className="font-bold text-lg tracking-tight text-navy">Crestfield Academy</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-navy hover:text-navy/90"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="py-4 space-y-1 px-4">
            {items.map((item) => {
              const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-navy/10 text-navy border-r-2 border-navy'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-navy'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-navy' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-navy hover:bg-slate-50 rounded-lg transition-colors"
            >
              <LogOut size={18} /> Sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
}