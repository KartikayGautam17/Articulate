"use client";
import { formatDistanceToNow } from "date-fns";
import { CommentProps } from "./comment-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LikeButton } from "./like-button";
import { DislikeButton } from "./dislike-button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getCommentsDislikes, getCommentsLikes } from "@/app/utility/fetch";
import { Dislike, Like } from "@prisma/client";
const btnClass = "rounded-md w-[75px]";

export const PostComment = ({
  postId,
  commentId,
  userId,
  content,
  createdAt,
}: CommentProps) => {
  useEffect(() => {}, []);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [commentLikes, setCommentLikes] = useState(0);
  const [commentDislikes, setCommentDislikes] = useState(0);
  useEffect(() => {
    if (isLiked && isDisliked) {
      setIsDisliked(false);
    }
  }, [isLiked]);

  useEffect(() => {
    if (isLiked && isDisliked) {
      setIsLiked(false);
    }
  }, [isDisliked]);

  const session = useSession();

  useEffect(() => {
    getCommentsLikes({ commentId }).then((val) => {
      if (val.success) {
        const data = val.data as Like[];
        setCommentLikes(data?.length ? data.length : 0);
      }
    });
    getCommentsDislikes({ commentId }).then((val) => {
      if (val.success) {
        const data = val.data as Dislike[];
        setCommentDislikes(data?.length ? data.length : 0);
      }
    });
  }, []);

  if (session.status === "loading") {
    return <div>Loading comment</div>;
  }

  return (
    <div className="w-full flex flex-col min-h-[100px] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-auto">
      <div
        id="Header"
        className="flex justify-start items-center text-sm font-light gap-2 p-2 rounded-md"
      >
        <Avatar className="w-[24px] h-[24px]">
          <AvatarImage src={session.data?.user.image as string} />
          <AvatarFallback>
            {session.data?.user.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Link
          href={"pass commentid then fetch the user"}
          className="hover:underline font-normal"
        >
          <span>{session.data?.user.name}</span>
        </Link>
        <span className="">
          •{" "}
          {createdAt
            ? formatDistanceToNow(new Date(createdAt))
            : "fetching date"}
        </span>
      </div>
      <div id="Content" className="pl-[28px] text-sm">
        {content}
      </div>
      <div id="Footer" className="flex justify-start pl-3">
        <LikeButton
          state={isLiked}
          setState={setIsLiked}
          data={commentLikes}
          btnClass={btnClass}
        />
        <DislikeButton
          state={isDisliked}
          setState={setIsDisliked}
          data={commentDislikes}
          btnClass={btnClass}
        />
      </div>
    </div>
  );
};
