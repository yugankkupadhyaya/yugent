import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'border-primary/15 bg-primary/10 text-primary',
        outline: 'border-border/80 bg-background/65 text-muted-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
