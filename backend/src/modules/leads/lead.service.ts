import { Types } from 'mongoose';

import type { AuthUser } from '../../types/auth.js';
import { AppError } from '../../utils/errors.js';
import { buildPaginationMeta } from '../../utils/pagination.js';
import { leadRepository } from './lead.repository.js';
import { CreateLeadInput, LeadListQuery, UpdateLeadInput } from './lead.dto.js';

const resolveSort = (sort?: 'latest' | 'oldest'): { createdAt: 1 | -1 } => {
  if (sort === 'oldest') {
    return { createdAt: 1 };
  }

  return { createdAt: -1 };
};

export const leadService = {
  create: async (user: AuthUser, input: CreateLeadInput) => {
    return leadRepository.create({
      ...input,
      ownerId: new Types.ObjectId(user.id)
    });
  },
  list: async (user: AuthUser, query: LeadListQuery) => {
    const filters = {
      status: query.status,
      source: query.source,
      q: query.q,
      createdAtFrom: query.createdAtFrom,
      createdAtTo: query.createdAtTo,
      ownerId: user.role === 'sales' ? user.id : undefined
    };

    const sort = resolveSort(query.sort);
    const { items, total } = await leadRepository.list(filters, sort, query.page, query.limit);
    const pagination = buildPaginationMeta(query.page, query.limit, total);

    return { items, pagination };
  },
  getById: async (user: AuthUser, id: string) => {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', 404, 'LEAD_NOT_FOUND');
    }

    if (user.role === 'sales' && lead.ownerId.toString() !== user.id) {
      throw new AppError('Forbidden', 403, 'FORBIDDEN');
    }

    return lead;
  },
  update: async (user: AuthUser, id: string, input: UpdateLeadInput) => {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', 404, 'LEAD_NOT_FOUND');
    }

    if (user.role === 'sales' && lead.ownerId.toString() !== user.id) {
      throw new AppError('Forbidden', 403, 'FORBIDDEN');
    }

    return leadRepository.updateById(id, input);
  },
  remove: async (user: AuthUser, id: string) => {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', 404, 'LEAD_NOT_FOUND');
    }

    if (user.role === 'sales' && lead.ownerId.toString() !== user.id) {
      throw new AppError('Forbidden', 403, 'FORBIDDEN');
    }

    await leadRepository.deleteById(id);
  },
  exportCsv: async (user: AuthUser, query: LeadListQuery) => {
    const filters = {
      status: query.status,
      source: query.source,
      q: query.q,
      createdAtFrom: query.createdAtFrom,
      createdAtTo: query.createdAtTo,
      ownerId: user.role === 'sales' ? user.id : undefined
    };

    const sort = resolveSort(query.sort);
    return leadRepository.findAll(filters, sort);
  }
};
