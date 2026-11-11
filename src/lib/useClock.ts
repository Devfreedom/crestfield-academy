'use client';

import { useSyncExternalStore } from 'react';

/**
 * Reading the clock through `useSyncExternalStore` keeps "now" out of the
 * render pass, so the static prerender never evaluates `new Date()` while the
 * browser still receives the live value.
 */
const subscribe = () => () => {};
const getServerYear = () => 2025;
const getServerToday = () => '';

export function useCurrentYear(): number {
  return useSyncExternalStore(subscribe, () => new Date().getFullYear(), getServerYear);
}

export function useToday(): string {
  return useSyncExternalStore(subscribe, () => new Date().toISOString().slice(0, 10), getServerToday);
}
