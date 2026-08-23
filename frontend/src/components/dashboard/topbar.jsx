import { Button } from '@/components/ui/button';

export function Topbar() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here is how your career prep is shaping up.
        </p>
      </div>
      <Button size="sm" className="h-9 rounded-full px-4">
        Start a session
      </Button>
    </header>
  );
}
