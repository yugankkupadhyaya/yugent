import { ArrowUpRight, Compass, Target, TrendingUp } from 'lucide-react';

import { SectionHeader } from '@/components/layout/section-header';
import { SectionShell } from '@/components/layout/section-shell';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

const principles = [
  {
    number: '01',
    icon: Compass,
    title: 'Understand where you are',
    description: 'Get a clear picture of your current skills, experience, and career readiness.',
  },
  {
    number: '02',
    icon: Target,
    title: 'See what is missing',
    description:
      'Identify the skills and experience that can move you closer to your next opportunity.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Know what comes next',
    description: 'Turn your goals into a practical path forward with guidance built around you.',
  },
];

export function VisionSection() {
  return (
    <SectionShell id="vision">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <p className="eyebrow">Our vision</p>
        </div>

        <div className="max-w-4xl">
          <SectionHeader
            title="Your career shouldn't be a guessing game."
            description="Yugent brings your goals, skills, experience, and opportunities into one clear picture so you can understand where you are, where you want to go, and what it takes to get there."
            titleClassName="mt-0"
            descriptionClassName="mt-8 max-w-2xl sm:text-xl"
          />

          <a href="#features" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
            Explore what Yugent can do
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <Stagger className="mt-24 grid border-y border-border/70 lg:grid-cols-3" staggerChildren={0.1}>
        {principles.map((principle, index) => {
          const Icon = principle.icon;

          return (
            <StaggerItem
              key={principle.number}
              className={[
                'group relative py-10 lg:px-8 lg:py-12',
                index !== 0 ? 'border-t border-border/70 lg:border-l lg:border-t-0' : '',
                index === 0 ? 'lg:pl-0' : '',
                index === principles.length - 1 ? 'lg:pr-0' : '',
              ].join(' ')}
            >
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-muted-foreground">{principle.number}</span>
                <div className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-card text-muted-foreground transition-colors duration-200 group-hover:border-primary/25 group-hover:bg-accent/70 group-hover:text-primary">
                  <Icon className="size-4" />
                </div>
              </div>
              <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">{principle.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{principle.description}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </SectionShell>
  );
}
