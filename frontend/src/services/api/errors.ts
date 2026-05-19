import { AxiosError } from 'axios';

import { ApiError, ApiResponse } from '@/types/api';

export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiResponse<unknown>>;
  const apiError: ApiError | undefined = axiosError.response?.data?.error ?? undefined;
  if (apiError?.message) {
    return apiError.message;
  }
  return 'Unexpected error. Please try again.';
};
