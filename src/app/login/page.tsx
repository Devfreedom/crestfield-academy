'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { DEMO_USERS, setCurrentUser } from '@/lib/auth';

const DEMO_ACCOUNTS = [
  { role: 'Super Admin', email: 'superadmin@crestfield.edu.ng', desc: 'Full system access' },
  { role: 'Admin', email: 'admin@crestfield.edu.ng', desc: 'Student & fees management' },
  { role: 'Teacher', email: 'teacher@crestfield.edu.ng', desc: 'Classes, attendance, grades' },
  { role: 'Student', email: 'student@crestfield.edu.ng', desc: 'Personal dashboard & fees' },
];

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const user = DEMO_USERS.find((u) => u.email === email);
    if (!user || password !== 'password123') {
      setFormError('Invalid email or password. Use any demo account with password123.');
      return;
    }

    setLoading(true);
    setCurrentUser(user);
    setTimeout(() => {
      const rolePath: Record<string, string> = {
        super_admin: '/dashboard/super-admin',
        admin: '/dashboard/admin',
        teacher: '/dashboard/teacher',
        student: '/dashboard/student',
      };
      router.push(rolePath[user.role]);
    }, 600);
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div className="flex-1 bg-navy">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center text-navy font-bold">
                CA
              </div>
              <span className="font-bold text-2xl text-white">Crestfield Academy</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Welcome Back</h1>
            <p className="text-slate-300 mb-8">
              Sign in to access your Crestfield Academy portal.
            </p>

            {error === 'access-denied' && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-3">
                <AlertCircle size={18} />
                Access denied. Please log in with appropriate credentials.
              </div>
            )}

            {formError && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-3">
                <AlertCircle size={18} />
                {formError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <User size={20} />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-b border-white/20 pb-2 text-white placeholder-slate-400 focus:ring-0 focus:border-gold outline-none transition-colors"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent border-b border-white/20 pb-2 text-white placeholder-slate-400 focus:ring-0 focus:border-gold outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold text-navy px-6 py-4 rounded-lg font-bold text-lg hover:bg-gold/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-8 text-sm text-slate-400">
              Demo password for all accounts: <span className="text-white font-medium">password123</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-lg font-bold text-navy mb-6">Demo Accounts</h3>
          <p className="text-sm text-slate-500 mb-6">Use any of these accounts to explore the portals:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {DEMO_ACCOUNTS.map((acc) => (
              <div
                key={acc.email}
                onClick={() => fillDemo(acc.email)}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-navy/5 hover:border-navy/20 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-navy">{acc.role}</span>
                  <span className="text-xs font-medium bg-gold/10 text-gold px-2 py-0.5 rounded">
                    {acc.desc}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={16} />
                  <span>{acc.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}