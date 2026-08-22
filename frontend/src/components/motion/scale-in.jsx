import { motion, useReducedMotion } from 'motion/react';

import { scaleIn, viewportOnce } from '@/lib/animations';

export function ScaleIn({ children, className, delay = 0, ...props }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={viewportOnce}
      variants={scaleIn}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
