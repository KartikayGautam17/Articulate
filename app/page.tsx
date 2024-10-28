"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "./ui/navbar/navbar";
import { Sidebar } from "./ui/sidebar/sidebar";
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
        <Sidebar />
      </div>
    );
  }
}
