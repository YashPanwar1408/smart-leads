import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { AppError } from '../utils/errors.js';

type Target = 'body' | 'params' | 'query';

export const validate = (schema: z.ZodSchema<unknown>, target: Target) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      throw new AppError('Validation error', 400, 'VALIDATION_ERROR', fieldErrors);
    }

    (req as unknown as Record<string, unknown>)[target] = result.data;
    next();
  };
};
