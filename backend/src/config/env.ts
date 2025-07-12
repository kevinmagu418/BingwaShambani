// src/config/env.ts
import dotenv from 'dotenv';
dotenv.config();

/** Typed helper so other modules get the right values */
export const ENV = {
  nodeEnv:  process.env.NODE_ENV || 'development',
  port:     Number(process.env.PORT) || 3001,

  // SMTP (Gmail App‑Password)
  smtpHost: process.env.SMTP_HOST!,
  smtpPort: Number(process.env.SMTP_PORT) || 465,
  smtpUser: process.env.SMTP_USER!,
  smtpPass: process.env.SMTP_PASS!,

  emailFrom: process.env.EMAIL_FROM!,
  frontendBaseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
  // Auth
  jwtSecret: process.env.JWT_SECRET!,
};
