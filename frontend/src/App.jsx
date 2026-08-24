import { useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { AppRoutes } from './app/routes/AppRoutes';
import { applyTheme, getStoredTheme } from './lib/theme';
import api, { setClerkTokenProvider } from './utils/axios';

function AuthSessionBridge() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    setClerkTokenProvider(getToken);
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return undefined;

    let cancelled = false;
    api.post('/api/auth/login').catch((error) => {
      if (!cancelled) console.error('Unable to initialize application session:', error);
    });

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn]);

  return null;
}

function App() {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return (
    <>
      <AuthSessionBridge />
      <AppRoutes />
    </>
  );
}

export default App;
