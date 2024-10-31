"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "./ui/navbar/navbar";
import { Sidebar } from "./ui/sidebar/sidebar";
import { Postswindow } from "./ui/posts/post-window";
import { ProfilePlaceHolder } from "./ui/profile/profile-placeholder";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  if (session.status === "loading") {
    return <div>Loading</div>;
  } else if (session.status === "authenticated") {
    const HandleSignOut = async () => {
      await signOut({ redirect: false, callbackUrl: "/login" });
      // router.push("/login/");
    };

    return (
      <div className="overflow-hidden">
        <Navbar />
        <div className="w-full flex mContainer justify-between">
          <Sidebar />
          <Postswindow />
          <ProfilePlaceHolder />
        </div>
      </div>
    );
  }
}
