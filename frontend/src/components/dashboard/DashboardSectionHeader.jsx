export function DashboardSectionHeader({ eyebrow, title, description, titleId }) {
  return (
    <div className="max-w-xl">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 id={titleId} className="mt-3 text-xl font-semibold tracking-[-0.035em] text-foreground sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
