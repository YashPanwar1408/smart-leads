import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { authService } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';
import { getErrorMessage } from '@/services/api/errors';
import { LoginInput, RegisterInput } from '@/types/auth';

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: (input: LoginInput) => authService.login(input),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toast.success('Welcome back!');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    }
  });

  const registerMutation = useMutation({
    mutationFn: (input: RegisterInput) => authService.register(input),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toast.success('Account created successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    }
  });

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,
    logout
  };
};
