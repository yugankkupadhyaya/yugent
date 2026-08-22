import { motion, useReducedMotion } from 'motion/react';

import { hoverLift, tapScale } from '@/lib/animations';

export function HoverLift({ children, className, as: Component = motion.div, disabled = false, ...props }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Component
      className={className}
      initial="rest"
      animate="rest"
      whileHover={!disabled && !prefersReducedMotion ? 'hover' : undefined}
      whileTap={!disabled && !prefersReducedMotion ? tapScale : undefined}
      variants={hoverLift}
      {...props}
    >
      {children}
    </Component>
  );
}
