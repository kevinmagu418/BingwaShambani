import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { ENV } from '../../config/env.js';

const secret = ENV.jwtSecret;
if (!secret) throw new Error('Missing JWT_SECRET in env');


const key = new TextEncoder().encode(secret); // converts to Uint8Array


export interface TokenPayload extends JWTPayload {
  sub: string;   // user id  subject convention
  role: string;  // user role
}
export class JwtUtil {
  /**
   * Sign a JWT with the given payload.
   * @param payload - user id, role, etc.
   * @param exp - expiry (e.g. '15m', '8h', 604800 for 7d in seconds)
   */
  static async sign(payload: TokenPayload, exp: string | number = '96h'): Promise<string> {
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
  static async verify(token: string): Promise<TokenPayload | null> {
    try {
      const { payload } = await jwtVerify<TokenPayload>(token, key);
      return payload;
    } catch {
      return null;
    }
}

}