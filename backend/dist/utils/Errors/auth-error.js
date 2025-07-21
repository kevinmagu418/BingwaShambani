// src/utils/Errors/auth-error.ts
import { APIError, STATUS_CODE } from "./app-error.js";
APIError;
export class AuthError extends APIError {
    constructor(description = 'Authentication failed') {
        super('AUTH_ERROR', STATUS_CODE.UNAUTHORIZED, description);
    }
}
