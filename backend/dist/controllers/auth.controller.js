import { userService } from '../services/UserServices.js';
import { userHelper } from '../utils/auth/UserHelper.js';
import { JwtUtil } from '../utils/auth/jwt.utils.js';
import { CookieUtil } from '../utils/auth/cookieutils.js';
export const authController = {
    // --- Email registration ---
    async registerEmail(req, res, next) {
        try {
            userHelper.assertStrong(req.body.password);
            const user = await userService.registerEmail(req.body);
            const token = await JwtUtil.sign({ sub: user.id, role: user.role });
            CookieUtil.setAuthCookie(res, token);
            res.status(201).json({ success: true, user });
        }
        catch (err) {
            next(err);
        }
    },
    //-verify email
    async verifyEmail(req, res, next) {
        try {
            const { code } = req.body;
            const user = await userService.verifyEmailCode(code);
            res.status(200).json({ message: 'Email verified successfully', user });
        }
        catch (err) {
            next(err); // pass to global error handler
        }
    },
    // --- Email login ---
    async login(req, res, next) {
        try {
            const user = await userService.validatePassword(req.body.email, req.body.password);
            if (!user)
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            const token = await JwtUtil.sign({ sub: user.id, role: user.role });
            CookieUtil.setAuthCookie(res, token);
            res.status(200).json({ success: true, user });
        }
        catch (err) {
            next(err);
        }
    },
    // --- GitHub OAuth success redirect handler ---
    async githubCallback(req, res) {
        const user = req.user;
        const token = await JwtUtil.sign({ sub: user.id, role: user.role });
        CookieUtil.setAuthCookie(res, token);
        // Redirect to frontend
        res.redirect(`${process.env.FRONTEND_BASE_URL}/dashboard`);
    },
    // --- Logout ---
    logout(_req, res) {
        CookieUtil.clearAuthCookie(res);
        res.status(200).json({ success: true, message: 'Logged out' });
    },
    async googleCallback(req, res) {
        const user = req.user;
        const token = await JwtUtil.sign({ sub: user.id, role: user.role });
        CookieUtil.setAuthCookie(res, token);
        res.redirect(`${process.env.FRONTEND_BASE_URL}/dashboard`);
    },
};
