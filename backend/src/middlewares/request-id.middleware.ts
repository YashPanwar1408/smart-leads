import { randomUUID } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';

export const setRequestId = (_req: Request, res: Response, next: NextFunction): void => {
  const requestId = randomUUID();
  res.locals.requestId = requestId;
  res.setHeader('x-request-id', requestId);
  next();
};
