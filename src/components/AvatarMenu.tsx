'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Home, LogOut } from 'lucide-react';
import { logout } from '@/lib/auth';

type AvatarMenuProps = {
  name: string;
  roleLabel: string;
};

/**
 * Topbar account menu: name + role beside a navy avatar circle; clicking it
 * opens a native popover with the account header, "Go to Homepage" and
 * "Sign Out". The browser supplies light dismiss, Escape handling and focus
 * restoration, so there are no document-level listeners.
 */
export default function AvatarMenu({ name, roleLabel }: AvatarMenuProps) {
  const rawId = useId();
  const menuId = `avatar-menu-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const anchorName = `--avatar-anchor-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Keep aria-expanded and the chevron in sync with the popover state, and
  // bind the popover to the trigger with an explicit anchor so CSS anchor
  // positioning can place it. The rect fallback vars are set on open.
  useEffect(() => {
    const menu = menuRef.current;
    const trigger = triggerRef.current;
    if (!menu) return;

    if (trigger) {
      trigger.style.setProperty('anchor-name', anchorName);
      menu.style.setProperty('position-anchor', anchorName);
    }

    const handleToggle = (event: Event) => {
      const target = event.target as HTMLElement;
      const isOpen = target.matches(':popover-open');
      setOpen(isOpen);

      if (isOpen) {
        const trigger = triggerRef.current;
        const rect = trigger?.getBoundingClientRect();
        if (rect) {
          menu.style.setProperty('--trigger-bottom', `${Math.round(rect.bottom)}px`);
          menu.style.setProperty('--trigger-right', `${Math.round(window.innerWidth - rect.right)}px`);
        }
      }
    };

    menu.addEventListener('toggle', handleToggle);
    return () => menu.removeEventListener('toggle', handleToggle);
  }, [anchorName]);

  // ArrowDown from the trigger enters the menu, so keyboard users are not
  // forced to tab past it.
  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    const menu = menuRef.current;
    if (!menu) return;
    if (!menu.matches(':popover-open')) menu.showPopover();
    menu.querySelector<HTMLElement>('a, button')?.focus();
  };

  const close = () => {
    menuRef.current?.hidePopover();
  };

  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        popoverTarget={menuId}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Account menu for ${name}`}
        onKeyDown={handleTriggerKeyDown}
        className="flex items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <span className="hidden flex-col items-end leading-tight sm:flex">
          <span className="max-w-40 truncate text-sm font-medium text-navy">{name}</span>
          <span className="text-xs text-slate-500">{roleLabel}</span>
        </span>
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
        >
          {initial}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        ref={menuRef}
        id={menuId}
        popover="auto"
        aria-label={`Account menu for ${name}`}
        className="popover-menu"
      >
        <div className="px-3 pb-2 pt-2.5">
          <p className="truncate text-sm font-semibold text-navy">{name}</p>
          <p className="text-xs text-slate-500">{roleLabel}</p>
        </div>
        <hr className="border-slate-100" />
        <div className="p-1">
          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-navy"
          >
            <Home size={16} aria-hidden="true" />
            Go to Homepage
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-navy"
          >
            <LogOut size={16} aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
