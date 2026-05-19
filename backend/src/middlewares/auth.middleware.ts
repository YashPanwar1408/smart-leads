import { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/errors.js';
import { asyncHandler } from '../utils/async-handler.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    const token = authHeader.slice('Bearer '.length).trim();
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };

    next();
  }
);
