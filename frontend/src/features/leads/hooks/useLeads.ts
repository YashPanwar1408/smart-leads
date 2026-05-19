import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { leadsService } from '@/services/leads';
import { LeadListParams } from '@/types/lead';

export const useLeads = (params: LeadListParams) => {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => leadsService.list(params),
    placeholderData: keepPreviousData
  });
};

export const useLead = (id: string) => {
  return useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadsService.getById(id),
    enabled: Boolean(id)
  });
};
