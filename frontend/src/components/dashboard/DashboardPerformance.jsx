import { BarChart3 } from 'lucide-react';

import { DashboardSectionHeader } from './DashboardSectionHeader';

export function DashboardPerformance({ history = [] }) {
  const hasHistory = Array.isArray(history) && history.length > 0;

  return (
    <section aria-labelledby="performance-heading">
      <DashboardSectionHeader
        eyebrow="Performance"
        title="Interview history"
        titleId="performance-heading"
        description="Track how your interview performance evolves over time."
      />

      <div className="mt-5 rounded-2xl border border-border bg-card shadow-[var(--shadow-xs)]">
        {hasHistory ? (
          <div className="flex min-h-72 items-center justify-center p-6 text-sm text-muted-foreground">
            Performance visualization is ready to connect to your interview history.
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center sm:min-h-80">
            <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <BarChart3 className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-sm font-semibold text-foreground">Your interview history will appear here</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Complete your first interview to start tracking performance.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
