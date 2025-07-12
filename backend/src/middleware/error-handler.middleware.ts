import { APIError,STATUS_CODE } from '../utils/Errors/app-error';
import { Request, Response, NextFunction } from 'express';

const ErrorHandler = (
  err: APIError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);                   // server‑side log

  const statusCode =
    (err as APIError).statusCode || STATUS_CODE.INTERNAL_ERROR;

  const message =
    err.message || 'Internal Server Error';

  res.status(statusCode).json({               // uniform client response
    status : statusCode,
    message: message,
  });
};

export { ErrorHandler };
