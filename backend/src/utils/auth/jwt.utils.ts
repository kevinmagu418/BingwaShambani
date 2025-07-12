import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in .env');
}