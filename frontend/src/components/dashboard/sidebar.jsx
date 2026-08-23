import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Overview', active: true },
  { label: 'Roadmap', active: false },
  { label: 'Practice', active: false },
  { label: 'Resume', active: false },
  { label: 'Settings', active: false },
];

export function Sidebar({ className }) {
  return (
    <aside
      className={cn(
        'surface-card hidden rounded-[var(--radius-2xl)] p-4 lg:block',
        className
      )}
    >
      <div className="flex items-center gap-2 px-2 py-3">
        <div className="size-8 rounded-xl bg-primary/15" />
        <span className="text-sm font-semibold text-foreground">Yugent</span>
      </div>
      <nav className="mt-2 flex flex-col gap-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              'rounded-xl px-3 py-2 text-sm font-medium transition-colors',
              item.active
                ? 'bg-primary/10 text-foreground'
                : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
