import { cloneElement, isValidElement } from 'react';
import { ArrowRight } from 'lucide-react';

import { Magnetic } from '@/components/motion/magnetic';
import { KokonutAttractButton } from '@/components/vendors/kokonut/attract-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PremiumButton({
  children,
  className,
  magnetic = false,
  icon = true,
  asChild = false,
  ...props
}) {
  const trailingIcon = icon ? <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" /> : null;

  const content = (
    <>
      {children}
      {trailingIcon}
    </>
  );

  const slottedChild =
    asChild && isValidElement(children)
      ? cloneElement(children, children.props, (
          <>
            {children.props.children}
            {trailingIcon}
          </>
        ))
      : content;

  const button = magnetic ? (
    <KokonutAttractButton className={cn('group h-12 px-6', className)} asChild={asChild} {...props}>
      {slottedChild}
    </KokonutAttractButton>
  ) : (
    <Button className={cn('group h-12 px-6', className)} size="lg" asChild={asChild} {...props}>
      {slottedChild}
    </Button>
  );

  return magnetic ? <Magnetic className="inline-flex">{button}</Magnetic> : button;
}
