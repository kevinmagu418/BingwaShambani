// src/services/user.service.ts
import { PrismaUserRepository } from '../repositories/UserRepository.js';
import { TokenGenerator } from '../utils/auth/tokenGenerator.js';
import { userHelper } from '../utils/auth/UserHelper.js';
import { AuthError } from '../utils/Errors/auth-error.js';
import { EmailError } from '../utils/Errors/email-error.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../utils/Mail/sendMail.js';
const repo = new PrismaUserRepository();
export const userService = {
    /* ------- Email & password sign‑up -------- */
    async registerEmail(dto) {
        userHelper.assertStrong(dto.password); // throws error if weak
        const hashed = await userHelper.hashPassword(dto.password);
        const verificationCode = TokenGenerator.generateVerificationCode();
        const verificationExpiry = TokenGenerator.generateExpiry(15); // expires in 15 mins
        const User = await repo.createEmailUser({
            ...dto,
            password: hashed,
            code: verificationCode,
            verificationExpiry: verificationExpiry,
        });
        // 1. Send Verification Email
        try {
            await sendVerificationEmail(User.email, User.firstName, verificationCode);
        }
        catch (err) {
            // Log the error using  custom EmailError class
            throw new EmailError('Failed to send verification email', err);
        }
        return User;
    },
    async verifyEmailCode(code) {
        const user = await repo.findUserByVerificationCode(code);
        if (!user || user.isVerified)
            throw new AuthError('Invalid or already used verification code');
        const verifiedUser = await repo.verifyUserEmail(user.id); // updates `verified: true`
        //  Send Welcome Email
        try {
            await sendWelcomeEmail(user.email, user.firstName);
        }
        catch (err) {
            throw new EmailError('Failed to send welcome email', err);
        }
        return verifiedUser;
    },
    /* ------- Email login -------- */
    async validatePassword(email, plain) {
        const user = await repo.findByEmail(email);
        if (!user || !user.password)
            return null;
        const valid = await userHelper.comparePassword(plain, user.password);
        return valid ? user : null;
    },
    /*  GitHub / Google OAuth*/
    async findOrCreateOAuth(dto) {
        // (1) Check if account is already linked
        const linked = await repo.findOAuth(dto.provider, dto.providerUserId);
        if (linked)
            return linked.user;
        // (2) Try to find user by email
        let user = await repo.findByEmail(dto.email);
        if (!user) {
            user = await repo.createOAuthUser({
                ...dto,
            });
        }
        //  Link account if not already linked
        await repo.linkOAuthAccount(dto.provider, dto.providerUserId, user.id);
        return user;
    },
};
