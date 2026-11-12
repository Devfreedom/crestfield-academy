'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, AlertCircle, LogIn } from 'lucide-react';
import PasswordInput from './PasswordInput';
import { DEMO_USERS, ROLE_HOME, setCurrentUser, type Role } from '@/lib/auth';
import { findApprovedByEmail, findPendingByEmail, normalizeEmail } from '@/lib/accounts';

type LoginFormProps = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
};

/**
 * Sign-in form. Demo accounts sign in directly; accounts created through the
 * Register tab can only sign in after an Admin approved the request.
 */
export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
}: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const normalized = normalizeEmail(email);
    const demo = DEMO_USERS.find((candidate) => candidate.email === normalized);
    if (demo) {
      if (password !== 'password123') {
        setError('Invalid email or password. Use any demo account with password123.');
        return;
      }
      setCurrentUser(demo);
      router.push(ROLE_HOME[demo.role]);
      return;
    }

    // Pending requests are rejected with their own message, before the
    // generic "invalid credentials" error.
    const pending = findPendingByEmail(normalized);
    if (pending?.status === 'pending') {
      setError('Your account is pending Admin approval.');
      return;
    }
    if (pending?.status === 'rejected') {
      setError('Your account request was not approved. Contact the school office.');
      return;
    }

    const approved = findApprovedByEmail(normalized);
    if (approved) {
      if (approved.role === 'parent') {
        setError('Parent portal is not available yet. Contact the school office.');
        return;
      }
      if (approved.password !== password) {
        setError('Invalid email or password.');
        return;
      }
      const role: Role = approved.role === 'teacher' ? 'teacher' : 'student';
      setCurrentUser({
        id: approved.id,
        name: approved.fullName,
        email: approved.email,
        role,
        classId: approved.class,
      });
      router.push(ROLE_HOME[role]);
      return;
    }

    setError('Invalid email or password. Use any demo account with password123.');
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="login-tab" className="space-y-4 px-6 pb-6 pt-5">
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
          Email address
        </label>
        <div className="relative">
          <Mail
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="you@crestfield.edu.ng"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            enterKeyHint="next"
            className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15"
          />
        </div>
      </div>

      <PasswordInput
        label="Password"
        name="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
      />

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-base font-bold text-navy transition-colors hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <LogIn size={18} aria-hidden="true" />
        Sign In
      </button>

      <p className="text-center text-xs text-slate-500">
        Demo password for all accounts:{' '}
        <span className="font-semibold text-navy">password123</span>
      </p>
    </form>
  );
}
