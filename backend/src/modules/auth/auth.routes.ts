import { Router } from 'express';

import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { authController } from './auth.controller.js';
import { loginSchema, registerSchema } from './auth.validator.js';

const router = Router();

router.post('/register', validate(registerSchema, 'body'), authController.register);
router.post('/login', validate(loginSchema, 'body'), authController.login);
router.get('/me', authenticate, authController.me);

export const authRoutes = router;
