import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        console.log("🔵 GitHub Profile Data:", profile);
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          githubId: profile.id.toString(),
        };
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      console.log("📥 Sign In Callback:");
      console.log("- User:", user);
      console.log("- Account:", account);
      console.log("- Profile:", profile);
      return true;
    },
    session: async ({ session, user, token }) => {
      console.log("🔑 Session Callback:");
      console.log("- Original Session:", { ...session });
      console.log("- User:", user);
      console.log("- Token:", token);
      if (session?.user && user?.id) {
        session.user.id = user.id;
        console.log("- Updated Session:", { ...session });
      }
      return session;
    },
    jwt: async ({ token, user, account, trigger }) => {
      console.log("🎫 JWT Callback:");
      console.log("- Original Token:", { ...token });
      console.log("- User:", user);
      console.log("- Account:", account);
      console.log("- Trigger:", trigger);
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  events: {
    async signIn(message) {
      console.log("✨ Sign In Event:", message);
    },
    async signOut(message) {
      console.log("👋 Sign Out Event:", message);
    },
    async createUser(message) {
      console.log("➕ Create User Event:", message);
    },
    async linkAccount(message) {
      console.log("🔗 Link Account Event:", message);
    },
    async session(message) {
      console.log("📍 Session Event:", message);
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
} satisfies NextAuthOptions;
