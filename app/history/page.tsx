"use client";
import { useSession } from "next-auth/react";
import { Navbar } from "../ui/navbar/navbar";
import { Sidebar } from "../ui/sidebar/sidebar";
import { Postswindow } from "../ui/posts/post-window";
import { ProfilePlaceHolder } from "../ui/profile/profile-placeholder";

export default function Home() {
  const session = useSession();
  if (session.status === "loading") {
    return <div>Loading</div>;
  } else {
    return (
      <div className="overflow-hidden">
        <Navbar id={session.data?.user.id} />
        <div className="w-full flex mContainer justify-between">
          <Sidebar filter={"viewed"} />
          <Postswindow userId={session.data?.user.id} filter={"viewed"} />
          <ProfilePlaceHolder />
        </div>
      </div>
    );
  }
}
