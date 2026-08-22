import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

import { springs } from '@/lib/motion-tokens';

export function Magnetic({ children, className, strength = 18, ...props }) {
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springs.soft);
  const y = useSpring(rawY, springs.soft);

  function handleMove(event) {
    if (prefersReducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    rawX.set((offsetX / rect.width) * strength * 2);
    rawY.set((offsetY / rect.height) * strength * 2);
  }

  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x, y }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
