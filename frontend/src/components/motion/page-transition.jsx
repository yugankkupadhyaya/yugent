import { motion } from 'motion/react';

import { pageTransition } from '@/lib/animations';

export function PageTransition({ children, className }) {
  return (
    <motion.div
      className={className}
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      {children}
    </motion.div>
  );
}
