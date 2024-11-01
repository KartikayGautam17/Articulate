import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import GithubProvider from "next-auth/providers/github";
import prisma from "./prisma-adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_ID as string,
      clientSecret: process.env.GITHUB_APP_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_APP_ID as string,
      clientSecret: process.env.DISCORD_APP_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      session.user.id = "Your Custom Object";
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
      id: string | null;
    };
  }
}
