/*  email sends*/

import {
  getVerificationEmailTemplate,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from './EmailTemplate';            // path to the file that holds your template literals
import { ENV } from '../../config/env';
import { mailTransport } from './mailer';
import { EmailError } from '../Errors/email-error';
  // Central helper — every email in the app calls this.
  // It guarantees consistent "from" address and error type
const send = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    // Nodemailer call
    return await mailTransport.sendMail({
      from: ENV.emailFrom,  
      to,
      subject,
      html,
    });
  } catch (err) {
    // Optional server-side log
    console.error('Mail send failed:', err);

    // Re‑throw as your app’s custom error
    throw new EmailError('Failed to send email', err);
  }
};
/*  Verification */
export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationToken: string
) {
  const link = `${ENV.frontendBaseUrl}/verify-email?token=${verificationToken}`; // or your API URL
  const html = getVerificationEmailTemplate(name, link);
  await send(email, 'Verify your Bingwa Shambani account', html);
}

/*  Welcome  */
export async function sendWelcomeEmail(email: string, name: string) {
  const html = WELCOME_EMAIL_TEMPLATE.replace('{name}', name);
  await send(email, 'Karibu Bingwa Shambani ', html);
}

/* Password‑reset request */
export async function sendPasswordResetRequestEmail(
  email: string,
  name: string,
  resetUrl: string
) {
  const html = PASSWORD_RESET_REQUEST_TEMPLATE
    .replace('{name}', name)
    .replace('{resetURL}', resetUrl);
  await send(email, 'Reset your Bingwa Shambani password', html);
}

/*  Password‑reset success  */
export async function sendPasswordResetSuccessEmail(
  email: string,
  name: string
) {
  const html = PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{name}', name);
  await send(email, 'Your Bingwa Shambani password was reset', html);
}
/**
 * call await send(email, 'Karibu Bingwa Shambani', html);
 * email recepients email, subject,html
 * 
 */