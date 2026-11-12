import type { Role } from '@/types';
import { DEMO_USERS } from '@/lib/auth';

/**
 * Mock account store for the register → admin-approval flow.
 *
 * Two localStorage keys back it:
 *  - `crestfield_pending_requests` — every registration request, including
 *    rejected ones (status is filtered, not deleted, so the admin never sees
 *    a request vanish while they are looking at it).
 *  - `crestfield_users` — approved accounts, which the login form treats as
 *    real credentials alongside the built-in demo accounts.
 *
 * This is a demo application, so passwords are stored in plain text; a real
 * backend would never do this.
 */

export const PENDING_REQUESTS_KEY = 'crestfield_pending_requests';
export const ACCOUNTS_KEY = 'crestfield_users';

/** Dispatched whenever either store changes in this tab. */
export const ACCOUNTS_CHANGE_EVENT = 'crestfield-accounts-change';

/** Roles a new account can request. `parent` has no portal yet. */
export type RequestRole = 'student' | 'teacher' | 'parent';

export type PendingRequest = {
  id: string;
  fullName: string;
  email: string;
  role: RequestRole;
  /** Class level (JSS1–JSS3, SS1–SS3). Students only. */
  class?: string;
  password: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

export type RegisteredAccount = {
  id: string;
  fullName: string;
  email: string;
  role: RequestRole;
  class?: string;
  password: string;
  approvedAt: string;
};

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function readStore<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeStore<T>(key: string, value: T[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(ACCOUNTS_CHANGE_EVENT));
}

function readPending(): PendingRequest[] {
  return readStore<PendingRequest>(PENDING_REQUESTS_KEY);
}

function readAccounts(): RegisteredAccount[] {
  return readStore<RegisteredAccount>(ACCOUNTS_KEY);
}

function subscribe(callback: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === PENDING_REQUESTS_KEY || event.key === ACCOUNTS_KEY || event.key === null) {
      callback();
    }
  };
  window.addEventListener('storage', handleStorage);
  window.addEventListener(ACCOUNTS_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(ACCOUNTS_CHANGE_EVENT, callback);
  };
}

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `req-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

/** All requests still awaiting a decision, newest first. */
export function getPendingRequests(): PendingRequest[] {
  return readPending()
    .filter((request) => request.status === 'pending')
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function findPendingByEmail(email: string): PendingRequest | undefined {
  const normalized = normalizeEmail(email);
  return readPending().find((request) => request.email === normalized);
}

export function findApprovedByEmail(email: string): RegisteredAccount | undefined {
  const normalized = normalizeEmail(email);
  return readAccounts().find((account) => account.email === normalized);
}

/** True when the email already belongs to any account the school knows about. */
export function emailAlreadyRegistered(email: string): boolean {
  const normalized = normalizeEmail(email);
  const isDemo = DEMO_USERS.some((user) => user.email === normalized);
  return isDemo || findPendingByEmail(email) !== undefined || findApprovedByEmail(email) !== undefined;
}

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Saves a registration request. It never signs the person in; an Admin or
 * Super Admin has to approve the request first.
 */
export function submitAccountRequest(input: {
  fullName: string;
  email: string;
  role: RequestRole;
  class?: string;
  password: string;
}): SubmitResult {
  if (typeof window === 'undefined') return { ok: false, error: 'Registration is unavailable.' };
  if (emailAlreadyRegistered(input.email)) {
    return { ok: false, error: 'An account with this email already exists or is awaiting approval.' };
  }

  const request: PendingRequest = {
    id: newId(),
    fullName: input.fullName.trim(),
    email: normalizeEmail(input.email),
    role: input.role,
    class: input.role === 'student' ? input.class : undefined,
    password: input.password,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  writeStore(PENDING_REQUESTS_KEY, [...readPending(), request]);
  return { ok: true };
}

/** Approves a pending request. Students and teachers can then sign in. */
export function approveRequest(id: string): void {
  const requests = readPending();
  const request = requests.find((item) => item.id === id && item.status === 'pending');
  if (!request) return;

  writeStore(PENDING_REQUESTS_KEY, requests.map((item) =>
    item.id === id ? { ...item, status: 'approved' as const } : item,
  ));

  const accounts = readAccounts();
  if (!accounts.some((account) => account.email === request.email)) {
    const account: RegisteredAccount = {
      id: request.id,
      fullName: request.fullName,
      email: request.email,
      role: request.role,
      class: request.class,
      password: request.password,
      approvedAt: new Date().toISOString(),
    };
    writeStore(ACCOUNTS_KEY, [...accounts, account]);
  }
}

/** Rejects a pending request. It stays on file but disappears from the list. */
export function rejectRequest(id: string): void {
  const requests = readPending();
  if (!requests.some((item) => item.id === id && item.status === 'pending')) return;
  writeStore(PENDING_REQUESTS_KEY, requests.map((item) =>
    item.id === id ? { ...item, status: 'rejected' as const } : item,
  ));
}

/** Maps an approved request role onto the dashboards that exist today. */
export function roleHomeFor(role: RequestRole): string | null {
  const map: Record<Exclude<Role, 'super_admin' | 'admin'>, string> = {
    teacher: '/dashboard/teacher',
    student: '/dashboard/student',
  };
  return role === 'parent' ? null : map[role];
}
