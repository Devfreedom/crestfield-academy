'use client';

import { Mail } from 'lucide-react';

type DemoAccountsProps = {
  onFill: (email: string) => void;
};

const DEMO_ACCOUNTS = [
  { role: 'Super Admin', email: 'superadmin@crestfield.edu.ng', desc: 'Full system access' },
  { role: 'Admin', email: 'admin@crestfield.edu.ng', desc: 'Students & fees' },
  { role: 'Teacher', email: 'teacher@crestfield.edu.ng', desc: 'Classes & grades' },
  { role: 'Student', email: 'student@crestfield.edu.ng', desc: 'Personal portal' },
];

/**
 * The four demo accounts. Clicking a card fills the sign-in form; the badge is
 * dark gold text on a light gold background so it stays readable.
 */
export default function DemoAccounts({ onFill }: DemoAccountsProps) {
  return (
    <section aria-labelledby="demo-accounts-heading" className="mt-8 w-full max-w-md">
      <h2 id="demo-accounts-heading" className="font-poppins text-sm font-bold uppercase tracking-wide text-slate-500">
        Demo Accounts
      </h2>
      <p className="mb-3 mt-1 text-xs text-slate-500">
        Select an account to fill the form, then sign in.
      </p>
      <div className="grid gap-2.5">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.email}
            type="button"
            onClick={() => onFill(account.email)}
            aria-label={`Fill the sign in form with the ${account.role} demo account, ${account.email}`}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition-colors hover:border-navy/30 hover:bg-navy/5"
          >
            <span>
              <span className="block text-sm font-semibold text-navy">{account.role}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <Mail size={13} aria-hidden="true" />
                {account.email}
              </span>
            </span>
            <span className="shrink-0 rounded-md bg-gold/15 px-2 py-1 text-[11px] font-semibold text-[#6d5308]">
              {account.desc}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
