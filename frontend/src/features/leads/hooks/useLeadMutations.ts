import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { leadsService } from '@/services/leads';
import { getErrorMessage } from '@/services/api/errors';
import { LeadPayload } from '@/types/lead';

export const useLeadMutations = () => {
  const queryClient = useQueryClient();

  const createLead = useMutation({
    mutationFn: (payload: LeadPayload) => leadsService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created');
    },
    onError: (error: unknown) => toast.error(getErrorMessage(error))
  });

  const updateLead = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<LeadPayload> }) =>
      leadsService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['leads'] });
      void queryClient.invalidateQueries({ queryKey: ['lead'] });
      toast.success('Lead updated');
    },
    onError: (error: unknown) => toast.error(getErrorMessage(error))
  });

  const deleteLead = useMutation({
    mutationFn: (id: string) => leadsService.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted');
    },
    onError: (error: unknown) => toast.error(getErrorMessage(error))
  });

  return {
    createLead,
    updateLead,
    deleteLead
  };
};
