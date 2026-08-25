export function DashboardStatCard({ label, value, highlight, description, icon: Icon }) {
  return (
    <article className="group relative min-w-0 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] transition-colors duration-200 hover:border-primary/30 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        {Icon && (
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
            <Icon className="size-3.5" aria-hidden="true" />
          </span>
        )}
      </div>

      <p className="mt-7 font-semibold leading-none tracking-[-0.055em] text-[clamp(2rem,3vw,2.55rem)] tabular-nums text-foreground">
        {value}
      </p>

      <div className="mt-6 flex min-h-5 flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5">
        {highlight && <span className="font-medium text-primary">{highlight}</span>}
        {description && <span className="text-muted-foreground">{description}</span>}
      </div>
    </article>
  );
}
