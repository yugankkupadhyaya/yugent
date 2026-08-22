import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function KokonutAttractButton({ className, children, ...props }) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.985 }}>
      <Button
        className={cn(
          'relative overflow-hidden rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-md)]',
          className
        )}
        {...props}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_56%)] opacity-80" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Button>
    </motion.div>
  );
}
