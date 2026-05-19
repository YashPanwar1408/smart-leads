import { Response } from 'express';

import type { ApiMeta, ApiResponse } from '../types/api.js';

export const ok = <T>(res: Response, data: T, meta?: ApiMeta): Response<ApiResponse<T>> => {
  const requestId = res.locals.requestId as string | undefined;
  const mergedMeta: ApiMeta = { requestId, ...meta };

  return res.status(200).json({
    success: true,
    data,
    meta: mergedMeta,
    error: null
  });
};

export const created = <T>(
  res: Response,
  data: T,
  meta?: ApiMeta
): Response<ApiResponse<T>> => {
  const requestId = res.locals.requestId as string | undefined;
  const mergedMeta: ApiMeta = { requestId, ...meta };

  return res.status(201).json({
    success: true,
    data,
    meta: mergedMeta,
    error: null
  });
};
