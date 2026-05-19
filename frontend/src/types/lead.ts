export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface LeadListParams {
  status?: LeadStatus[] | string;
  source?: LeadSource[] | string;
  q?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
  createdAtFrom?: string;
  createdAtTo?: string;
}

export interface LeadListResponse {
  items: Lead[];
}
