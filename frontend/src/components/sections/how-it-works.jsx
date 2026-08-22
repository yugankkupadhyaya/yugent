import { ArrowRight, Check, Compass, FileSearch, Route } from 'lucide-react';

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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-background/55">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            How it works
          </p>

          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            From where you are to where you want to be.
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Yugent turns a vague career goal into a clearer sequence of decisions, skills, and
            actions.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Connecting line */}
          <div
            className="absolute left-[22px] top-8 hidden h-[calc(100%-64px)] w-px bg-border md:block"
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="responsive-content group relative grid gap-8 md:grid-cols-[72px_1fr_280px] md:gap-10 lg:grid-cols-[88px_1fr_360px] lg:gap-16"
                >
                  {/* Number */}
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground transition-colors duration-200 group-hover:border-primary/40 group-hover:bg-accent group-hover:text-primary">
                    {step.number}
                  </div>

                  {/* Main content */}
                  <div className="max-w-2xl pb-12 md:border-b md:border-border">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />

                      <span className="text-sm font-medium text-muted-foreground">
                        Step {index + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual */}
                  <div className="hidden md:block">
                    <div className="relative h-36 overflow-hidden rounded-2xl border border-border bg-secondary p-4">
                      {index === 0 && (
                        <div className="space-y-3">
                          <div className="h-2 w-24 rounded-full bg-border" />
                          <div className="h-9 rounded-xl border border-border bg-card" />

                          <div className="flex gap-2">
                            <div className="h-7 w-20 rounded-lg bg-primary/10" />
                            <div className="h-7 w-24 rounded-lg bg-primary/10" />
                          </div>
                        </div>
                      )}

                      {index === 1 && (
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
                      )}

                      {index === 2 && (
                        <div className="space-y-3">
                          {['Build skills', 'Practice interviews', 'Apply'].map(
                            (item, itemIndex) => (
                              <div key={item} className="flex items-center gap-2">
                                <div
                                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                    itemIndex === 0
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-card text-muted-foreground'
                                  }`}
                                >
                                  {itemIndex === 0 ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <span className="text-[9px]">{itemIndex + 1}</span>
                                  )}
                                </div>

                                <span className="text-xs text-muted-foreground">{item}</span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-20 flex flex-col justify-between gap-6 rounded-3xl border border-border bg-secondary p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-foreground">
              A clearer next step changes everything.
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Start building your roadmap with Yugent.
            </p>
          </div>

          <a
            href="#get-started"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary"
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
