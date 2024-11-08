"use client";

import { Navbar } from "@/app/ui/navbar/navbar";
import { Sidebar } from "@/app/ui/sidebar/sidebar";
import { ProfilePlaceHolder } from "@/app/ui/profile/profile-placeholder";
import { useSession } from "next-auth/react";
import { ProfileWrapper } from "@/app/ui/profile-main/profile-wrapper";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/app/utility/fetch";
import { Profile } from "@prisma/client";

export default function UserPage() {
  const session = useSession();
  const paramId = useParams().id;
  const [isVerified, setIsVerified] = useState<boolean>(true);

  const [profile, setProfile] = useState<{
    name: string | null;
    description: string | null;
    links: string[] | null;
    image: string | null;
  }>({
    name: "loading",
    description: "loading",
    links: ["loading", "loading", "loading"],
    image: "",
  });

  useEffect(() => {
    getUserProfile({ userId: paramId as string })
      .then((val) => {
        if (val.success) {
          const data = val.data as Profile;

          setProfile({
            name: data.name,
            description: data.description,
            image: data.image,
            links: data.links,
          });
        } else {
          setIsVerified(false);
        }
      })
      .catch((reason) => {
        console.log(reason);
        setIsVerified(false);
      });
  }, []);
  if (session.status === "loading") {
    return <div>Loading</div>;
  }
  if (!isVerified) {
    return <div>User Not Found</div>;
  }
  return (
    <div>
      <div className="overflow-hidden">
        <Navbar searchBar={false} id={session.data?.user.id} />
        <div className="w-full flex mContainer justify-between">
          <Sidebar />
          <ProfileWrapper
            paramId={paramId as string}
            profile={profile}
            ownProfile={paramId === session.data?.user.id}
          />
          <ProfilePlaceHolder />
        </div>
      </div>
    </div>
  );
}
