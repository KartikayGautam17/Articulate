"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconBrandGithubFilled,
  IconBrandDiscordFilled,
} from "@tabler/icons-react";
import { useEffect } from "react";
export default function AuthPage() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);
  const HandleSocialSignIn = async (social: "discord" | "github") => {
    await signIn(social, { redirect: false, callbackUrl: "/user" });
  };

  return (
    <div className="w-full h-[100vh] flex justify-center">
      <Card className="w-[400px] h-fit mt-[150px]">
        <CardHeader>
          <CardTitle>Welcome to Articulate</CardTitle>
          <CardDescription>
            Sign in with either your github or discord account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              HandleSocialSignIn("discord");
            }}
            className="w-full text-gray-600 bg-white hover:bg-gray-400 hover:text-white border-2"
          >
            Discord <IconBrandDiscordFilled />
          </Button>
        </CardContent>
        <CardContent>
          <Button
            onClick={() => {
              HandleSocialSignIn("github");
            }}
            className="w-full text-gray-600 bg-white hover:bg-gray-400 hover:text-white border-2"
          >
            Github <IconBrandGithubFilled />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
