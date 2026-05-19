import mongoose from 'mongoose';

import { env } from './env.js';
import { logger } from './logger.js';

export const connectDb = async (): Promise<void> => {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error(
      {
        err: error,
        mongoUriHost: env.MONGO_URI.replace(/\/\/([^@]+@)?/, '//***@').split('?')[0]
      },
      'MongoDB connection failed'
    );

    if (env.MONGO_URI.includes('localhost') || env.MONGO_URI.includes('127.0.0.1')) {
      throw new Error(
        'Cannot connect to MongoDB on localhost. On Render, set MONGO_URI to your MongoDB Atlas connection string (not localhost).'
      );
    }

    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('querySrv') || message.includes('ENOTFOUND')) {
      throw new Error(
        'MongoDB DNS lookup failed. Fix your MONGO_URI on Render: (1) Re-copy the full string from Atlas → Connect → Drivers. (2) URL-encode special characters in the password (@ → %40, # → %23). (3) Ensure there is exactly one @ before the cluster hostname (cluster0....mongodb.net).'
      );
    }

    throw error;
  }
};
