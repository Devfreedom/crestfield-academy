'use client';

import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  Calendar,
  ClipboardList,
  CreditCard,
  Megaphone,
  Paperclip,
  TrendingUp,
  X,
  type LucideIcon,
} from 'lucide-react';
import { logout, type Role } from '@/lib/auth';

type Section = {
  id: string;
  label: string;
  icon: LucideIcon;
};

/**
 * Each role portal is a single page (per the AGENTS.md folder structure), so the
 * sidebar navigates to sections on that page via anchors instead of linking to
 * routes that do not exist.
 */
const SIDEBAR_SECTIONS: Record<Role, Section[]> = {
  super_admin: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Revenue & Enrollment', icon: TrendingUp },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'roles', label: 'Manage Roles', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  admin: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'classes', label: 'Classes & Timetable', icon: GraduationCap },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ],
  teacher: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'classes', label: 'My Classes', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'grades', label: 'Grades', icon: BarChart3 },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: Paperclip },
  ],
  student: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'classes', label: 'My Classes', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'grades', label: 'Grades', icon: BarChart3 },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
  ],
};

type SidebarProps = {
  role: Role;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

function SidebarBody({ role, activeId, onNavigate }: { role: Role; activeId: string; onNavigate: () => void }) {
  const sections = SIDEBAR_SECTIONS[role] ?? [];

  return (
    <>
      <nav aria-label="Dashboard sections" className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          const Icon = section.icon;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={onNavigate}
              aria-current={isActive ? 'true' : undefined}
              className={`flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-gold bg-navy/5 text-navy'
                  : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-navy'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-navy' : 'text-slate-400'} aria-hidden="true" />
              {section.label}
            </a>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-slate-50"
        >
          <LogOut size={18} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </>
  );
}

export default function Sidebar({ role, mobileOpen, onMobileClose }: SidebarProps) {
  const [activeId, setActiveId] = useState('overview');

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = SIDEBAR_SECTIONS[role] ?? [];
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: [0.05, 0.25, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [role]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onMobileClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy font-bold text-gold">
            CA
          </div>
          <span className="font-poppins text-base font-bold tracking-tight text-navy">Crestfield</span>
        </div>
        <SidebarBody role={role} activeId={activeId} onNavigate={() => {}} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onMobileClose}
            className="absolute inset-0 h-full w-full cursor-default bg-navy/50"
          />
          <aside
            id="dashboard-navigation"
            aria-label="Dashboard sections"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy font-bold text-gold">
                  CA
                </div>
                <span className="font-poppins text-base font-bold tracking-tight text-navy">
                  Crestfield
                </span>
              </div>
              <button
                type="button"
                onClick={onMobileClose}
                aria-label="Close navigation menu"
                className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarBody role={role} activeId={activeId} onNavigate={onMobileClose} />
          </aside>
        </div>
      )}
    </>
  );
}
