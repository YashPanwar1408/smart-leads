import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { FullPageSpinner } from '@/components/ui/Spinner';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const status = useAuthStore((state) => state.status);
  const accessToken = useAuthStore((state) => state.accessToken);

  if (status === 'loading' || status === 'idle') {
    return <FullPageSpinner />;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
