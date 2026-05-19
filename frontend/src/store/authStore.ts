import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/auth';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initialize: (getMe: () => Promise<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      status: 'idle',
      setAuth: (user, token) => set({ user, accessToken: token, status: 'authenticated' }),
      logout: () => set({ user: null, accessToken: null, status: 'unauthenticated' }),
      initialize: async (getMe) => {
        const token = get().accessToken;
        if (!token) {
          set({ status: 'unauthenticated' });
          return;
        }

        set({ status: 'loading' });
        try {
          const me = await getMe();
          set({ user: me, status: 'authenticated' });
        } catch {
          set({ user: null, accessToken: null, status: 'unauthenticated' });
        }
      }
    }),
    {
      name: 'smart-leads-auth',
      partialize: (state) => ({ accessToken: state.accessToken, user: state.user })
    }
  )
);
