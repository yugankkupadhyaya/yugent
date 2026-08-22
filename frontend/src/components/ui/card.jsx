import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const Card = forwardRef(function Card({ className, ...props }, ref) {
  return <div ref={ref} className={cn('rounded-xl border bg-card text-card-foreground', className)} {...props} />;
});

export { Card };
