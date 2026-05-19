import { LeadSource, LeadStatus } from '../../types/enums.js';

export interface CreateLeadInput {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface UpdateLeadInput {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

export interface LeadListQuery {
  status?: LeadStatus[];
  source?: LeadSource[];
  q?: string;
  sort?: 'latest' | 'oldest';
  page: number;
  limit: number;
  createdAtFrom?: string;
  createdAtTo?: string;
}
