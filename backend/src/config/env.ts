import dotenv from 'dotenv';
import { z } from 'zod';

import { assertValidMongoUri } from './mongo-uri.js';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string().default('15m'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.string().default('info'),
  ADMIN_NAME: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

const data = parsed.data;

assertValidMongoUri(data.MONGO_URI);

if (data.NODE_ENV === 'production') {
  const isLocalMongo =
    data.MONGO_URI.includes('localhost') ||
    data.MONGO_URI.includes('127.0.0.1') ||
    data.MONGO_URI.startsWith('mongodb://127.0.0.1');

  if (isLocalMongo) {
    throw new Error(
      'MONGO_URI cannot point to localhost in production. Create a free MongoDB Atlas cluster and set MONGO_URI to your Atlas connection string in Render Environment variables.'
    );
  }
}

export const env = data;
