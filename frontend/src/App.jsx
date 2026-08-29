import { useEffect } from 'react';
import { useAuth } from '@clerk/react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'sonner';
import { AppRoutes } from './app/routes/AppRoutes';
import { applyTheme, getStoredTheme } from './lib/theme';
import { setClerkTokenProvider } from './utils/axios';
import { clearResumeSession, hydrateForUser } from './store/resumeSlice';
import {
  loadStoredAnalyzedResume,
  loadStoredGeneratedResume,
} from './store/resumeStorage';

function AuthSessionBridge({ children }) {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) return undefined;

    setClerkTokenProvider(getToken);

    return () => setClerkTokenProvider(undefined);
  }, [getToken, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && userId) {
      const analysis = loadStoredAnalyzedResume(userId);
      const generatedPayload = loadStoredGeneratedResume(userId);

      dispatch(
        hydrateForUser({
          userId,
          analysis,
          generated: generatedPayload.data,
          builderStep: generatedPayload.currentStep,
          showPreview: generatedPayload.showPreview,
        }),
      );
    } else if (!isSignedIn) {
      dispatch(clearResumeSession());
    }
  }, [dispatch, isLoaded, isSignedIn, userId]);

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
