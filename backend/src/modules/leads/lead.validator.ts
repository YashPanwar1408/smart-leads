import { z } from 'zod';

import { LeadSource, LeadStatus } from '../../types/enums.js';

const toArray = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return undefined;
};

export const createLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.nativeEnum(LeadStatus),
  source: z.nativeEnum(LeadSource)
});

export const updateLeadSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  status: z.nativeEnum(LeadStatus).optional(),
  source: z.nativeEnum(LeadSource).optional()
});

export const listLeadSchema = z.object({
  status: z.preprocess(toArray, z.array(z.nativeEnum(LeadStatus)).optional()),
  source: z.preprocess(toArray, z.array(z.nativeEnum(LeadSource)).optional()),
  q: z.string().min(1).optional(),
  sort: z.enum(['latest', 'oldest']).optional().default('latest'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  createdAtFrom: z.string().datetime().optional(),
  createdAtTo: z.string().datetime().optional()
});

export const objectIdParamSchema = z.object({
  id: z.string().regex(/^[a-fA-F0-9]{24}$/)
});
