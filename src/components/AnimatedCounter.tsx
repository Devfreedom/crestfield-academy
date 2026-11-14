'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedCounterProps = {
  target: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

/**
 * Counts up from 0 to `target` once when entering the viewport, using
 * ease-out cubic easing. Renders `target` immediately under reduced motion.
 */
export default function AnimatedCounter({
  target,
  suffix = '',
  durationMs = 1200,
  className = '',
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }

    let rafId = 0;

    const startCounting = () => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            startCounting();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, durationMs]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
      {suffix}
    </span>
  );
}
