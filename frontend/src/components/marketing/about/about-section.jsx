import { ArrowUpRight, Compass, Lightbulb, Users } from 'lucide-react';

import { SectionHeader } from '@/components/layout/section-header';
import { SectionShell } from '@/components/layout/section-shell';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

const values = [
  {
    number: '01',
    icon: Compass,
    title: 'Clarity over noise',
    description:
      'There is already enough information competing for your attention. Yugent focuses on what actually matters for your next move.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Progress over perfection',
    description:
      'Your career is built one skill, one conversation, and one decision at a time. We help you keep moving.',
  },
  {
    number: '03',
    icon: Users,
    title: 'You stay in control',
    description:
      'AI can provide guidance and perspective, but the decisions, goals, and direction remain yours.',
  },
];

export function AboutSection() {
  return (
    <SectionShell id="about">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="eyebrow">Why Yugent</p>
        </div>

        <div>
          <SectionHeader
            title="We believe your career should be built with intention."
            description="Not by chasing every trend. Not by collecting skills without a direction. And not by trying to figure everything out alone."
            titleClassName="mt-0 max-w-4xl"
            descriptionClassName="mt-8 max-w-2xl sm:text-xl"
          />

          <a href="#features" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
            Explore Yugent
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <Stagger className="mt-24 grid border-y border-border/70 lg:grid-cols-3" staggerChildren={0.1}>
        {values.map((value, index) => {
          const Icon = value.icon;

          return (
            <StaggerItem
              key={value.number}
              className={[
                'group py-10 lg:px-8 lg:py-12',
                index !== 0 ? 'border-t border-border/70 lg:border-l lg:border-t-0' : '',
                index === 0 ? 'lg:pl-0' : '',
                index === values.length - 1 ? 'lg:pr-0' : '',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{value.number}</span>
                <div className="flex size-10 items-center justify-center rounded-xl border border-border/80 bg-card text-muted-foreground transition-all duration-200 group-hover:border-primary/25 group-hover:bg-accent/70 group-hover:text-primary">
                  <Icon className="size-4" />
                </div>
              </div>
              <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">{value.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{value.description}</p>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div className="mt-24 max-w-4xl">
        <p className="text-2xl font-medium leading-relaxed tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          Yugent is here to give you the clarity to make better decisions, the tools to prepare for them, and the confidence to take the next step.
        </p>
      </div>
    </SectionShell>
  );
}
