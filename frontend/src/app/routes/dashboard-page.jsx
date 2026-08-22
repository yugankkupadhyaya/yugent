import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { MetricTile } from '@/components/dashboard/metric-tile';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';
import { PageTransition } from '@/components/motion/page-transition';
import { Container } from '@/components/layout/container';

export function DashboardPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Container className="py-6 sm:py-8">
          <Topbar />
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
            <Sidebar />

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <MetricTile label="Career readiness" value={92} suffix="%" />
                <MetricTile label="Resume score" value="88/100" />
                <MetricTile label="Practice streak" value={14} suffix=" days" />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <ActivityFeed />
                <div className="surface-card rounded-[var(--radius-2xl)] p-6">
                  <h2 className="text-lg font-semibold text-foreground">Roadmap snapshot</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Your strongest next opportunity is system design preparation paired with structured interview practice.
                  </p>
                  <div className="mt-6 space-y-3">
                    {['React depth', 'System design', 'Mock interviews'].map((item, index) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-secondary/45 px-4 py-3">
                        <div className={`size-2.5 rounded-full ${index === 0 ? 'bg-primary' : 'bg-border'}`} />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
