import type { User, Role } from '@/types';

const STORAGE_KEY = 'crestfield_user';

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = '/login';
}

export function requireRole(allowedRoles: Role[]): void {
  const user = getCurrentUser();
  if (!user || !allowedRoles.includes(user.role)) {
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