// src/utils/auth/tokenGenerator.ts
import crypto from 'crypto';
export class TokenGenerator {
    /** Generate random 6-digit email verification code */
    static generateVerificationCode() {
        return crypto.randomInt(100000, 999999).toString();
    }
    static generateExpiry(minutes = 15) {
        return new Date(Date.now() + minutes * 60 * 1000);
    }
    /** Generate a secure random token for password reset, email verification, etc. */
    static generateToken(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
}
