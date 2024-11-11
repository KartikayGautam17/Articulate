"use client";

import { useEffect, useState } from "react";
import { FollowUserButton } from "../profile/follow-user-button";
import { getUserFollowers } from "@/app/utility/fetch";
import { Follows } from "@prisma/client";

export const MainProfileUserFollowButton = ({
  username,
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: string;
  username: string;
}) => {
  const [following, setFollowing] = useState<boolean | null>(null);
  const [followId, setFollowId] = useState<string | null>(null);
  useEffect(() => {
    getUserFollowers({ userId }).then((value) => {
      if (value.success) {
        const data = value.data as Follows[];
        let flag = false;
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].followerId === sessionId) {
            setFollowId(data[i].id);
            flag = true;
            break;
          }
        }
        setFollowing(flag);
      }
    });
  }, []);
  return (
    <div>
      {following !== null ? (
        <FollowUserButton
          username={username}
          following={following}
          setFollowing={setFollowing}
          sessionId={sessionId}
          userId={userId}
          followId={followId}
          setFollowId={setFollowId}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
