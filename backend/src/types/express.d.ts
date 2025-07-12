// src/types/express.d.ts
import '@types/express-serve-static-core';
import { TokenPayload } from  '../utils/auth/jwt.utils';

declare module 'express-serve-static-core' {
  interface Request {
    /** Populated by auth middleware once token is validated */
    user?: TokenPayload;
  }
}
