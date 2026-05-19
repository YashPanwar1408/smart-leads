import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';
import type { RequestHandler } from 'express';

import { env } from './config/env.js';
import { logger } from './config/logger.js';

const require = createRequire(import.meta.url);
const pinoHttp = require('pino-http') as (options: { logger: typeof logger }) => RequestHandler;
import { authenticate } from './middlewares/auth.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/not-found.middleware.js';
import { rateLimiter } from './middlewares/rate-limit.middleware.js';
import { setRequestId } from './middlewares/request-id.middleware.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { leadRoutes } from './modules/leads/lead.routes.js';

const app = express();

app.use(setRequestId);
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true
  })
);
app.use(rateLimiter);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

const swaggerPath = path.join(process.cwd(), 'swagger', 'openapi.json');
if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8')) as object;
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leads', authenticate, leadRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
