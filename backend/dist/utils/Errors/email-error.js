// src/utils/Errors/email-error.ts
import { APIError, STATUS_CODE } from './app-error.js';
export class EmailError extends APIError {
    constructor(description = 'E‑mail service unavailable', cause) {
        super('EMAIL_ERROR', STATUS_CODE.INTERNAL_ERROR, description);
        if (cause)
            this.cause = cause;
    }
}
