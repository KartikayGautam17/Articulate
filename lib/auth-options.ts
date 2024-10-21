import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import RedditProvider from "next-auth/providers/reddit";
//gonna add reddit provider as well

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
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
