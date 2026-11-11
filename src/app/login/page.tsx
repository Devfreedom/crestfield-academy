'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, User, AlertCircle, LayoutDashboard } from 'lucide-react';
import { DEMO_USERS, ROLE_HOME, setCurrentUser } from '@/lib/auth';
import { useCurrentUser } from '@/lib/useAuth';

const DEMO_ACCOUNTS = [
  { role: 'Super Admin', email: 'superadmin@crestfield.edu.ng', desc: 'Full system access' },
  { role: 'Admin', email: 'admin@crestfield.edu.ng', desc: 'Student & fees management' },
  { role: 'Teacher', email: 'teacher@crestfield.edu.ng', desc: 'Classes, attendance, grades' },
  { role: 'Student', email: 'student@crestfield.edu.ng', desc: 'Personal dashboard & fees' },
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessError = searchParams.get('error') === 'access-denied';
  const { user } = useCurrentUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    const account = DEMO_USERS.find((candidate) => candidate.email === email.trim().toLowerCase());
    if (!account || password !== 'password123') {
      setFormError('Invalid email or password. Use any demo account with password123.');
      return;
    }

    setCurrentUser(account);
    router.push(ROLE_HOME[account.role]);
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setFormError('');
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex items-center justify-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold font-bold text-navy"
              >
                CA
              </span>
              <span className="font-poppins text-2xl font-bold text-white">Crestfield Academy</span>
            </div>
            <h1 className="mb-4 font-poppins text-3xl font-bold text-white">Welcome Back</h1>
            <p className="mb-8 text-slate-200">
              Sign in to access your Crestfield Academy portal.
            </p>

            {accessError && (
              <div
                role="alert"
                className="mb-6 flex items-center gap-3 rounded-lg border border-red-300/40 bg-red-500/15 p-4 text-left text-sm text-red-100"
              >
                <AlertCircle size={18} className="shrink-0" aria-hidden="true" />
                Access denied. That portal is only available to its own role. Sign in below to continue.
              </div>
            )}

            {formError && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-6 flex items-center gap-3 rounded-lg border border-red-300/40 bg-red-500/15 p-4 text-left text-sm text-red-100"
              >
                <AlertCircle size={18} className="shrink-0" aria-hidden="true" />
                {formError}
              </div>
            )}

            {user && (
              <div className="mb-6 flex flex-col items-center gap-3 rounded-lg border border-gold/40 bg-gold/15 p-4 text-sm text-gold sm:flex-row sm:justify-between sm:text-left">
                <p>
                  You are signed in as <span className="font-semibold">{user.name}</span>.
                </p>
                <a
                  href={ROLE_HOME[user.role]}
                  className="flex items-center gap-2 font-semibold underline underline-offset-4"
                >
                  <LayoutDashboard size={16} aria-hidden="true" />
                  Go to your dashboard
                </a>
              </div>
            )}

            <form
              onSubmit={handleLogin}
              aria-labelledby="sign-in-heading"
              className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-8"
            >
              <h2 id="sign-in-heading" className="sr-only">
                Sign in to Crestfield Academy
              </h2>

              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                  <User size={20} aria-hidden="true" />
                </span>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="flex-1 border-b border-white/25 bg-transparent pb-2 text-white placeholder-slate-300 transition-colors focus:border-gold focus:outline-none focus:ring-0"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                  <Lock size={20} aria-hidden="true" />
                </span>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="flex-1 border-b border-white/25 bg-transparent pb-2 text-white placeholder-slate-300 transition-colors focus:border-gold focus:outline-none focus:ring-0"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-4 text-lg font-bold text-navy transition-colors hover:bg-gold/90"
              >
                Sign In
              </button>
            </form>

            <p className="mt-8 text-sm text-slate-300">
              Demo password for all accounts:{' '}
              <span className="font-semibold text-white">password123</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-2 font-poppins text-lg font-bold text-navy">Demo Accounts</h2>
          <p className="mb-6 text-sm text-slate-500">
            Select an account to fill the form, then sign in.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemo(account.email)}
                aria-label={`Fill the sign in form with the ${account.role} demo account, ${account.email}`}
                className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-navy/30 hover:bg-navy/5"
              >
                <span className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <span className="font-semibold text-navy">{account.role}</span>
                  <span className="rounded bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                    {account.desc}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={16} aria-hidden="true" />
                  {account.email}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-navy">
          <p className="text-sm text-slate-300">Loading sign in&hellip;</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
