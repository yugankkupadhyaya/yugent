import { ArrowUpRight, Compass, Target, TrendingUp } from 'lucide-react';

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

export function Vision() {
  return (
    <section id="product" className="border-t border-border bg-background/55">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        {/* Heading */}
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Our vision
            </p>
          </div>

          <div className="max-w-4xl">
            <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
              Your career shouldn&apos;t be a guessing game.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Yugent brings your goals, skills, experience, and opportunities into one clear picture
              — so you can understand where you are, where you want to go, and what it takes to get
              there.
            </p>

            <a
              href="#features"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Explore what Yugent can do
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-24 grid border-y border-border lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.number}
                className={[
                  'group relative py-10 lg:px-8 lg:py-12',
                  index !== 0 ? 'border-t border-border lg:border-l lg:border-t-0' : '',
                  index === 0 ? 'lg:pl-0' : '',
                  index === principles.length - 1 ? 'lg:pr-0' : '',
                ].join(' ')}
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {principle.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-accent group-hover:text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="mt-12 text-xl font-semibold tracking-tight text-foreground">
                  {principle.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                  {principle.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
