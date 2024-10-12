import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./lib/db";

const providers = [
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  }),
];

export const providerMap = providers
  .map((provider) => {
    return { id: provider.id, name: provider.name };
  })
  .filter((provider) => provider.id !== "credentials");

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  providers,
  pages: {
    signIn: "/auth/sign-in",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      console.log("token is ", token);
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.image = token.picture;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
};
