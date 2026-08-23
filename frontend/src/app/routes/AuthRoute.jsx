import { useAuth } from '@clerk/react';
import { Navigate } from 'react-router-dom';

function AuthLoading() {
  return <main className="min-h-screen bg-background" aria-busy="true" />;
}

export function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <AuthLoading />;
  }

  return isSignedIn ? children : <Navigate to="/login" replace />;
}
