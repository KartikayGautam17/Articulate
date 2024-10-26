"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Navbar } from "./ui/navbar/navbar";
import { createPost } from "./utility/action";
// For the moment being I am making the home page as protected,
// I will change this in future in order for unauthenticated users to view the
// general posts as well. This is to implement session checking with next-auth for now.

export default function Home() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login/");
    }
  }, [session]);
  if (session.status === "loading") {
    return <div>Loading</div>;
  } else if (session.status === "authenticated") {
    const HandleSignOut = async () => {
      await signOut({ redirect: false, callbackUrl: "/login" });
      // router.push("/login/");
    };

    return (
      <div>
        <Navbar />
      </div>
    );
  }
}
