"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Navbar } from "@/app/ui/navbar/navbar";
import { Sidebar } from "@/app/ui/sidebar/sidebar";
import { ProfilePlaceHolder } from "@/app/ui/profile/profile-placeholder";
import { ProfileMain } from "@/app/ui/profile-main/profile";
import { useSession } from "next-auth/react";

export default function UserPage() {
  const session = useSession();
  if (session.status === "loading") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="overflow-hidden">
        <Navbar searchBar={false} id={session.data?.user.id} />
        <div className="w-full flex mContainer justify-between">
          <Sidebar />
          <ProfileMain />
          <ProfilePlaceHolder />
        </div>
      </div>
    </div>
  );
}
