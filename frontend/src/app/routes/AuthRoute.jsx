import { useAuth } from '@clerk/react';
import { Navigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

function AuthLoading() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background px-6 text-center"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center">
        <LoaderCircle className="size-6 animate-spin text-primary" aria-hidden="true" />
        <p className="mt-4 text-sm font-medium text-foreground">Loading your dashboard…</p>
        <p className="mt-1 text-sm text-muted-foreground">Checking your account securely.</p>
      </div>
    </main>
  );
}

export function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <AuthLoading />;
  }

  return isSignedIn ? children : <Navigate to="/login" replace />;
}
