"use client";
import { useState } from "react";
import { FollowUserButton } from "./follow-user-button";
import { ProfileDescription } from "./profile-description";
import { ProfileLinks } from "./profile-links";
import { ProfileName } from "./profile-name";
import { ProfilePhoto } from "./profile-photo";
import { ProfileStats } from "./profile-stats";

const sample = {
  description:
    "Hi just wanted to let you know about my booooooom baam boom baam",
  links: ["instagram", "facebook", "youtube"],
  targetLinks: [
    "https://www.instagram.com/reels/C4xlhMbR7cZ/?next=%2F",
    "https://www.facebook.com/",
    "https://www.youtube.com/",
  ],
  views: 123,
  following: 24,
  followers: 506,
};

export const Profile = () => {
  const [following, setFollowing] = useState(false);

  return (
    <div className="w-[300px] h-full border-x-2 mr-[100px] pt-[50px] pb-5 px-[25px]">
      <div
        id="profile-container"
        className="flex flex-col gap-5 w-full h-full justify-start items-center overflow-y-auto custom-scrollbar dark:custom-scrollbar-dark"
      >
        <ProfilePhoto fallback="KG" src="https://github.com/shadcn.png" />
        <ProfileName name="Kartikay" />
        <ProfileDescription description={sample.description} />
        <FollowUserButton
          following={following}
          setFollowing={setFollowing}
          username="Kartikay Gautam"
        />
        <ProfileLinks links={sample.links} targetLinks={sample.targetLinks} />
        <ProfileStats
          views={sample.views}
          following={sample.following}
          followers={sample.followers}
        />
      </div>
    </div>
  );
};
