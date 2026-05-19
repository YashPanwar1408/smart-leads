import { authRepository } from './auth.repository.js';
import type { AuthResult, LoginInput, RegisterInput } from './auth.dto.js';
import { UserRole } from '../../types/enums.js';
import { AppError } from '../../utils/errors.js';
import { comparePassword, hashPassword } from '../../utils/password.js';
import { signAccessToken } from '../../utils/jwt.js';
import type { SafeUser } from '../../types/auth.js';

const toSafeUser = (user: {
  _id: unknown;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}): SafeUser => {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

export const authService = {
  register: async (input: RegisterInput): Promise<AuthResult> => {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) {
      throw new AppError('Email already in use', 409, 'EMAIL_EXISTS');
    }

    const passwordHash = await hashPassword(input.password);
    const user = await authRepository.createUser({
      name: input.name,
      email: input.email,
      passwordHash,
      role: UserRole.Sales
    });

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user: toSafeUser(user),
      accessToken
    };
  },
  login: async (input: LoginInput): Promise<AuthResult> => {
    const user = await authRepository.findByEmail(input.email, true);
    if (!user) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const isValid = await comparePassword(input.password, user.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user: toSafeUser(user),
      accessToken
    };
  },
  me: async (userId: string): Promise<SafeUser> => {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    return toSafeUser(user);
  }
};
