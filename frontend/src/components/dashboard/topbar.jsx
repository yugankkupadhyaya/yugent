import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export function Topbar() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-primary">Welcome back</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Career dashboard
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" className="rounded-full">
          <Search className="size-4" />
          Search
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="size-4" />
        </Button>
        <Button asChild className="rounded-full">
          <Link to="/">Back to landing</Link>
        </Button>
      </div>
    </div>
  );
}
