'use client';

import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  /** Extra transition delay in ms, for staggering sibling cards. */
  delayMs?: number;
  className?: string;
};

/**
 * Scroll reveal: children fade up once when they enter the viewport.
 *
 * The hidden state lives in CSS under `scripting: enabled` and
 * `prefers-reduced-motion: no-preference`, so no-JS visitors and reduced-motion
 * users always see the content statically. The observer is one-shot and
 * disconnects after the first reveal.
 */
export default function Reveal({ children, delayMs = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
