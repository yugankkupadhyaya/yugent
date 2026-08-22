import { ArrowUpRight } from 'lucide-react';

import { AnimatedCard } from '@/components/premium/animated-card';

export function FeatureCard({ className, title, description, children }) {
  return (
    <AnimatedCard className={className}>
      <div className="relative min-h-[250px] overflow-hidden bg-secondary/85 p-6">
        <div className="relative flex h-full min-h-[205px] items-center justify-center">{children}</div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{description}</p>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-all duration-200 group-hover:border-primary/25 group-hover:bg-accent/70 group-hover:text-primary">
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}
