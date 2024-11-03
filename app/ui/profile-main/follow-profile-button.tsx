"use client";

import { useState } from "react";
import { FollowUserButton } from "../profile/follow-user-button";

export const MainProfileUserFollowButton = ({
  username,
}: {
  username: string;
}) => {
  const [following, setFollowing] = useState(false);
  return (
    <div>
      {following ? (
        <FollowUserButton
          username={username}
          following={following}
          setFollowing={setFollowing}
        />
      ) : (
        <FollowUserButton
          username={username}
          following={following}
          setFollowing={setFollowing}
        />
      )}
    </div>
  );
};
