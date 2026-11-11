import type { User, Role } from '@/types';

const STORAGE_KEY = 'crestfield_user';

/** Dispatched whenever the signed-in user changes in this tab. */
export const AUTH_CHANGE_EVENT = 'crestfield-auth-change';

/**
 * The signed-in user is an external store (localStorage). The value is cached
 * so `getCurrentUser()` returns a stable reference — `useSyncExternalStore`
 * compares snapshots by identity and would loop on a fresh object each call.
 */
let cache: { user: User | null } | null = null;

function readUser(): User | null {
  if (typeof window === 'undefined') return null;
  if (cache) return cache.user;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cache = { user: raw ? (JSON.parse(raw) as User) : null };
  } catch {
    cache = { user: null };
  }
  return cache.user;
}

export function getCurrentUser(): User | null {
  return readUser();
}

export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  cache = { user };
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

/**
 * A hard navigation is intentional here: it drops every cached client state
 * and guarantees no portal UI is left mounted after signing out.
 */
export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  cache = { user: null };
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  // A hard navigation is deliberate: it drops every cached client state so no
  // portal UI stays mounted after signing out.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = '/login';
}

/**
 * Subscribes to sign-in / sign-out changes, including from other tabs.
 * The callback re-reads the store, so the snapshot stays in sync.
 */
export function subscribeToAuth(callback: () => void): () => void {
  const handleStorage = () => {
    cache = null;
    callback();
  };
  const handleAuthChange = () => callback();

  window.addEventListener('storage', handleStorage);
  window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
  };
}

/**
 * The dashboard each role is allowed to see. Shared by the login redirect and
 * the public navbar so a role never links to another role's portal.
 */
export const ROLE_HOME: Record<Role, string> = {
  super_admin: '/dashboard/super-admin',
  admin: '/dashboard/admin',
  teacher: '/dashboard/teacher',
  student: '/dashboard/student',
};

export function requireRole(allowedRoles: Role[]): void {
  const user = getCurrentUser();
  if (!user || !allowedRoles.includes(user.role)) {
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- guard redirect, not a link
    window.location.href = '/login?error=access-denied';
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export type { Role };
export const DEMO_USERS: User[] = [
  { id: '1', name: 'Super Admin', email: 'superadmin@crestfield.edu.ng', role: 'super_admin' },
  { id: '2', name: 'Admin Officer', email: 'admin@crestfield.edu.ng', role: 'admin' },
  { id: '3', name: 'Mr. James Okafor', email: 'teacher@crestfield.edu.ng', role: 'teacher' },
  { id: '4', name: 'Chiamaka Ibrahim', email: 'student@crestfield.edu.ng', role: 'student', classId: 'ss2-a' },
];
