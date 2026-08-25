import { useState } from 'react';
import { useUser } from '@clerk/react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { applyTheme, getStoredTheme } from '@/lib/theme';

function getFirstName(user) {
  const fullName = user?.name || user?.fullName;
  return user?.firstName || fullName?.trim().split(/\s+/)[0] || '';
}

export function DashboardHeader({ user }) {
  const [theme, setTheme] = useState(getStoredTheme);
  const { user: clerkUser } = useUser();
  const firstName = getFirstName(user) || getFirstName(clerkUser);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <header className="relative z-10 border-b border-border/70 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between gap-4">
          <SidebarTrigger className="size-9 rounded-md border border-border bg-background text-muted-foreground shadow-none hover:bg-accent hover:text-foreground" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="size-9 rounded-md border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>

        <div className="mt-7 sm:mt-9">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Overview</p>
          <h1 className="mt-3 text-[clamp(1.85rem,3.4vw,2.7rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-foreground">
            Welcome back{firstName ? `, ${firstName}` : ''}.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[0.9375rem]">
            Your career workspace, interview progress, and next steps in one place.
          </p>
        </div>
      </div>
    </header>
  );
}
