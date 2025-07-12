// src/utils/Errors/email-error.ts
import { APIError, STATUS_CODE } from './app-error';

export class EmailError extends APIError {
  constructor(
    description = 'E‑mail service unavailable',
    cause?: unknown   
  ) {
    super('EMAIL_ERROR', STATUS_CODE.INTERNAL_ERROR, description);
    
    if (cause) (this as any).cause = cause;
  }
}
