import { Router } from 'express';
import passport from 'passport';
import { authController } from '../controllers/auth.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const authRouter = Router();
// Email/password routes
authRouter.post('/register', authController.registerEmail);
authRouter.post('/login', asyncHandler(authController.login));
authRouter.post('/logout', authController.logout);
authRouter.post('/verify-email', authController.verifyEmail);
// GitHub OAuth routes
authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));
authRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/', session: false }), authController.githubCallback);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), authController.googleCallback);
export default authRouter;
//session  set to false ,  allows one to stay stateless and use  recommended   for jwt cookie flow  Keep passport.initialize() only (no passport.session() middleware.
//get-read data
//post -crate  or trigger an action
//put -full update ,replace  a resource
//patch- modify part of a resource
// Delete- delete a resource
// why post, coz its an action ,not a resource update, ur triggering  actions  that are more than just updating user fields
