import passport from 'passport';// import central instance of passport to github
import { Strategy as GitHubStrategy,Profile as GitHubProfile} from 'passport-github2';//OAuth 2 strategy for GitHub; we alias it to GitHubStrategy.
import { OAuthRegisterDTO } from '../../domain/userDTO.js';
import { ENV } from '../../config/env.js';
import { userService } from '../../services/UserServices.js';
import { Role } from '../../domain/userDTO.js';

//Register the github strategy with passport
passport.use(
    
    
new GitHubStrategy({

//options object
  clientID:ENV.githubClientId,   // from .env
  clientSecret:ENV.githubClientSecret ,
  callbackURL:`${ENV.backendBaseUrl}/auth/github/callback`,
  scope: ['user:email'],
},

async (
      accessToken: string,
      refreshToken: string,
      profile: GitHubProfile,
      done: (error: any, user?: Express.User | false | null) => void
    ) => {
      try {
        const email =
          profile.emails?.[0]?.value ??
          `${profile.username}@users.noreply.github.com`;

        const dto: OAuthRegisterDTO = {
          username:        `gh_${profile.id}`,
          firstName:       profile.displayName ?? profile.username,
          lastName:        '',
          email,
          role:            Role.farmer,
          provider:        'github',
          providerUserId:  profile.id,
          isVerified:      true,
        };

        const user = await userService.findOrCreateOAuth(dto);
        done(null, user);
      } catch (err) {
        done(err as Error);
      }
    }


))
/**
 * GitHub OAuth Strategy (Passport)
 * Flow
 *   1.  GET /auth/github               →  this strategy redirects
 *   2.  User grants consent on GitHub
 *   3.  GitHub redirects browser back to:
 *          {ENV.backendBaseUrl}/auth/github/callback
 *   4.  Passport exchanges ?code for profile, runs this verify
 *   5.  We:
 *        • pick a usable e‑mail
 *        • call userService.findOrCreateOAuth(…)
 *        • receive a User row (existing or new)
 *   6.  `done(null, user)` passes control to the route handler
 *   7.  Route signs JWT with JwtUtil, drops it into HttpOnly cookie,
 *      then redirects to the frontend (/oauth-success or /dashboard)
 *
 * Key decisions
 *   • We *never* store GitHub access tokens, only link IDs.
 *   • username is prefixed with "gh_" to avoid clashes.
 *   • We try to reuse an existing User that has the same e‑mail,
 *     then link the GitHub account (prevents duplicates).
 *   • `isVerified` is set true because GitHub validated the e‑mail.
 *
 * ENV required
 *   GITHUB_CLIENT_ID        GitHub OAuth‑app client id
 *   GITHUB_CLIENT_SECRET    GitHub OAuth‑app secret
 *   BACKEND_BASE_URL        e.g. http://localhost:3001
 *
 * Related files
 *   • routes/auth.routes.ts     mounts /auth/github* paths
 *   • services/user.service.ts  findOrCreateOAuth logic
 *   • utils/jwt.util.ts         JOSE helpers
 *   • utils/cookie.util.ts      cookie helpers
 *
 * To add another provider (Google, etc.), copy this file,
 * change Strategy import + provider strings, keep
 * userService.findOrCreateOAuth inta
 */
