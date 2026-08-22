import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
  titleClassName,
  descriptionClassName,
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className={cn('section-title mt-5', titleClassName)}>{title}</h2> : null}
      {description ? <p className={cn('section-copy mt-7', descriptionClassName)}>{description}</p> : null}
    </div>
  );
}
