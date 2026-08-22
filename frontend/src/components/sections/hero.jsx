import { ArrowRight, BrainCircuit, Check, Compass, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const metrics = [
  { label: 'Career readiness', value: '92%' },
  { label: 'Resume score', value: '88/100' },
  { label: 'Interview prep', value: '24/7' },
];

const roadmapSteps = [
  'AI interview practice',
  'Resume refinement',
  'Career roadmap',
  'Skill-gap guidance',
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background/55 px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Hero content */}
          <div className="responsive-content max-w-2xl">
            <Badge
              variant="outline"
              className="mb-7 rounded-full border-border bg-background px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
              AI-POWERED CAREER PLATFORM
            </Badge>

            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
              Build the career you&apos;re capable of.
            </h1>

            <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Prepare for interviews, strengthen your resume, and discover the clearest path toward
              your next role — with personalized guidance powered by AI.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="responsive-button group h-12 rounded-full px-6 shadow-sm"
                asChild
              >
                <a href="#get-started">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="responsive-button h-12 rounded-full px-6 text-muted-foreground hover:bg-muted hover:text-foreground"
                asChild
              >
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-primary">
                  <Check className="h-3 w-3" />
                </span>
                Personalized guidance
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-primary">
                  <Check className="h-3 w-3" />
                </span>
                AI-powered insights
              </div>
            </div>
          </div>

          {/* Product preview */}
          <div className="responsive-content relative lg:pl-4">
            <Card className="responsive-card relative overflow-hidden rounded-3xl border-border bg-card p-2 shadow-xl shadow-black/5">
              {/* Browser chrome */}
              <div className="flex items-center justify-between rounded-t-[1.35rem] border-b border-border bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Yugent
                </div>

                <div className="w-12" />
              </div>

              {/* Product dashboard */}
              <div className="rounded-b-[1.35rem] bg-neutral-950 p-5 text-neutral-50 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                        Career intelligence
                      </p>
                    </div>

                    <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                      Your next move, mapped clearly.
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <BrainCircuit className="h-5 w-5 text-neutral-300" />
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-white/10 bg-white/[0.035] p-3"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 sm:text-xs">
                        {metric.label}
                      </p>

                      <p className="mt-2 text-base font-semibold text-white sm:text-lg">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Roadmap */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="h-4 w-4 text-neutral-300" />

                      <span className="text-sm font-medium text-neutral-200">
                        Your career roadmap
                      </span>
                    </div>

                    <span className="text-xs text-neutral-400">68% complete</span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[68%] rounded-full bg-primary" />
                  </div>

                  <div className="mt-4 space-y-2">
                    {roadmapSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-2.5"
                      >
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                            index < 2 ? 'bg-primary/15 text-primary' : 'bg-white/5 text-neutral-500'
                          }`}
                        >
                          {index < 2 ? <Check className="h-3.5 w-3.5" /> : index + 1}
                        </div>

                        <span className="text-sm text-neutral-300">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Career growth insight */}
            <div className="absolute -left-5 top-24 hidden rounded-2xl border border-border bg-background p-3 shadow-lg sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
                  <TrendingUp className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Career growth</p>

                  <p className="text-sm font-semibold text-foreground">Trending upward</p>
                </div>
              </div>
            </div>

            {/* Next milestone */}
            <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-border bg-background p-3 shadow-lg sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
                  <Compass className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Next milestone</p>

                  <p className="text-sm font-semibold text-foreground">System Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
