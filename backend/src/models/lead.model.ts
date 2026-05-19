import { HydratedDocument, Schema, Types, model } from 'mongoose';

import { LeadSource, LeadStatus } from '../types/enums.js';

export interface LeadAttrs {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  ownerId: Types.ObjectId;
}

export type LeadDocument = HydratedDocument<LeadAttrs> & {
  createdAt: Date;
  updatedAt: Date;
};

const leadSchema = new Schema<LeadAttrs>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    status: { type: String, enum: Object.values(LeadStatus), required: true },
    source: { type: String, enum: Object.values(LeadSource), required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
);

leadSchema.index({ name: 'text', email: 'text' });

leadSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

export const LeadModel = model<LeadAttrs>('Lead', leadSchema);
