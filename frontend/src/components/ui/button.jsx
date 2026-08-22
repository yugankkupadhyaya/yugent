import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-pill,9999px)] text-sm font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4',
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-sm)] hover:bg-primary/90 hover:shadow-[var(--shadow-md)]',
        outline:
          'border border-border/80 bg-background/75 text-foreground hover:border-primary/25 hover:bg-accent/70',
        secondary: 'border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'border border-transparent text-muted-foreground hover:bg-accent/70 hover:text-foreground',
        destructive: 'border border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'h-auto rounded-none border-0 p-0 text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3.5 text-sm',
        lg: 'h-12 px-6 text-sm sm:text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const Button = React.forwardRef(function Button(
  { className, variant, size, asChild = false, children, ...props },
  ref
) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      className: cn(classes, children.props.className),
    });
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

export { buttonVariants };
