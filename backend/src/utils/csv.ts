import { Parser } from 'json2csv';
import type { Types } from 'mongoose';

import { LeadSource, LeadStatus } from '../types/enums.js';

interface LeadCsvSource {
  _id: Types.ObjectId;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  ownerId: Types.ObjectId;
  createdAt: Date;
}

export const leadsToCsv = (leads: LeadCsvSource[]): string => {
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
