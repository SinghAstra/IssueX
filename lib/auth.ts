import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: [
            "read:user",
            "user:email",
            "repo",
            "write:discussion",
            "admin:repo_hook",
            "admin:org_hook",
          ].join(" "),
        },
      },
      profile(profile) {
        console.log("🔵 GitHub Profile Data:", profile);
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          githubUsername: profile.login,
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

      if (session.user) {
        session.user.id = token.id as string;
        session.user.githubUsername = token.githubUsername;
      }

      session.accessToken = token.accessToken;

      return session;
    },
    jwt: async ({ token, user, account, profile }) => {
      console.log("🎫 JWT Callback:");
      console.log("- Original Token:", { ...token });
      console.log("- User:", user);
      console.log("- Account:", account);
      console.log("- Profile:", profile);

      if (profile && account?.provider === "github") {
        const githubProfile = profile as GithubProfile;
        console.log("githubProfile is ", githubProfile);
        token.githubUsername = githubProfile.login;
      }

      if (user) {
        token.id = user.id;
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
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
