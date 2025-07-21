// src/utils/asyncHandler.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

/** Wrap an async controller so rejected Promises hit Express error handler */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler =>
  (req, res, next) =>
    fn(req, res, next).catch(next);
