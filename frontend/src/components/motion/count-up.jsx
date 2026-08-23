import { useEffect, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

export function CountUp({ to, duration = 1000, suffix = '', className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? to : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      if (prefersReducedMotion) {
        // The reduced-motion path synchronizes the displayed value immediately.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(to);
      }

      return undefined;
    }

    let frame;
    let start;

    function step(timestamp) {
      if (!start) {
        start = timestamp;
      }

      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.round(progress * to));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    }

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [duration, isInView, prefersReducedMotion, to]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
