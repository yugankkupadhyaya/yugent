import { motion, useReducedMotion } from 'motion/react';

import { fadeUp, viewportOnce } from '@/lib/animations';

export function FadeUp({ children, className, delay = 0, ...props }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
