import { FilterQuery, SortOrder, Types } from 'mongoose';

import { LeadModel } from '../../models/lead.model.js';
import type { LeadDocument } from '../../models/lead.model.js';
import { LeadSource, LeadStatus } from '../../types/enums.js';

export interface LeadFilters {
  status?: LeadStatus[];
  source?: LeadSource[];
  q?: string;
  ownerId?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
}

const escapeRegex = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const buildFilter = (filters: LeadFilters): FilterQuery<LeadDocument> => {
  const query: FilterQuery<LeadDocument> = {};

  if (filters.status && filters.status.length > 0) {
    query.status = { $in: filters.status };
  }

  if (filters.source && filters.source.length > 0) {
    query.source = { $in: filters.source };
  }

  if (filters.ownerId) {
    query.ownerId = new Types.ObjectId(filters.ownerId);
  }

  if (filters.createdAtFrom || filters.createdAtTo) {
    query.createdAt = {};
    if (filters.createdAtFrom) {
      query.createdAt.$gte = new Date(filters.createdAtFrom);
    }
    if (filters.createdAtTo) {
      query.createdAt.$lte = new Date(filters.createdAtTo);
    }
  }

  if (filters.q) {
    const pattern = new RegExp(escapeRegex(filters.q), 'i');
    query.$or = [{ name: pattern }, { email: pattern }];
  }

  return query;
};

export const leadRepository = {
  create: async (data: {
    name: string;
    email: string;
    status: LeadStatus;
    source: LeadSource;
    ownerId: Types.ObjectId;
  }) => {
    return LeadModel.create(data);
  },
  findById: async (id: string) => {
    return LeadModel.findById(id).exec();
  },
  updateById: async (
    id: string,
    data: Partial<{ name: string; email: string; status: LeadStatus; source: LeadSource }>
  ) => {
    return LeadModel.findByIdAndUpdate(id, data, { new: true }).exec();
  },
  deleteById: async (id: string) => {
    return LeadModel.findByIdAndDelete(id).exec();
  },
  list: async (
    filters: LeadFilters,
    sort: Record<string, SortOrder>,
    page: number,
    limit: number
  ) => {
    const query = buildFilter(filters);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      LeadModel.find(query).sort(sort).skip(skip).limit(limit).exec(),
      LeadModel.countDocuments(query)
    ]);

    return { items, total };
  },
  findAll: async (filters: LeadFilters, sort: Record<string, SortOrder>) => {
    const query = buildFilter(filters);
    return LeadModel.find(query).sort(sort).exec();
  }
};
