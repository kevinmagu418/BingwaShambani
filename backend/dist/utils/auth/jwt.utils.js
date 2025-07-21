import { SignJWT, jwtVerify } from 'jose';
import { ENV } from '../../config/env.js';
const secret = ENV.jwtSecret;
if (!secret)
    throw new Error('Missing JWT_SECRET in env');
const key = new TextEncoder().encode(secret); // converts to Uint8Array
export class JwtUtil {
    /**
     * Sign a JWT with the given payload.
     * @param payload - user id, role, etc.
     * @param exp - expiry (e.g. '15m', '8h', 604800 for 7d in seconds)
     */
    static async sign(payload, exp = '96h') {
        return new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime(exp)
            .sign(key);
    }
    /**
       * Verify a JWT.
       * @param token - the JWT to verify
       * @returns the decoded payload or null if invalid
       */
    static async verify(token) {
        try {
            const { payload } = await jwtVerify(token, key);
            return payload;
        }
        catch {
            return null;
        }
    }
}
