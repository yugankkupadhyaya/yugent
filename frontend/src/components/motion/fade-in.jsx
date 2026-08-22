import { motion, useReducedMotion } from 'motion/react';

import { fadeIn, viewportOnce } from '@/lib/animations';

export function FadeIn({ children, className, delay = 0, ...props }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={viewportOnce}
      variants={fadeIn}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
