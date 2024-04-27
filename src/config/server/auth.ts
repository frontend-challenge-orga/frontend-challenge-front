import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { CustomPrismaAdapter } from "@/config/server/custom-prisma-adapter";
import GithubProvider from "next-auth/providers/github";

import { env } from "@/config/env";
import { db } from "@/config/server/db";
import type { Subscription } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: User["role"];
      subscribed: boolean;
      subscription_duration: Subscription["subscription_duration"];
      credit_challenge_amount: number;
      credit_design_amount: number;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: "USER" | "COLLABORATOR" | "ADMIN";
    subscription: Subscription;

    credit: { challenge_amount: number; design_amount: number };
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,

      user: {
        ...session.user,
        id: user.id,
        role: user.role ?? "USER",
        subscribed: user.subscription?.subscribed,
        subscription_duration: user.subscription?.subscription_duration,
        credit_challenge_amount: user.credit.challenge_amount ?? 0,
        credit_design_amount: user.credit.design_amount ?? 0,
      },
    }),
  },
  adapter: CustomPrismaAdapter(db) as Adapter,
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
