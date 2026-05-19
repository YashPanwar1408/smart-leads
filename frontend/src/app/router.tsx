import { lazy, ReactNode, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthLayout } from './layout/AuthLayout';
import { AppLayout } from './layout/AppLayout';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { GuestRoute } from './guards/GuestRoute';
import { FullPageSpinner } from '@/components/ui/Spinner';

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const LeadsPage = lazy(() =>
  import('@/features/leads/pages/LeadsPage').then((m) => ({ default: m.LeadsPage }))
);
const LeadDetailPage = lazy(() =>
  import('@/features/leads/pages/LeadDetailPage').then((m) => ({ default: m.LeadDetailPage }))
);
const SettingsPage = lazy(() =>
  import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);
const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('@/features/auth/pages/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const LazyPage = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<FullPageSpinner />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <DashboardPage />
          </LazyPage>
        )
      },
      {
        path: 'leads',
        element: (
          <LazyPage>
            <LeadsPage />
          </LazyPage>
        )
      },
      {
        path: 'leads/:id',
        element: (
          <LazyPage>
            <LeadDetailPage />
          </LazyPage>
        )
      },
      {
        path: 'settings',
        element: (
          <LazyPage>
            <SettingsPage />
          </LazyPage>
        )
      }
    ]
  },
  {
    path: '/',
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        path: 'login',
        element: (
          <LazyPage>
            <LoginPage />
          </LazyPage>
        )
      },
      {
        path: 'register',
        element: (
          <LazyPage>
            <RegisterPage />
          </LazyPage>
        )
      }
    ]
  },
  {
    path: '*',
    element: (
      <LazyPage>
        <NotFoundPage />
      </LazyPage>
    )
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;
