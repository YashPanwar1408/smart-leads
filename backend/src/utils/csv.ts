import { Parser } from 'json2csv';

import type { LeadDocument } from '../models/lead.model.js';

export const leadsToCsv = (leads: LeadDocument[]): string => {
  const rows = leads.map((lead) => ({
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    ownerId: lead.ownerId.toString(),
    createdAt: lead.createdAt.toISOString()
  }));

  const parser = new Parser({
    fields: ['id', 'name', 'email', 'status', 'source', 'ownerId', 'createdAt']
  });

  return parser.parse(rows);
};
