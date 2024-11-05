"use client";

import { formatDistanceToNow } from "date-fns";
import { PostDetails } from "./post-details";
import { useSession } from "next-auth/react";
export const PostDetailsWrapper = ({
  createdAt,
  userId,
  postId,
}: {
  createdAt: Date;
  userId: string;
  postId: string;
}) => {
  const session = useSession();
  if (session.status === "loading") {
    return <></>;
  }
  return (
    <PostDetails
      postId={postId}
      userId={userId}
      name={session.data?.user.name as string}
      avatar={session.data?.user.image as string}
      createdAt={
        createdAt
          ? formatDistanceToNow(new Date(createdAt))
          : "fetching time posted"
      }
    />
  );
};
