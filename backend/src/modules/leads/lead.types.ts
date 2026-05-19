import { LeadSource, LeadStatus } from '../../types/enums.js';

export interface LeadFilterQuery {
  status?: LeadStatus[];
  source?: LeadSource[];
  q?: string;
  ownerId?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
}
