import { cn } from '@/lib/utils';

export function MetricTile({ label, value, suffix, className }) {
  return (
    <div
      className={cn(
        'surface-card flex flex-col gap-1 rounded-[var(--radius-xl)] p-5',
        className
      )}
    >
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-3xl font-semibold tracking-tight text-foreground">
        {value}
        {suffix ? (
          <span className="ml-1 text-base font-medium text-muted-foreground">{suffix}</span>
        ) : null}
      </span>
    </div>
  );
}
