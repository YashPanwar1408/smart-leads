import { http } from './api/http';
import { ApiResponse } from '@/types/api';
import { AuthResponse, LoginInput, RegisterInput, User } from '@/types/auth';

export const authService = {
  login: async (input: LoginInput): Promise<AuthResponse> => {
    const response = await http.post<ApiResponse<AuthResponse>>('/auth/login', input);
    if (!response.data.success || !response.data.data) {
      throw new Error('Login failed');
    }
    return response.data.data;
  },
  register: async (input: RegisterInput): Promise<AuthResponse> => {
    const response = await http.post<ApiResponse<AuthResponse>>('/auth/register', input);
    if (!response.data.success || !response.data.data) {
      throw new Error('Registration failed');
    }
    return response.data.data;
  },
  me: async (): Promise<User> => {
    const response = await http.get<ApiResponse<User>>('/auth/me');
    if (!response.data.success || !response.data.data) {
      throw new Error('Unauthorized');
    }
    return response.data.data;
  }
};
