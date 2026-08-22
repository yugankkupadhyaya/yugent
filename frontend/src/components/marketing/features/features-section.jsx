import { BrainCircuit, FileText, Map, Target } from 'lucide-react';

import { SectionHeader } from '@/components/layout/section-header';
import { SectionShell } from '@/components/layout/section-shell';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { FeatureCard } from '@/components/marketing/features/feature-card';

const features = [
  {
    title: 'AI interview practice',
    description:
      'Practice realistic interviews, improve your answers, and build confidence before the real conversation.',
    className: 'lg:col-span-2',
    accent: 'bg-primary/20',
  },
  {
    title: 'Resume intelligence',
    description: 'Understand how strong your resume is and where it can improve.',
    className: 'lg:col-span-1',
    accent: 'bg-accent-cyan/20',
  },
  {
    title: 'Personal career roadmap',
    description: 'Turn your career goals into a clear sequence of achievable steps.',
    className: 'lg:col-span-1',
    accent: 'bg-accent-violet/20',
  },
  {
    title: 'Skill-gap analysis',
    description:
      'Discover the skills that matter for the roles you want and focus your effort where it counts.',
    className: 'lg:col-span-2',
    accent: 'bg-accent-coral/20',
  },
];

export function FeaturesSection() {
  return (
    <SectionShell id="features" tone="muted">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeader
          eyebrow="Everything in one place"
          title="Tools that turn ambition into progress."
          description="From your first resume to your next interview, Yugent gives you the tools and direction to keep moving forward."
        />
      </div>

      <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.12}>
        {features.map((feature, index) => (
          <StaggerItem key={feature.title} className={feature.className}>
            <FeatureCard title={feature.title} description={feature.description} className="group relative overflow-hidden">
              <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${feature.accent}`} />

              {index === 0 ? (
                <div className="w-full max-w-md rounded-[var(--radius-xl)] border border-border/80 bg-card p-4 shadow-[var(--shadow-md)]">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <BrainCircuit className="size-4" />
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
              ) : null}

              {index === 1 ? (
                <div className="w-full max-w-sm rounded-[var(--radius-xl)] border border-border/80 bg-card p-5 shadow-[var(--shadow-md)]">
                  <div className="flex items-center justify-between">
                    <FileText className="size-5 text-accent-cyan" />
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
              ) : null}

              {index === 2 ? (
                <div className="relative w-full max-w-sm rounded-[var(--radius-xl)] border border-border/80 bg-card p-5 shadow-[var(--shadow-md)]">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-accent-violet/15 text-accent-violet">
                      <Map className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Career roadmap</p>
                      <p className="text-sm font-semibold">Frontend Engineer</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {['React', 'System Design', 'Interview'].map((step, stepIndex) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`size-2.5 rounded-full ${stepIndex === 0 ? 'bg-accent-violet' : 'bg-border'}`} />
                        <span className="text-xs text-muted-foreground">{step}</span>
                        {stepIndex === 0 ? (
                          <span className="ml-auto text-[10px] font-medium text-accent-violet">Current</span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {index === 3 ? (
                <div className="w-full max-w-md rounded-[var(--radius-xl)] border border-border/80 bg-card p-5 shadow-[var(--shadow-md)]">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-accent-coral/15 text-accent-coral">
                      <Target className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Skill analysis</p>
                      <p className="text-sm font-semibold">Your strongest opportunities</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {['React', 'TypeScript', 'AWS'].map((skill, skillIndex) => (
                      <div key={skill} className="rounded-xl bg-muted p-3">
                        <p className="text-xs font-medium">{skill}</p>
                        <p className="mt-2 text-lg font-semibold">{[92, 76, 54][skillIndex]}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </FeatureCard>
          </StaggerItem>
        ))}
      </Stagger>
    </SectionShell>
  );
}
