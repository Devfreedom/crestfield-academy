'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, LayoutDashboard } from 'lucide-react';
import AuthCard from './AuthCard';
import { ROLE_HOME } from '@/lib/auth';
import { useCurrentUser } from '@/lib/useAuth';

/**
 * Standalone auth page: no public Navbar or Footer (SiteChrome skips /login),
 * logo block above the card, Login and Register tabs inside one card.
 */
function LoginContent() {
  const searchParams = useSearchParams();
  const accessError = searchParams.get('error') === 'access-denied';
  const showDemo = searchParams.get('demo') === '1';
  const { user } = useCurrentUser();

  return (
    <div className="flex min-h-dvh flex-col items-center bg-slate-50 px-4 py-10 sm:py-14">
      <div className="mb-8 flex flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-2xl font-bold text-gold shadow-md"
        >
          CA
        </span>
        <p className="mt-3 font-poppins text-xl font-bold tracking-tight text-navy">
          Crestfield Academy
        </p>
        <h1 className="mt-6 font-poppins text-3xl font-bold text-navy">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to access your portal.</p>
      </div>

      {accessError && (
        <div
          role="alert"
          className="mb-6 flex w-full max-w-md items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
        >
          <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            Access denied. That portal is only available to its own role. Sign in below to continue.
          </span>
        </div>
      )}

      {user && (
        <div className="mb-6 flex w-full max-w-md flex-col items-center gap-2 rounded-lg border border-gold/40 bg-gold/15 p-3.5 text-center text-sm text-navy sm:flex-row sm:justify-between sm:text-left">
          <p>
            You are signed in as <span className="font-semibold">{user.name}</span>.
          </p>
          <a
            href={ROLE_HOME[user.role]}
            className="flex items-center gap-2 font-semibold text-navy underline underline-offset-4"
          >
            <LayoutDashboard size={16} aria-hidden="true" />
            Go to your dashboard
          </a>
        </div>
      )}

      <AuthCard showDemo={showDemo} />
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">Loading sign in&hellip;</p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
