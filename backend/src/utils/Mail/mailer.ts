// src/lib/mailer.ts
import nodemailer from 'nodemailer';
import { ENV } from '../../config/env';


/** One transporter for the whole app */
export const mailTransport = nodemailer.createTransport({
  host:   ENV.smtpHost,
  port:   ENV.smtpPort,
  secure: true, // because port 465 (SSL)
  auth: {
    user: ENV.smtpUser,
    pass: ENV.smtpPass,
  },
});
