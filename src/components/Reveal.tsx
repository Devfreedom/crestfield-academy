'use client';

import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  /** Extra transition delay in ms, for staggering sibling cards. */
  delay?: number;
  className?: string;
};

/**
 * Scroll reveal: children fade up once when they enter the viewport.
 *
 * The hidden state lives in CSS under `scripting: enabled` and
 * `prefers-reduced-motion: no-preference`, so no-JS visitors and reduced-motion
 * users always see the content statically. The observer is one-shot and
 * disconnects after the first reveal.
 *
 * The revealed state is toggled on the DOM node rather than in React state:
 * it avoids a hydration mismatch (the class is only known in the browser) and
 * keeps the component free of re-renders.
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Static immediately when motion is reduced or the API is unavailable —
    // never leave content hidden.
    if (
      typeof IntersectionObserver === 'undefined' ||
      !window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    ) {
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
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
