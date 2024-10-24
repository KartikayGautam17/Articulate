"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        <div>Home</div>
        <div>Welcome {session.data?.user?.email}</div>
        <button onClick={HandleSignOut}>Logout</button>
        <div>
          This is the home page which will show generic content for logged
          in/out individuals in the future
        </div>
      </div>
    );
  }
}
