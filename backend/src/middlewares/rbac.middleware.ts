import { NextFunction, Request, Response } from 'express';

import { UserRole } from '../types/enums.js';
import { AppError } from '../utils/errors.js';

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Forbidden', 403, 'FORBIDDEN');
    }

    next();
  };
};
