import { useAuth } from '@clerk/react';
import { Navigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchResume } from '@/store/resumeSlice';

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
  const dispatch = useDispatch();
  const resumeStatus = useSelector((state) => state.resume.status);
  const resumeHasFetched = useSelector((state) => state.resume.hasFetched);

  useEffect(() => {
    if (
      isLoaded &&
      isSignedIn &&
      !resumeHasFetched &&
      resumeStatus !== 'loading' &&
      resumeStatus !== 'uploading'
    ) {
      dispatch(fetchResume());
    }
  }, [dispatch, isLoaded, isSignedIn, resumeHasFetched, resumeStatus]);

  if (!isLoaded) {
    return <AuthLoading />;
  }

  return isSignedIn ? children : <Navigate to="/login" replace />;
}
