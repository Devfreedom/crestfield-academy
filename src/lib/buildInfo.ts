/**
 * Server-only helpers for values that must be read at build time.
 *
 * `'use cache'` keeps the value stable across renders so the static prerender
 * never evaluates `new Date()` in the render pass (which Next.js rejects).
 */
export async function getBuildYear(): Promise<number> {
  'use cache';
  return new Date().getFullYear();
}
