import { Request, Response } from 'express';

import { created, ok } from '../../utils/api-response.js';
import { asyncHandler } from '../../utils/async-handler.js';
import { AppError } from '../../utils/errors.js';
import { authService } from './auth.service.js';
import type { LoginInput, RegisterInput } from './auth.dto.js';

export const authController = {
  register: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input = req.body as RegisterInput;
    const result = await authService.register(input);
    created(res, result);
  }),
  login: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input = req.body as LoginInput;
    const result = await authService.login(input);
    ok(res, result);
  }),
  me: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }
    const user = await authService.me(req.user.id);
    ok(res, user);
  })
};
