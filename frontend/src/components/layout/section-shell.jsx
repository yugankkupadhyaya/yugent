import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/container';

const tones = {
  default: 'bg-background/55',
  muted: 'bg-muted/40',
  accent: 'bg-accent/30',
  primary: 'bg-primary text-primary-foreground',
};

export function SectionShell({
  as: Component = 'section',
  id,
  tone = 'default',
  bordered = true,
  className,
  contentClassName,
  children,
}) {
  return (
    <Component
      id={id}
      className={cn(
        'relative overflow-hidden',
        bordered && 'border-t border-border/80',
        tones[tone],
        className
      )}
    >
      <Container className={cn('py-24 sm:py-32 lg:py-40', contentClassName)}>{children}</Container>
    </Component>
  );
}
