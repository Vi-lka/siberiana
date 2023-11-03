/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Account, AuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import type { ProviderType } from "next-auth/providers/index";
import KeycloakProvider from "next-auth/providers/keycloak";
import CredentialsProvider from "next-auth/providers/credentials";
import { logoutRequest, refreshTokenRequest, getToken, getUserInfo } from "~/lib/auth/oidc";
import { z } from "zod";
import type { AxiosResponse } from "axios";

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
    // Configure the Credentials provider
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

          if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data;
            const resToken = await getToken({ username, password }) as AxiosResponse<Account>;
            const account = resToken.data
            if (!account) throw new Error();
            
            const resUser = await getUserInfo(account.access_token) as AxiosResponse<User>;
            if (!resUser.data) throw new Error()

            resUser.data.id = resUser.data.sub

            const user = {
              account: account,
              ...resUser.data
            }

            return user
          }
   
          throw new Error();
      },
    }),
  ],
  events: {
    async signOut({ token }) {
      await logoutRequest(token.refresh_token);
    },
  },
  pages: {
    signIn: '/login'
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
        token.user = {
          account: account,
          ...user
        };
        return token;
      } else {
        try {
          // Send a post request to refresh the token
          const response = await refreshTokenRequest(token.user.account.refresh_token);
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
          throw new Error();
        }
      }
    },
    // Handle session information
    async session({ session, token }) {
      // Update session with user and access token information
      session.user = token.user;
      session.error = token.error;
      session.access_token = token.access_token;
      return session;
    },
  },
};

// Create NextAuth handler using the defined authentication options
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };

// Declare custom types for NextAuth modules
declare module "next-auth" {
  // Define custom session properties
  interface Session {
    user: {
      sub: string;
      email_verified: boolean;
      name: string;
      preferred_username: string;
      given_name: string;
      family_name: string;
      email: string;
      id: string;
      org_name?: string;
      telephone?: string;
      roles?: string[];
    };
    error?: string | null;
    access_token: string;
  }

  // Define custom user properties
  interface User {
    sub: string;
    email_verified: boolean;
    name: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email: string;
    id: string;
  }

  // Define custom account properties
  interface Account {
    provider: string;
    type: ProviderType;
    id: string;
    access_token: string;
    refresh_token: string;
    idToken: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    id_token: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
  }

  // Define custom profile properties
  interface Profile {
    sub?: string;
    email_verified: boolean;
    name?: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email?: string;
  }
}

// Declare custom JWT properties
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    refresh_expires_in: number;
    expires_in: number;
    user: {
      sub: string;
      email_verified: boolean;
      name: string;
      telephone: string;
      preferred_username: string;
      org_name: string;
      given_name: string;
      family_name: string;
      email: string;
      id: string;
      account: Account;
    };
    error?: string | null;
  }
}
