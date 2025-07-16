// =======================================
// File: src/server/services/GoogleAuthService.ts
// =======================================
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findTenantByGoogleId, createTenantFromGoogle } from "../repositories/TenantRepo";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config/env.server";
import type { TenantRow } from "@server/models/Tenant";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        let tenant = await findTenantByGoogleId(googleId);

        if (!tenant) {
          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(new Error("Email do Google não encontrado."));
          }

          tenant = await createTenantFromGoogle({
            google_id: googleId,
            nome_empresa: profile.displayName,
            email: email,
            logo_url: profile.photos?.[0]?.value,
          });
        }

        return done(null, tenant);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize para sessão
passport.serializeUser(
  (user: TenantRow, done: (err: Error | null, id?: string) => void): void => {
    done(null, user.tenant_id);
  }
);

passport.deserializeUser(
  async (
    tenant_id: string,
    done: (err: Error | null, user?: TenantRow | false | null) => void
  ): Promise<void> => {
    try {
      const tenant = await findTenantByGoogleId(tenant_id);
      done(null, tenant || false); // false para indicar "não autenticado"
    } catch (err) {
      done(err as Error);
    }
  }
);

export default passport;
