/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Account, AuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";

import { logoutRequest, refreshTokenRequest } from "~/lib/auth/oidc";
import { encrypt } from "~/lib/utils/encryption";

export const authOptions: AuthOptions = {
  providers: [
    // Configure the Keycloak provider
    KeycloakProvider({
      clientId: process.env.OIDC_CLIENT_ID || "",
      clientSecret: process.env.OIDC_CLIENT_SECRET || "",
      issuer: process.env.OIDC_ISSUER,
      // Modify the user profile
      profile: (profile) => {
        profile.id = profile.sub;
        return profile;
      },
    }),
  ],
  events: {
    async signOut({ token }) {
      await logoutRequest(token.refresh_token);
    },
  },
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: Account | null;
      user: User | null;
    }) {
      // Handle JWT token creation and refreshing
      if (account && user) {
        // Update token with account information
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.access_token_expired =
          Date.now() + (account.expires_in - 15) * 1000;
        token.refresh_token_expired =
          Date.now() + (account.refresh_expires_in - 15) * 1000;
        token.user = user;
        return token;
      } else {
        try {
          // Send a post request to refresh the token
          const response = await refreshTokenRequest(token.refresh_token);
          const tokens = await response.data;
          if (response.status !== 200) throw tokens;
          // Update token with refreshed information
          return {
            ...token,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
            refresh_token_expired:
              tokens.refresh_expires_in ?? token.refresh_token_expired,
            expires_in: Math.floor(Date.now() / 1000 + tokens.expires_in),
            error: null,
          };
        } catch (e) {
          console.error(e);
          return null as unknown as JWT;
        }
      }
    },
    // Handle session information
    async session({ session, token }) {
      // Update session with user and access token information
      session.user = token.user;
      session.error = token.error;
      session.access_token = encrypt(token.access_token);
      return session;
    },
  },
};
