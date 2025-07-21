import passport from 'passport';
// Import Google OAuth 2.0 strategy & profile interface
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ENV } from '../../config/env.js';
import { userService } from '../../services/UserServices.js';
import { Role } from '../../domain/userDTO.js';
passport.use(new GoogleStrategy({
    //Google‑issued credentials 
    clientID: ENV.googleClientId, // GOOGLE_CLIENT_ID in .env
    clientSecret: ENV.googleClientSecret, // GOOGLE_CLIENT_SECRET in .env
    // Where Google should send the user back
    callbackURL: `${ENV.backendBaseUrl}/auth/google/callback`, // must match value in Google console
    // Data we want from Google
    scope: ['profile', 'email'], // openid scopes; email is verified
}, async (_accessToken, // we ignore tokens (keep stateless)
_refreshToken, profile, // user info from Google
done) => {
    try {
        /* xtract a usable, verified e‑mail */
        const email = profile.emails?.[0].value; // Google guarantees at least one
        /*  Build a DTO for service layer */
        const dto = {
            username: `gl_${profile.id}`, // unique username
            firstName: profile.name?.givenName ?? profile.displayName,
            lastName: profile.name?.familyName ?? '',
            email,
            role: Role.farmer, // default role
            provider: 'google', // discriminate provider
            providerUserId: profile.id, // Google "sub"
            isVerified: true, // we trust Google
        };
        /*  Find or create User + link OAuthAccount */
        const user = await userService.findOrCreateOAuth(dto);
        /*  Hand the User object back to Passport */
        done(null, user);
    }
    catch (err) {
        /* If anything fails, tell Passport */
        done(err);
    }
})); // end of passport.use(...)
