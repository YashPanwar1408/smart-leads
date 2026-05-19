import { app } from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

const startServer = async (): Promise<void> => {
  await connectDb();

  app.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT}`);
  });
};

startServer().catch((error: unknown) => {
  logger.error({ err: error }, 'Failed to start server');
  process.exit(1);
});
