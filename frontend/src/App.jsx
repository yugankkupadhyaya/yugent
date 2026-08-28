import { useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { Toaster } from 'sonner';
import { AppRoutes } from './app/routes/AppRoutes';
import { applyTheme, getStoredTheme } from './lib/theme';
import { setClerkTokenProvider } from './utils/axios';

function AuthSessionBridge({ children }) {
  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return undefined;

    setClerkTokenProvider(getToken);

    return () => setClerkTokenProvider(undefined);
  }, [getToken, isLoaded]);

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-sm text-muted-foreground">
        Preparing your secure session...
      </main>
    );
  }

  return children;
}

function App() {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return (
    <>
      <AuthSessionBridge>
        <AppRoutes />
      </AuthSessionBridge>
      <Toaster
        richColors
        closeButton
        duration={3000}
        position="top-right"
        swipeDirections={['right', 'top', 'bottom']}
        toastOptions={{
          classNames: {
            toast: 'cursor-grab active:cursor-grabbing',
          },
        }}
      />
    </>
  );
}

export default App;
