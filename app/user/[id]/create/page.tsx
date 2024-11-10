"use client";

import { Navbar } from "@/app/ui/navbar/navbar";
import { ProfilePlaceHolder } from "@/app/ui/profile/profile-placeholder";
import { Sidebar } from "@/app/ui/sidebar/sidebar";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { CreatePageForm } from "./create-page";

export default function CreateUserPost() {
  const session = useSession();
  if (session.status === "loading") {
    return <div>Loading</div>;
  }
  const { id } = useParams();

  if (session.data?.user.id !== id) {
    return <div>Unauthorized</div>;
  } else {
    return (
      <div className="overflow-hidden">
        <Navbar
          id={session.data?.user.id}
          createPostButton={true}
          searchBar={false}
        />
        <div className="w-full flex mContainer justify-between">
          <Sidebar />
          <CreatePageForm />
          <ProfilePlaceHolder />
        </div>
      </div>
    );
  }
}
