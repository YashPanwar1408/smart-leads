import { http } from './api/http';
import { ApiResponse } from '@/types/api';
import { Lead, LeadListResponse, LeadListParams, LeadPayload } from '@/types/lead';
import { PaginationMeta } from '@/types/pagination';

export const leadsService = {
  list: async (params: LeadListParams): Promise<{ items: Lead[]; pagination?: PaginationMeta }> => {
    const response = await http.get<ApiResponse<LeadListResponse>>('/leads', { params });
    if (!response.data.success || !response.data.data) {
      throw new Error('Failed to load leads');
    }
    return { items: response.data.data.items, pagination: response.data.meta.pagination };
  },
  getById: async (id: string): Promise<Lead> => {
    const response = await http.get<ApiResponse<Lead>>(`/leads/${id}`);
    if (!response.data.success || !response.data.data) {
      throw new Error('Lead not found');
    }
    return response.data.data;
  },
  create: async (payload: LeadPayload): Promise<Lead> => {
    const response = await http.post<ApiResponse<Lead>>('/leads', payload);
    if (!response.data.success || !response.data.data) {
      throw new Error('Lead creation failed');
    }
    return response.data.data;
  },
  update: async (id: string, payload: Partial<LeadPayload>): Promise<Lead> => {
    const response = await http.patch<ApiResponse<Lead>>(`/leads/${id}`, payload);
    if (!response.data.success || !response.data.data) {
      throw new Error('Lead update failed');
    }
    return response.data.data;
  },
  remove: async (id: string): Promise<{ id: string }> => {
    const response = await http.delete<ApiResponse<{ id: string }>>(`/leads/${id}`);
    if (!response.data.success || !response.data.data) {
      throw new Error('Lead deletion failed');
    }
    return response.data.data;
  },
  exportCsv: async (params: LeadListParams): Promise<Blob> => {
    const response = await http.get('/leads/export', { params, responseType: 'blob' });
    return response.data as Blob;
  }
};
