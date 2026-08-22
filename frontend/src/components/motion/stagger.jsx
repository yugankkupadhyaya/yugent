import { motion, useReducedMotion } from 'motion/react';

import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';

export function Stagger({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={viewportOnce}
      variants={staggerContainer({ staggerChildren, delayChildren })}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, variants = fadeUp, ...props }) {
  return (
    <motion.div className={className} variants={variants} {...props}>
      {children}
    </motion.div>
  );
}
