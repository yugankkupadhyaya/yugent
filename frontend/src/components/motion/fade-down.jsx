import { motion, useReducedMotion } from 'motion/react';

import { fadeDown, viewportOnce } from '@/lib/animations';

export function FadeDown({ children, className, delay = 0, ...props }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={viewportOnce}
      variants={fadeDown}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
