import { useQueries } from '@tanstack/react-query';

import { leadsService } from '@/services/leads';
import { LeadStatus } from '@/types/lead';

interface DashboardStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  lost: number;
  isLoading: boolean;
}

const fetchCount = async (status?: LeadStatus): Promise<number> => {
  const result = await leadsService.list({
    status: status ? [status] : undefined,
    limit: 1,
    page: 1
  });
  return result.pagination?.total ?? 0;
};

export const useDashboardStats = (): DashboardStats => {
  const queries = useQueries({
    queries: [
      { queryKey: ['stats', 'total'], queryFn: () => fetchCount(), staleTime: 60_000 },
      { queryKey: ['stats', 'New'], queryFn: () => fetchCount('New'), staleTime: 60_000 },
      { queryKey: ['stats', 'Contacted'], queryFn: () => fetchCount('Contacted'), staleTime: 60_000 },
      { queryKey: ['stats', 'Qualified'], queryFn: () => fetchCount('Qualified'), staleTime: 60_000 },
      { queryKey: ['stats', 'Lost'], queryFn: () => fetchCount('Lost'), staleTime: 60_000 }
    ]
  });

  const isLoading = queries.some((q) => q.isLoading);

  return {
    total: queries[0].data ?? 0,
    new: queries[1].data ?? 0,
    contacted: queries[2].data ?? 0,
    qualified: queries[3].data ?? 0,
    lost: queries[4].data ?? 0,
    isLoading
  };
};
