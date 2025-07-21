// src/config/env.ts//envloader
import dotenv from 'dotenv';
dotenv.config();
/** Typed helper so other modules get the right values */
export const ENV = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3001,
    // SMTP (Gmail App‑Password)
    smtpHost: process.env.SMTP_HOST,
    smtpPort: Number(process.env.SMTP_PORT) || 465,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    emailFrom: process.env.EMAIL_FROM,
    frontendBaseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
    // Auth
    jwtSecret: process.env.JWT_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    backendBaseUrl: process.env.BACKEND_BASE_URL || 'http://localhost:3001',
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};
// why use an env loader  smtpUser: process.env.SMTP_USER! – the ! or a manual check throws on boot, not at runtime after you deploy.Need the frontend URL? Import ENV.frontendBaseUrl anywhere.
//Cleaner imports	import { ENV } from '@/config/env';
//Provide fallback ,
