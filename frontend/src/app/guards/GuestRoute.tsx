import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { FullPageSpinner } from '@/components/ui/Spinner';
import { useAuthStore } from '@/store/authStore';

interface GuestRouteProps {
  children: ReactNode;
}

/** Redirect authenticated users away from login/register pages */
export const GuestRoute = ({ children }: GuestRouteProps) => {
  const status = useAuthStore((state) => state.status);
  const accessToken = useAuthStore((state) => state.accessToken);

  if (status === 'loading' || status === 'idle') {
    return <FullPageSpinner />;
  }

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
