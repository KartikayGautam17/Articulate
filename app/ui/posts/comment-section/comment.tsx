import { CommentProps } from "./comment-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LikeButton } from "./like-button";
import { DislikeButton } from "./dislike-button";
import { useEffect, useState } from "react";
import Link from "next/link";
const btnClass = "rounded-md w-[75px]";

export const PostComment = ({
  name,
  img,
  content,
  postedAgo,
}: CommentProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
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
  return (
    <div className="w-full flex flex-col min-h-[100px] hover:bg-gray-100 dark:hover:bg-gray-900">
      <div
        id="Header"
        className="flex justify-start items-center text-sm font-light gap-1"
      >
        <Avatar className="w-[24px] h-[24px]">
          <AvatarImage src={img} />
          <AvatarFallback>KG</AvatarFallback>
        </Avatar>
        <Link
          href={"pass commentid then fetch the user"}
          className="hover:underline"
        >
          <span>{name}</span>
        </Link>
        <span>•</span>
        <span className="">{postedAgo}</span>
      </div>
      <div id="Content" className="pl-[28px] text-sm">
        {content}
      </div>
      <div id="Footer" className="flex justify-start pl-3">
        <LikeButton
          state={isLiked}
          setState={setIsLiked}
          data={21}
          btnClass={btnClass}
        />
        <DislikeButton
          state={isDisliked}
          setState={setIsDisliked}
          data={12}
          btnClass={btnClass}
        />
      </div>
    </div>
  );
};
