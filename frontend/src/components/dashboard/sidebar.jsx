import { Compass, LayoutDashboard, Target } from 'lucide-react';

const items = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Roadmap', icon: Compass },
  { label: 'Goals', icon: Target },
];

export function Sidebar() {
  return (
    <aside className="surface-card h-full rounded-[var(--radius-2xl)] p-4 sm:p-5">
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Dashboard
      </p>
      <nav className="mt-4 space-y-1.5">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-colors ${
                index === 0
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground'
              }`}
            >
              <Icon className="size-4" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
