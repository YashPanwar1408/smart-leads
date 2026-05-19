import { Request, Response } from 'express';

import { created, ok } from '../../utils/api-response.js';
import { asyncHandler } from '../../utils/async-handler.js';
import { leadsToCsv } from '../../utils/csv.js';
import { AppError } from '../../utils/errors.js';
import { leadService } from './lead.service.js';
import type { CreateLeadInput, LeadListQuery, UpdateLeadInput } from './lead.dto.js';

export const leadController = {
  create: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    const input = req.body as CreateLeadInput;
    const lead = await leadService.create(req.user, input);
    created(res, lead);
  }),
  list: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    const query = req.query as unknown as LeadListQuery;
    const result = await leadService.list(req.user, query);
    ok(res, { items: result.items }, { pagination: result.pagination });
  }),
  getById: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    const lead = await leadService.getById(req.user, req.params.id);
    ok(res, lead);
  }),
  update: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    const input = req.body as UpdateLeadInput;
    const lead = await leadService.update(req.user, req.params.id, input);
    ok(res, lead);
  }),
  remove: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    await leadService.remove(req.user, req.params.id);
    ok(res, { id: req.params.id });
  }),
  exportCsv: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    const query = req.query as unknown as LeadListQuery;
    const leads = await leadService.exportCsv(req.user, query);
    const csv = leadsToCsv(leads);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
    res.status(200).send(csv);
  })
};
