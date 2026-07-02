'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useMotionValue } from 'framer-motion';

export function CountUp({
  to,
  suffix = '',
  prefix = '',
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const value = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration, ease: [0.22, 1, 0.36, 1] });
    const unsub = value.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, duration, suffix, prefix, value]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
