import jwt, { type SignOptions } from 'jsonwebtoken';

import { env } from '../config/env.js';
import { JwtPayload } from '../types/auth.js';

export const signAccessToken = (payload: JwtPayload): string => {
  const options: SignOptions = { expiresIn: env.JWT_ACCESS_TTL as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
};
