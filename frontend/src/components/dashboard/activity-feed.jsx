const activities = [
  { title: 'Completed React deep dive', time: '2h ago', dot: 'bg-primary' },
  { title: 'Resume feedback received', time: '5h ago', dot: 'bg-emerald-500' },
  { title: 'Mock interview scheduled', time: '1d ago', dot: 'bg-amber-500' },
  { title: 'System design module unlocked', time: '2d ago', dot: 'bg-sky-500' },
];

export function ActivityFeed() {
  return (
    <div className="surface-card rounded-[var(--radius-2xl)] p-6">
      <h2 className="text-lg font-semibold text-foreground">Recent activity</h2>
      <ul className="mt-4 space-y-4">
        {activities.map((activity) => (
          <li key={activity.title} className="flex items-start gap-3">
            <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${activity.dot}`} />
            <div className="flex flex-1 items-center justify-between gap-3">
              <span className="text-sm text-foreground">{activity.title}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
