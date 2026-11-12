'use client';

import { useSyncExternalStore } from 'react';
import {
  ACCOUNTS_KEY,
  PENDING_REQUESTS_KEY,
  getPendingRequests,
  subscribe,
  type PendingRequest,
} from '@/lib/accounts';

/**
 * Reads the pending-account store without touching localStorage during server
 * rendering, so pages stay statically prerenderable and React never sees a
 * hydration mismatch. Snapshots are cached by the raw JSON string so the
 * identity stays stable between renders.
 */
export function usePendingRequests(): { requests: PendingRequest[] } {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => {
      const raw =
        window.localStorage.getItem(PENDING_REQUESTS_KEY) ??
        window.localStorage.getItem(ACCOUNTS_KEY) ??
        '[]';
      if (cache.raw !== raw) {
        cache = { raw, requests: getPendingRequests() };
      }
      return cache;
    },
    () => EMPTY,
  );

  return snapshot;
}

const EMPTY: Snapshot = { raw: '[]', requests: [] };

type Snapshot = {
  raw: string;
  requests: PendingRequest[];
};

let cache: Snapshot = { raw: '', requests: [] };
