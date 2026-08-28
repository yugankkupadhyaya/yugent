import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/react';

export function PublicRoute({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
