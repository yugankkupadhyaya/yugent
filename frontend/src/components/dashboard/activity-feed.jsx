import { DashboardCard } from '@/components/dashboard/dashboard-card';

const items = [
  'Completed AI interview practice session',
  'Resume score improved by 6 points',
  'System design added to your roadmap',
];

export function ActivityFeed() {
  return (
    <DashboardCard>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">Recent activity</h3>
        <div className="mt-5 space-y-4">
          {items.map((item, index) => (
            <div key={item} className="flex gap-3">
              <div className="mt-1 size-2 rounded-full bg-primary" />
              <div>
                <p className="text-sm text-foreground">{item}</p>
                <p className="mt-1 text-xs text-muted-foreground">{index + 1}h ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
