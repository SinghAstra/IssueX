import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      githubUsername?: string;
    };
    accessToken?: string;
  }

  interface Token {
    id?: string;
    accessToken?: string;
    githubUsername?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    githubUsername?: string;
  }
}
