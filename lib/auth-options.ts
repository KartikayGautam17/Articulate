import axios from "axios";
import { AuthOptions } from "next-auth";

import DiscordProvider from "next-auth/providers/discord";

import GithubProvider from "next-auth/providers/github";
import prisma from "./prisma-adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getUserIdbyEmail } from "@/app/utility/fetch";
import { User } from "@prisma/client";

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
          throw new Error("User Id is undefined");
        }
      }
      if (session.user.name && session.user.image && session.user.email) {
        try {
          const UserProfile = await prisma.profile.findUnique({
            where: {
              userId: session.user.id as string,
            },
          });
          if (!UserProfile) {
            const profile = await prisma.profile.create({
              data: {
                name: session.user.name,
                userId: session.user.id as string,
                image: session.user.image,
                description: "Hello I am " + session.user.name,
              },
            });
          }
        } catch (error) {
          throw new Error("Error creating user profile");
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
