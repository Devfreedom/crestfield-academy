'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types';
import { getCurrentUser } from '@/lib/auth';

type CurrentUser = {
  user: User | null;
  /** False during SSR and the first client render, before localStorage is read. */
  ready: boolean;
};

/**
 * Reads the logged-in user from localStorage without touching it during
 * server rendering, so pages can be prerendered and React never sees a
 * hydration mismatch.
 */
export function useCurrentUser(): CurrentUser {
  const [state, setState] = useState<CurrentUser>({ user: null, ready: false });

  useEffect(() => {
    setState({ user: getCurrentUser(), ready: true });

    const onStorage = () => setState({ user: getCurrentUser(), ready: true });
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return state;
}
