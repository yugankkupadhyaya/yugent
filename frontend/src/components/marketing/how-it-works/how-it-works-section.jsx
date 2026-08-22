import { ArrowRight, Check, Compass, FileSearch, Route } from 'lucide-react';

import { SectionHeader } from '@/components/layout/section-header';
import { SectionShell } from '@/components/layout/section-shell';
import { FadeUp } from '@/components/motion/fade-up';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

const steps = [
  {
    number: '01',
    title: 'Tell us where you want to go',
    description:
      'Share your experience, skills, interests, and the kind of career you want to build.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Understand your position',
    description:
      'Yugent analyzes your profile and identifies the strengths and gaps that matter for your goals.',
    icon: FileSearch,
  },
  {
    number: '03',
    title: 'Follow your path forward',
    description:
      'Get a practical roadmap with the skills, preparation, and milestones you should focus on next.',
    icon: Route,
  },
];

export function HowItWorksSection() {
  return (
    <SectionShell id="how-it-works">
      <SectionHeader
        eyebrow="How it works"
        title="From where you are to where you want to be."
        description="Yugent turns a vague career goal into a clearer sequence of decisions, skills, and actions."
      />

      <Stagger className="relative mt-20 space-y-12" staggerChildren={0.12}>
        <div className="absolute left-[21px] top-8 hidden h-[calc(100%-112px)] w-px bg-gradient-to-b from-primary/30 via-border to-border md:block" />

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <StaggerItem key={step.number}>
              <article className="group relative grid gap-8 md:grid-cols-[72px_1fr_280px] md:gap-10 lg:grid-cols-[88px_1fr_360px] lg:gap-16">
                <div className="relative z-10 flex size-11 items-center justify-center rounded-full border border-border/80 bg-background/92 text-xs font-semibold text-muted-foreground transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-accent group-hover:text-primary">
                  {step.number}
                </div>

                <div className="max-w-2xl pb-12 md:border-b md:border-border/70">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{step.description}</p>
                </div>

                <div className="hidden md:block">
                  <div className="relative h-36 overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-secondary/85 p-4 shadow-[var(--shadow-sm)]">
                    {index === 0 ? (
                      <div className="space-y-3">
                        <div className="h-2 w-24 rounded-full bg-border" />
                        <div className="h-9 rounded-xl border border-border/80 bg-card" />
                        <div className="flex gap-2">
                          <div className="h-7 w-20 rounded-lg bg-primary/10" />
                          <div className="h-7 w-24 rounded-lg bg-primary/10" />
                        </div>
                      </div>
                    ) : null}

                    {index === 1 ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">Career readiness</span>
                          <span className="text-xs font-semibold text-primary">92%</span>
                        </div>
                        <div className="h-2 rounded-full bg-border">
                          <div className="h-full w-[92%] rounded-full bg-primary" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-8 rounded-lg bg-card" />
                          <div className="h-8 rounded-lg bg-card" />
                          <div className="h-8 rounded-lg bg-card" />
                        </div>
                      </div>
                    ) : null}

                    {index === 2 ? (
                      <div className="space-y-3">
                        {['Build skills', 'Practice interviews', 'Apply'].map((item, itemIndex) => (
                          <div key={item} className="flex items-center gap-2">
                            <div
                              className={`flex size-5 items-center justify-center rounded-full ${
                                itemIndex === 0 ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground'
                              }`}
                            >
                              {itemIndex === 0 ? <Check className="size-3" /> : <span className="text-[9px]">{itemIndex + 1}</span>}
                            </div>
                            <span className="text-xs text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      <FadeUp className="mt-20">
        <div className="flex flex-col justify-between gap-6 rounded-[calc(var(--radius-xl)+0.25rem)] border border-border/80 bg-secondary/75 p-6 shadow-[var(--shadow-sm)] sm:p-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-foreground">A clearer next step changes everything.</p>
            <p className="mt-1 text-sm text-muted-foreground">Start building your roadmap with Yugent.</p>
          </div>

          <a href="#get-started" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
            Get started
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </FadeUp>
    </SectionShell>
  );
}
