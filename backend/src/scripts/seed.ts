import { connectDb } from '../config/db.js';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { LeadModel } from '../models/lead.model.js';
import { UserModel } from '../models/user.model.js';
import { LeadSource, LeadStatus, UserRole } from '../types/enums.js';
import { hashPassword } from '../utils/password.js';

const seed = async (): Promise<void> => {
  await connectDb();

  await Promise.all([UserModel.deleteMany({}), LeadModel.deleteMany({})]);

  const adminName = env.ADMIN_NAME ?? 'Admin User';
  const adminEmail = env.ADMIN_EMAIL ?? 'admin@smartleads.io';
  const adminPassword = env.ADMIN_PASSWORD ?? 'ChangeMe123!';

  const admin = await UserModel.create({
    name: adminName,
    email: adminEmail,
    passwordHash: await hashPassword(adminPassword),
    role: UserRole.Admin,
    isActive: true
  });

  const sales = await UserModel.create({
    name: 'Sales User',
    email: 'sales@smartleads.io',
    passwordHash: await hashPassword('SalesPass123!'),
    role: UserRole.Sales,
    isActive: true
  });

  const leads = [
    {
      name: 'Ariana West',
      email: 'ariana@example.com',
      status: LeadStatus.New,
      source: LeadSource.Website,
      ownerId: admin._id
    },
    {
      name: 'Jordan Pike',
      email: 'jordan@example.com',
      status: LeadStatus.Contacted,
      source: LeadSource.Instagram,
      ownerId: admin._id
    },
    {
      name: 'Maya Abbott',
      email: 'maya@example.com',
      status: LeadStatus.Qualified,
      source: LeadSource.Referral,
      ownerId: sales._id
    },
    {
      name: 'Nico Carter',
      email: 'nico@example.com',
      status: LeadStatus.Lost,
      source: LeadSource.Website,
      ownerId: sales._id
    }
  ];

  await LeadModel.insertMany(leads);

  logger.info('Seed data created');
  process.exit(0);
};

seed().catch((error: unknown) => {
  logger.error({ err: error }, 'Seed failed');
  process.exit(1);
});
