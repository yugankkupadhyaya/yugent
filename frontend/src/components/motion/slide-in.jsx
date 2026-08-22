import { motion, useReducedMotion } from 'motion/react';

import { slideIn, viewportOnce } from '@/lib/animations';

export function SlideIn({ children, className, direction = 'right', delay = 0, ...props }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={viewportOnce}
      variants={slideIn(direction)}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
