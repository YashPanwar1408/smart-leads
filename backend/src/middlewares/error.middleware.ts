import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { logger } from '../config/logger.js';
import { ApiResponse } from '../types/api.js';
import { AppError } from '../utils/errors.js';

const mapToAppError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof jwt.TokenExpiredError) {
    return new AppError('Token expired', 401, 'TOKEN_EXPIRED');
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return new AppError('Invalid token', 401, 'INVALID_TOKEN');
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return new AppError('Validation error', 400, 'MONGOOSE_VALIDATION_ERROR');
  }

  if (error instanceof mongoose.Error.CastError) {
    return new AppError('Invalid identifier', 400, 'INVALID_ID');
  }

  if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
    return new AppError('Duplicate value', 409, 'DUPLICATE_KEY');
  }

  return new AppError('Internal server error', 500, 'INTERNAL_ERROR');
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const appError = mapToAppError(error);

  if (appError.statusCode >= 500) {
    logger.error({ err: error }, 'Unhandled error');
  }

  const response: ApiResponse<null> = {
    success: false,
    data: null,
    meta: { requestId: res.locals.requestId as string | undefined },
    error: {
      code: appError.code,
      message: appError.message,
      details: appError.details
    }
  };

  res.status(appError.statusCode).json(response);
};
