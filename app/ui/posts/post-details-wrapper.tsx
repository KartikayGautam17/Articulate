"use client";

import { formatDistanceToNow } from "date-fns";
import { PostDetails } from "./post-details";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/app/utility/fetch";
import { Profile } from "@prisma/client";
export const PostDetailsWrapper = ({
  createdAt,
  userId,
  postId,
  ownPost,
  render,
  setRender,
}: {
  render: any;
  setRender: any;
  ownPost: boolean;
  createdAt: Date;
  userId: string;
  postId: string;
}) => {
  const session = useSession();
  const [isSaved, setIsSaved] = useState(false);
  const [name, setName] = useState("loading");
  const [image, setImage] = useState("");
  useEffect(() => {
    getUserProfile({ userId: userId }).then((value) => {
      if (value.success) {
        const data = value.data as Profile;
        setName(data.name);
        setImage(data.image ? data.image : "");
      }
    });
  }, []);
  if (session.status === "loading") {
    return <div>Loading</div>;
  }
  return (
    <PostDetails
      render={render}
      setRender={setRender}
      postId={postId}
      userId={userId}
      ownPost={ownPost}
      isSaved={isSaved}
      setIsSaved={setIsSaved}
      name={name}
      avatar={image}
      createdAt={
        createdAt
          ? formatDistanceToNow(new Date(createdAt))
          : "fetching time posted"
      }
    />
  );
};
