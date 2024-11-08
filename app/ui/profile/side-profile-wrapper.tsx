"use client";
import { useEffect, useState } from "react";
import { Profile } from "./profile";
import { getUserProfile } from "@/app/utility/fetch";
import { Profile as ProfileType } from "@prisma/client";

export const SideProfileWrapper = ({ userId }: { userId: string | null }) => {
  const [name, setName] = useState("loading");
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [links, setLinks] = useState<string[] | null>([]);
  useEffect(() => {
    if (userId) {
      getUserProfile({ userId: userId })
        .then((value) => {
          if (value.success) {
            const data = value.data as ProfileType;
            setName(data.name);
            setImage(data.image);
            setDescription(data.description ? data.description : "");
            setLinks(data.links);
          } else {
            console.log(value.reason);
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
    }
  }, [userId]);
  if (!userId) return <div>Loading</div>;
  return (
    <div>
      <Profile
        name={name}
        image={image}
        description={description}
        links={links}
        userId={userId}
      />
    </div>
  );
};
