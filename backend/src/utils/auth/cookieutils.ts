// src/utils/auth/cookie.util.ts
import { Response } from 'express';

const COOKIE_NAME = 'Bingwa_token';
const isProd = process.env.NODE_ENV === 'production';
const DEFAULT_AGE = 96* 60 * 60 * 1000; // 96hrs

export class CookieUtil {
  static setAuthCookie(res: Response, token: string, maxAge = DEFAULT_AGE) {
    res.cookie(COOKIE_NAME, token, {
      httpOnly : true,
      sameSite : 'strict',
      secure   : isProd,
      maxAge,
    });
  }

  static clearAuthCookie(res: Response) {
    res.clearCookie(COOKIE_NAME, {
      httpOnly : true,
      sameSite : 'strict',
      secure   : isProd,
    });
  }
}
