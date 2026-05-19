import { ReactNode } from 'react';

import { UserRole } from '@/types/auth';
import { useAuthStore } from '@/store/authStore';

interface RoleGateProps {
  allowed: UserRole[];
  children: ReactNode;
}

export const RoleGate = ({ allowed, children }: RoleGateProps) => {
  const role = useAuthStore((state) => state.user?.role);

  if (!role || !allowed.includes(role)) {
    return null;
  }

  return <>{children}</>;
};
