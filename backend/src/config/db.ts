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

    throw error;
  }
};
