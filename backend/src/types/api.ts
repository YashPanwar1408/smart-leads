import { PaginationMeta } from './pagination.js';

export interface ApiMeta {
  requestId?: string;
  pagination?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta: ApiMeta;
  error: ApiError | null;
}
