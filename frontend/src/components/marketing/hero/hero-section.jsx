import { BrainCircuit, Check, Compass, Sparkles, TrendingUp } from 'lucide-react';

import { HeroReveal } from '@/components/premium/hero-reveal';
import { PremiumButton } from '@/components/premium/premium-button';
import { ScaleIn } from '@/components/motion/scale-in';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SectionShell } from '@/components/layout/section-shell';
import { StatCard } from '@/components/premium/stat-card';

const metrics = [
  { label: 'Career readiness', value: 92, suffix: '%' },
  { label: 'Resume score', value: '88/100' },
  { label: 'Interview prep', value: '24/7' },
];

const roadmapSteps = [
  'AI interview practice',
  'Resume refinement',
  'Career roadmap',
  'Skill-gap guidance',
];

export function HeroSection() {
  return (
    <SectionShell id="hero" bordered={false} className="pt-4" contentClassName="pb-20 pt-16 sm:pb-24 lg:pb-28 lg:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-18">
        <div className="responsive-content max-w-2xl">
          <HeroReveal
            badge={
              <Badge variant="outline" className="w-fit rounded-full px-3.5 py-1.5 text-xs font-medium tracking-[0.16em]">
                <Sparkles className="size-3.5 text-primary" />
                AI-powered career platform
              </Badge>
            }
            title="Build the career you're capable of."
            description="Prepare for interviews, strengthen your resume, and discover the clearest path toward your next role with personalized guidance powered by AI."
            actions={
              <>
                <PremiumButton asChild magnetic>
                  <a href="#get-started">Get started</a>
                </PremiumButton>
                <PremiumButton asChild variant="ghost" magnetic={false} icon={false} className="border border-border/80 bg-background/70 text-muted-foreground hover:bg-accent/70 hover:text-foreground">
                  <a href="#how-it-works">See how it works</a>
                </PremiumButton>
              </>
            }
            meta={
              <>
                <div className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full bg-accent text-primary">
                    <Check className="size-3" />
                  </span>
                  Personalized guidance
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full bg-accent text-primary">
                    <Check className="size-3" />
                  </span>
                  AI-powered insights
                </div>
              </>
            }
          />
        </div>

        <ScaleIn className="responsive-content relative lg:pl-4">
          <Card className="relative overflow-hidden rounded-[calc(var(--radius-2xl)+0.5rem)] border-border/70 bg-card/92 p-2 shadow-[var(--shadow-lg)]">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="flex items-center justify-between rounded-t-[1.6rem] border-b border-border/80 bg-muted/35 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" />
                Yugent
              </div>
              <div className="w-12" />
            </div>

            <div className="rounded-b-[1.6rem] bg-neutral-950 p-5 text-neutral-50 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                      Career intelligence
                    </p>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                    Your next move, mapped clearly.
                  </h2>
                </div>

                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <BrainCircuit className="size-5 text-neutral-300" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                {metrics.map((metric) => (
                  <StatCard
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                    suffix={metric.suffix}
                    className="border-white/10 bg-white/[0.035] shadow-none"
                  />
                ))}
              </div>

              <div className="mt-4 rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="size-4 text-neutral-300" />
                    <span className="text-sm font-medium text-neutral-200">Your career roadmap</span>
                  </div>
                  <span className="text-xs text-neutral-400">68% complete</span>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[68%] rounded-full bg-primary shadow-[0_0_30px_rgba(96,165,250,0.35)]" />
                </div>

                <div className="mt-4 space-y-2">
                  {roadmapSteps.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-2.5"
                    >
                      <div
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                          index < 2 ? 'bg-primary/15 text-primary' : 'bg-white/5 text-neutral-500'
                        }`}
                      >
                        {index < 2 ? <Check className="size-3.5" /> : index + 1}
                      </div>
                      <span className="text-sm text-neutral-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="absolute -left-2 top-18 hidden rounded-[var(--radius-xl)] border border-border/80 bg-background/88 p-3 shadow-[var(--shadow-md)] backdrop-blur-md sm:block lg:-left-6">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
                <TrendingUp className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Career growth</p>
                <p className="text-sm font-semibold text-foreground">Trending upward</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 right-0 hidden rounded-[var(--radius-xl)] border border-border/80 bg-background/88 p-3 shadow-[var(--shadow-md)] backdrop-blur-md sm:block lg:-right-5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
                <Compass className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Next milestone</p>
                <p className="text-sm font-semibold text-foreground">System design</p>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </SectionShell>
  );
}
