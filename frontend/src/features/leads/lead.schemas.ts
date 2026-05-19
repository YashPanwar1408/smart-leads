import { z } from 'zod';

import { LeadSource, LeadStatus } from '@/types/lead';

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost'] as [LeadStatus, ...LeadStatus[]]),
  source: z.enum(['Website', 'Instagram', 'Referral'] as [LeadSource, ...LeadSource[]])
});

export type LeadFormValues = z.infer<typeof leadSchema>;
