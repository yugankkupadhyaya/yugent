export function DashboardHeader({ user }) {
  return (
    <header className="border-b border-border/60 px-5 py-6 sm:px-8 lg:px-10">
      <p className="eyebrow mb-2">Overview</p>

      <h1 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        Welcome back{user?.name ? `, ${user.name}` : ''}.
      </h1>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        Your career workspace, interview progress, and next steps in one place.
      </p>
    </header>
  );
}
