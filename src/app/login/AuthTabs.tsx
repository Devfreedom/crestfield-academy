'use client';

import { useRef } from 'react';

export type AuthTabId = 'login' | 'register';

type AuthTabsProps = {
  active: AuthTabId;
  onChange: (tab: AuthTabId) => void;
};

const TABS: { id: AuthTabId; label: string }[] = [
  { id: 'login', label: 'Login' },
  { id: 'register', label: 'Register' },
];

/**
 * ARIA tablist with a roving tabindex and selection that follows focus
 * (arrow keys / Home / End). The selected tab is marked by an underline drawn
 * with a border, so the indicator survives forced-colors mode.
 */
export default function AuthTabs({ active, onChange }: AuthTabsProps) {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TABS.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = index === last ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = index === 0 ? last : index - 1;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = last;
    }

    if (next === null) return;
    event.preventDefault();
    onChange(TABS[next].id);
    buttonsRef.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label="Sign in or request an account" className="flex">
      {TABS.map((tab, index) => {
        const selected = active === tab.id;
        return (
          <button
            key={tab.id}
            ref={(element) => {
              buttonsRef.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${tab.id}-tab`}
            aria-selected={selected}
            aria-controls={`${tab.id}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`flex-1 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              selected
                ? 'border-gold text-navy'
                : 'border-transparent text-slate-500 hover:text-navy'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
