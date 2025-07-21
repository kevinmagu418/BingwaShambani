import { getVerificationEmailTemplate, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, } from './EmailTemplate.js';
import { mailTransport } from './mailer.js';
import { ENV } from '../../config/env.js';
import { EmailError } from '../Errors/email-error.js';
const send = async (to, subject, html) => {
    try {
        return await mailTransport.sendMail({
            from: ENV.emailFrom,
            to,
            subject,
            html,
        });
    }
    catch (err) {
        console.error('Mail send failed:', err);
        throw new EmailError('Failed to send email', err);
    }
};
export async function sendVerificationEmail(email, name, code) {
    const verificationCode = code;
    const html = getVerificationEmailTemplate(name, verificationCode);
    await send(email, 'Verify your Bingwa Shambani account', html);
}
export async function sendWelcomeEmail(email, name) {
    const html = WELCOME_EMAIL_TEMPLATE.replace('{name}', name);
    await send(email, 'Karibu Bingwa Shambani', html);
}
export async function sendPasswordResetRequestEmail(email, name, resetUrl) {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE
        .replace('{name}', name)
        .replace('{resetURL}', resetUrl);
    await send(email, 'Reset your Bingwa Shambani password', html);
}
export async function sendPasswordResetSuccessEmail(email, name) {
    const html = PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{name}', name);
    await send(email, 'Your Bingwa Shambani password was reset', html);
}
