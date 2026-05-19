import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000
    }
  }
});

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  useTheme();
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    void initialize(authService.me);
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg, #fff)',
            color: 'var(--toast-color, #18181b)',
            border: '1px solid rgb(228 228 231)',
            borderRadius: '12px',
            fontSize: '14px',
            padding: '12px 16px',
            boxShadow: '0 4px 16px -2px rgb(0 0 0 / 0.1)'
          },
          success: {
            iconTheme: { primary: '#6366f1', secondary: '#fff' }
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' }
          }
        }}
        containerStyle={{ top: 20, right: 20 }}
      />
    </QueryClientProvider>
  );
};
