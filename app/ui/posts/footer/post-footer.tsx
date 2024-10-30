import { Button } from "@/components/ui/button";
import {
  IconEye,
  IconThumbUp,
  IconThumbDown,
  IconMessage,
} from "@tabler/icons-react";
import { LikeButton } from "./like-button";
import { DislikeButton } from "./dislike-button";
import { CommentButton } from "./comment-button";
import { useEffect, useState } from "react";
const btnClass =
  "flex justify-center items-center w-fit h-full bg-transparent text-black border-2 rounded-full hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ";

export const PostFooter = ({
  views,
  likes,
  dislikes,
  comments,
}: {
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
}) => {
  const [liked, setLiked] = useState(false);
  //function to get if the user has already liked the post?
  const [disliked, setDisliked] = useState(false);
  //function to get if the user has already disliked the post?
  useEffect(() => {
    if (liked && disliked) {
      setDisliked(false);
    }
  }, [liked]);
  useEffect(() => {
    if (liked && disliked) {
      setLiked(false);
    }
  }, [disliked]);
  return (
    <div className="my-2 w-full h-[30px] flex gap-2 justify-start items-center">
      <div
        id="views"
        className="flex justify-center items-center w-fit h-full text-black font-medium bg-transparent rounded-full border-2 gap-1 px-3 dark:text-gray-200 cursor-default"
      >
        <IconEye width={16} height={16} />
        <span className="text-sm tracking-normal">{views}</span>
      </div>
      <LikeButton
        btnClass={btnClass}
        data={likes}
        state={liked}
        setState={setLiked}
        disabled={false}
      />
      <DislikeButton
        btnClass={btnClass}
        data={dislikes}
        state={disliked}
        setState={setDisliked}
        disabled={false}
      />
      <CommentButton btnClass={btnClass} data={comments} disabled={false} />
    </div>
  );
};
