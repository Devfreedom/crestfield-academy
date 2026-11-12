'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useCurrentUser } from '@/lib/useAuth';
import { logout, ROLE_HOME } from '@/lib/auth';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useCurrentUser();
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * The mobile menu is a native popover, so the browser handles light dismiss,
   * Escape and top-layer rendering. We only mirror its open state so the
   * trigger's aria-expanded stays accurate and the icon can swap.
   */
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const handleToggle = (event: Event) => {
      const element = event.target as HTMLElement;
      setMenuOpen(element.matches(':popover-open'));
    };

    menu.addEventListener('toggle', handleToggle);
    return () => menu.removeEventListener('toggle', handleToggle);
  }, []);

  const dashboardHref = user ? ROLE_HOME[user.role] : '/login';

  /** True when the link points at the page currently being viewed. */
  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : Boolean(pathname?.startsWith(href));

  const closeMenu = () => {
    const menu = menuRef.current;
    if (menu?.matches(':popover-open')) menu.hidePopover();
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 bg-white transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy font-bold text-lg text-gold shadow-sm"
            >
              CA
            </span>
            <span className="font-poppins text-xl font-bold tracking-tight text-navy">
              Crestfield Academy
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent(link.href) ? 'page' : undefined}
                className={`text-sm font-medium transition-colors hover:text-navy ${
                  isCurrent(link.href) ? 'text-navy' : 'text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-navy/80"
                >
                  <LayoutDashboard size={16} aria-hidden="true" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-navy/80"
                >
                  <LogOut size={16} aria-hidden="true" />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-navy/90"
              >
                Login
              </Link>
            )}
          </div>

          <button
            type="button"
            popoverTarget="mobile-navigation"
            aria-label={menuOpen ? 'Close main menu' : 'Open main menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="rounded-lg p-2 text-navy transition-colors hover:bg-slate-100 md:hidden"
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        ref={menuRef}
        id="mobile-navigation"
        popover="auto"
        aria-label="Main"
        className="site-menu md:hidden"
      >
        <div className="space-y-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              aria-current={isCurrent(link.href) ? 'page' : undefined}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-navy ${
                isCurrent(link.href) ? 'bg-slate-50 text-navy' : 'text-slate-600'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href={dashboardHref}
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-slate-50"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-navy transition-colors hover:bg-slate-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={closeMenu}
              className="mt-2 block rounded-lg bg-navy px-3 py-2 text-center text-sm font-medium text-white"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
