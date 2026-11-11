'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  School,
  LogOut,
  User,
  Shield,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
} from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/contact', label: 'Contact' },
];

const DASHBOARD_LINKS: Record<string, { href: string; label: string; icon: any }> = {
  super_admin: { href: '/dashboard/super-admin', label: 'Super Admin Dashboard', icon: LayoutDashboard },
  admin: { href: '/dashboard/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
  teacher: { href: '/dashboard/teacher', label: 'Teacher Dashboard', icon: LayoutDashboard },
  student: { href: '/dashboard/student', label: 'Student Dashboard', icon: LayoutDashboard },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const user = getCurrentUser();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-gold font-bold text-lg shadow-lg">
              CA
            </div>
            <span className="font-bold text-xl tracking-tight text-navy">Crestfield Academy</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href={DASHBOARD_LINKS[user.role]?.href || '/login'}
                  className="text-sm font-medium text-slate-600 hover:text-navy transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-sm font-medium text-navy hover:text-navy/90 transition-colors"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-navy text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-navy/90 transition-colors">
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 text-navy hover:text-navy/90"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-6 py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-slate-600 hover:text-navy py-2"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href={DASHBOARD_LINKS[user.role]?.href || '/login'}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-slate-600 hover:text-navy py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="block w-full text-left text-sm font-medium text-navy py-2"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-navy text-white text-center py-2 rounded-lg text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}