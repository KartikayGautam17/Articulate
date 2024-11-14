"use client";
import { useEffect, useState } from "react";
import { FollowUserButton } from "./follow-user-button";
import { ProfileDescription } from "./profile-description";
import { ProfileLinks } from "./profile-links";
import { ProfileName } from "./profile-name";
import { ProfilePhoto } from "./profile-photo";
import { ProfileStats } from "./profile-stats";
import { getUserFollowers, getUserFollowing } from "@/app/utility/fetch";
import { Follows, Profile as ProfileType } from "@prisma/client";

export const Profile = ({
  name,
  image,
  userId,
  description,
  links,
  sessionId,
}: {
  sessionId: string;
  links: string[] | null;
  description: string;
  name: string;
  image: string | null;
  userId: string;
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [followers, setFollowers] = useState(-1);
  const [following, setFollowing] = useState(-1);
  const [followId, setFollowId] = useState<string | null>(null);
  useEffect(() => {
    getUserFollowers({ userId }).then((value) => {
      if (value.success) {
        const data = value.data as Follows[];
        let flag = false;
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].followerId === sessionId) {
            flag = true;
            setFollowId(data[i].id);
            break;
          }
        }
        setIsFollowing(flag);
        setFollowers(data.length);
      }
    });

    getUserFollowing({ userId }).then((value) => {
      if (value.success) {
        const data = value.data as Follows[];

        setFollowing(data.length);
      }
    });
  }, []);
  return (
    <div className="w-[250px] h-full border-x-2 mr-[50px] pt-[50px] pb-5 px-[25px] hidden lg:block">
      <div
        id="profile-container"
        className="flex flex-col gap-5 w-full h-full justify-start items-center overflow-y-auto custom-scrollbar dark:custom-scrollbar-dark"
      >
        <ProfilePhoto
          fallback={name.substring(0, 2)}
          src={
            image
              ? image
              : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          }
        />
        <ProfileName name={name} />
        <ProfileDescription description={description} />

        {isFollowing !== null ? (
          <FollowUserButton
            sessionId={sessionId}
            following={isFollowing}
            setFollowing={setIsFollowing}
            username={name}
            userId={userId}
            followId={followId}
            setFollowId={setFollowId}
          />
        ) : (
          <></>
        )}

        <ProfileLinks links={links ? links : []} />
        <ProfileStats following={following} followers={followers} />
      </div>
    </div>
  );
};
