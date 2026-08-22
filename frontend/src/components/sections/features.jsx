import { ArrowUpRight, BrainCircuit, FileText, Map, Mic, Target } from 'lucide-react';

const features = [
  {
    title: 'AI interview practice',
    description:
      'Practice realistic interviews, improve your answers, and build confidence before the real conversation.',
    icon: Mic,
    className: 'lg:col-span-2',
  },
  {
    title: 'Resume intelligence',
    description: 'Understand how strong your resume is and where it can improve.',
    icon: FileText,
    className: 'lg:col-span-1',
  },
  {
    title: 'Personal career roadmap',
    description: 'Turn your career goals into a clear sequence of achievable steps.',
    icon: Map,
    className: 'lg:col-span-1',
  },
  {
    title: 'Skill-gap analysis',
    description:
      'Discover the skills that matter for the roles you want and focus your effort where it counts.',
    icon: Target,
    className: 'lg:col-span-2',
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-muted/55">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Everything in one place
            </p>

            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
              Tools that turn ambition into progress.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-muted-foreground">
            From your first resume to your next interview, Yugent gives you the tools and direction
            to keep moving forward.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            return (
              <article
                key={feature.title}
                className={`responsive-content group relative overflow-hidden rounded-3xl border border-border bg-card ${feature.className}`}
              >
                {/* Product visual */}
                <div className="relative min-h-[250px] overflow-hidden bg-secondary p-6">
                  {/* Decorative geometry */}
                  <div
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${
                      index === 0
                        ? 'bg-primary/20'
                        : index === 1
                          ? 'bg-accent-cyan/20'
                          : index === 2
                            ? 'bg-accent-violet/20'
                            : 'bg-accent-coral/20'
                    }`}
                  />

                  <div className="relative flex h-full min-h-[205px] items-center justify-center">
                    {index === 0 && (
                      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <BrainCircuit className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">Interview session</p>
                            <p className="text-sm font-semibold">Frontend Engineer</p>
                          </div>

                          <span className="ml-auto rounded-full bg-accent px-2 py-1 text-[10px] font-medium text-primary">
                            LIVE
                          </span>
                        </div>

                        <div className="mt-5 rounded-xl bg-muted p-4">
                          <div className="h-2 w-3/4 rounded-full bg-border" />
                          <div className="mt-2 h-2 w-1/2 rounded-full bg-border" />
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-primary/20">
                            <div className="h-full w-[78%] rounded-full bg-primary" />
                          </div>

                          <span className="text-xs font-medium text-primary">78%</span>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-lg">
                        <div className="flex items-center justify-between">
                          <FileText className="h-5 w-5 text-accent-cyan" />
                          <span className="text-3xl font-semibold tracking-tight">88</span>
                        </div>

                        <p className="mt-2 text-xs text-muted-foreground">Resume score</p>

                        <div className="mt-5 h-2 rounded-full bg-muted">
                          <div className="h-full w-[88%] rounded-full bg-accent-cyan" />
                        </div>

                        <div className="mt-4 flex justify-between text-[11px] text-muted-foreground">
                          <span>Experience</span>
                          <span>Skills</span>
                          <span>Impact</span>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-violet/15 text-accent-violet">
                            <Map className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">Career roadmap</p>
                            <p className="text-sm font-semibold">Frontend Engineer</p>
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          {['React', 'System Design', 'Interview'].map((step, stepIndex) => (
                            <div key={step} className="flex items-center gap-3">
                              <div
                                className={`h-2.5 w-2.5 rounded-full ${
                                  stepIndex === 0 ? 'bg-accent-violet' : 'bg-border'
                                }`}
                              />

                              <span className="text-xs text-muted-foreground">{step}</span>

                              {stepIndex === 0 && (
                                <span className="ml-auto text-[10px] font-medium text-accent-violet">
                                  Current
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {index === 3 && (
                      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-coral/15 text-accent-coral">
                            <Target className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">Skill analysis</p>
                            <p className="text-sm font-semibold">Your strongest opportunities</p>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-2">
                          {['React', 'TypeScript', 'AWS'].map((skill, i) => (
                            <div key={skill} className="rounded-xl bg-muted p-3">
                              <p className="text-xs font-medium">{skill}</p>
                              <p className="mt-2 text-lg font-semibold">{[92, 76, 54][i]}%</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">
                        {feature.title}
                      </h3>

                      <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 group-hover:border-primary/30 group-hover:bg-accent group-hover:text-primary">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
