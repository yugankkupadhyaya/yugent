import { ArrowUpRight, Compass, Lightbulb, Users } from 'lucide-react';

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

export function About() {
  return (
    <section id="resources" className="border-t border-border bg-background/55">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        {/* Statement */}
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Why Yugent
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
              We believe your career should be built with intention.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Not by chasing every trend. Not by collecting skills without a direction. And not by
              trying to figure everything out alone.
            </p>

            <a
              href="#features"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Explore Yugent
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24 grid border-y border-border lg:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <article
                key={value.number}
                className={[
                  'responsive-content',
                  'group py-10 lg:px-8 lg:py-12',
                  index !== 0 ? 'border-t border-border lg:border-l lg:border-t-0' : '',
                  index === 0 ? 'lg:pl-0' : '',
                  index === values.length - 1 ? 'lg:pr-0' : '',
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{value.number}</span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-200 group-hover:border-primary/30 group-hover:bg-accent group-hover:text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">
                  {value.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Closing statement */}
        <div className="mt-24 max-w-4xl">
          <p className="text-2xl font-medium leading-relaxed tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Yugent is here to give you the clarity to make better decisions, the tools to prepare
            for them, and the confidence to take the next step.
          </p>
        </div>
      </div>
    </section>
  );
}
