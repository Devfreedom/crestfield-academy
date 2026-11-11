'use client';

import { useSyncExternalStore } from 'react';
import type { User } from '@/types';
import { getCurrentUser, subscribeToAuth } from '@/lib/auth';

type CurrentUser = {
  user: User | null;
  /** False during server rendering and hydration, before the store is read. */
  ready: boolean;
};

const SERVER_SNAPSHOT: CurrentUser = { user: null, ready: false };

let clientSnapshot: CurrentUser = SERVER_SNAPSHOT;

/**
 * Reads the signed-in user without touching localStorage during server
 * rendering, so pages stay statically prerenderable and React never sees a
 * hydration mismatch.
 */
export function useCurrentUser(): CurrentUser {
  return useSyncExternalStore(
    subscribeToAuth,
    () => {
      const user = getCurrentUser();
      if (!clientSnapshot.ready || clientSnapshot.user !== user) {
        clientSnapshot = { user, ready: true };
      }
      return clientSnapshot;
    },
    () => SERVER_SNAPSHOT,
  );
}
