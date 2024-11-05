import axios from "axios";
import { AuthOptions } from "next-auth";

import DiscordProvider from "next-auth/providers/discord";

import GithubProvider from "next-auth/providers/github";
import prisma from "./prisma-adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getUserIdbyEmail } from "@/app/utility/fetch";
import { User } from "@prisma/client";

export const utilUserIdbyEmail = async (email: string) => {
  const response = await getUserIdbyEmail({ email });

  if (!response.success) {
    console.error("NOT SUCCESS *------*");
    return { error: response.error, reason: response.reason };
  }
  return { user: response.data as User };
};

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
      if (session.user.email) {
        const User = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });
        if (User) {
          session.user.id = User.id;
        } else {
          session.user.id = undefined;
        }
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 2592000,
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
      id: string | null | undefined;
    };
  }
}
