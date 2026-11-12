'use client';

import { useState } from 'react';
import { Mail, User, GraduationCap, AlertCircle, CheckCircle2, Send } from 'lucide-react';
import PasswordInput from './PasswordInput';
import { submitAccountRequest, type RequestRole } from '@/lib/accounts';

type RegisterFormProps = {
  /** Called when the user taps "Back to Login" on the success state. */
  onBackToLogin: () => void;
};

const ROLE_OPTIONS: { value: RequestRole; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' },
];

const CLASS_OPTIONS = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'];

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15';
const selectClass =
  'w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-3 text-sm text-slate-900 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15';

/**
 * Account-request form. Submitting never signs the person in — it files a
 * pending request that an Admin or Super Admin approves on the dashboard.
 */
export default function RegisterForm({ onBackToLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<RequestRole | ''>('');
  const [studentClass, setStudentClass] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = submitAccountRequest({
      fullName,
      email,
      role: role as RequestRole,
      class: role === 'student' ? studentClass : undefined,
      password,
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div role="status" className="space-y-5 px-6 pb-6 pt-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 size={26} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-poppins text-lg font-bold text-navy">Request sent</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Your request has been sent to Admin for approval. You will be able to sign in after
            approval.
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-labelledby="register-tab" className="space-y-4 px-6 pb-6 pt-5">
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
        <label htmlFor="full-name" className="mb-1.5 block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <div className="relative">
          <User
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            id="full-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            enterKeyHint="next"
            placeholder="Chiamaka Ibrahim"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="register-email" className="mb-1.5 block text-sm font-medium text-slate-700">
          Email
        </label>
        <div className="relative">
          <Mail
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            id="register-email"
            name="email"
            type="email"
            required
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="register-role" className="mb-1.5 block text-sm font-medium text-slate-700">
          Role
        </label>
        <div className="relative">
          <GraduationCap
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            id="register-role"
            name="role"
            required
            value={role}
            onChange={(event) => {
              setRole(event.target.value as RequestRole | '');
              if (event.target.value !== 'student') setStudentClass('');
            }}
            className={`${selectClass} ${role === '' ? 'text-slate-400' : ''}`}
          >
            <option value="" disabled>
              Select a role
            </option>
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {role === 'student' && (
        <div>
          <label htmlFor="register-class" className="mb-1.5 block text-sm font-medium text-slate-700">
            Class
          </label>
          <div className="relative">
            <GraduationCap
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              id="register-class"
              name="class"
              required
              value={studentClass}
              onChange={(event) => setStudentClass(event.target.value)}
              className={`${selectClass} ${studentClass === '' ? 'text-slate-400' : ''}`}
            >
              <option value="" disabled>
                Select a class
              </option>
              {CLASS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <PasswordInput
        label="Password"
        name="new-password"
        autoComplete="new-password"
        value={password}
        onChange={setPassword}
        minLength={8}
      />

      <PasswordInput
        label="Confirm Password"
        name="confirm-password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        minLength={8}
      />

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-base font-bold text-navy transition-colors hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <Send size={17} aria-hidden="true" />
        Request Account
      </button>

      <p className="text-center text-xs text-slate-500">
        Requests are reviewed by the school admin before sign-in is enabled.
      </p>
    </form>
  );
}
