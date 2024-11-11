"use client";

import { formatDistanceToNow } from "date-fns";
import { PostDetails } from "./post-details";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/app/utility/fetch";
import { Profile } from "@prisma/client";
import { getIsPostSaved } from "@/app/utility/misc";
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
  const [saveId, setSaveId] = useState<null | string>(null);
  const [name, setName] = useState("loading");
  const [image, setImage] = useState("");
  useEffect(() => {
    if (!session.data?.user.id) return;
    getUserProfile({ userId: userId }).then((value) => {
      if (value.success) {
        const data = value.data as Profile;
        setName(data.name);
        setImage(data.image ? data.image : "");
      }
    });
    getIsPostSaved({ userId, postId })
      .then((value) => {
        if (value.success) {
          setIsSaved(true);
          setSaveId(value?.data as string);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, [session.data?.user.id]);
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
      saveId={saveId}
      setSaveId={setSaveId}
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
