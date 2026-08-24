import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/react';
import api from '@/utils/axios';

export function Topbar() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await api.get('/api/auth/logout');
    } finally {
      await signOut({ redirectUrl: '/login' });
    }
  };

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
      <div className="flex gap-2">
        <Button size="sm" className="h-9 rounded-full px-4">Start a session</Button>
        <Button size="sm" variant="outline" className="h-9 rounded-full px-4" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
