// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { JwtUtil } from '../utils/auth/jwt.utils.js';


export const auth: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.Bingwa_token;
  if (!token) {
    res.status(401).json({ message: 'Not authenticated' });
    return;                      // <-- ensures return type void
  }

  const payload = await JwtUtil.verify(token);
  if (!payload) {
    res.status(403).json({ message: 'Token invalid or expired' });
    return;                      
  }

  req.user = payload;         
  next();                        // returns void
};
