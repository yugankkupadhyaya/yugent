import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import { FadeUp } from '@/components/motion/fade-up';
import { PremiumButton } from '@/components/premium/premium-button';
import { Button } from '@/components/ui/button';
import { SectionShell } from '@/components/layout/section-shell';

export function FinalCtaSection() {
  return (
    <SectionShell id="get-started" tone="primary" className="overflow-hidden">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-primary-foreground/10" />
      <div className="pointer-events-none absolute -bottom-48 -right-32 h-[32rem] w-[32rem] rounded-full border border-primary-foreground/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/8 blur-3xl" />

      <FadeUp className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-medium">
          <Sparkles className="size-3.5" />
          Your next move starts here
        </div>

        <h2 className="mt-7 text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
          Build the career you've always wanted.
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-primary-foreground/78 sm:text-lg sm:leading-8">
          Stop wondering what to do next. Get the clarity, preparation, and direction to move forward with confidence.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PremiumButton asChild magnetic className="bg-primary-foreground text-primary hover:bg-primary-foreground/92">
            <Link to="/login">Login</Link>
          </PremiumButton>

          <Button
            size="lg"
            variant="ghost"
            asChild
            className="h-12 rounded-full border border-primary-foreground/20 px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <a href="#features">Explore Yugent</a>
          </Button>
        </div>
      </FadeUp>
    </SectionShell>
  );
}
