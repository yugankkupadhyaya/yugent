import { ArrowUpRight } from 'lucide-react';

import { HoverLift } from '@/components/motion/hover-lift';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function AnimatedCard({ className, children, showArrow = false, ...props }) {
  return (
    <HoverLift className="h-full">
      <Card
        className={cn(
          'group h-full rounded-[var(--radius-2xl)] border-border/70 bg-card/92 shadow-[var(--shadow-sm)] transition-colors duration-200 hover:border-primary/20 hover:bg-card',
          className
        )}
        {...props}
      >
        {showArrow ? (
          <div className="pointer-events-none absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-border/80 bg-background/70 text-muted-foreground transition-all duration-200 group-hover:border-primary/20 group-hover:bg-accent/70 group-hover:text-primary">
            <ArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        ) : null}
        {children}
      </Card>
    </HoverLift>
  );
}
