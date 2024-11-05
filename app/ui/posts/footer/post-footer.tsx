"use client";

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
import {
  getPostComments,
  getPostsDislikes,
  getPostsLikes,
  getPostsViews,
} from "@/app/utility/fetch";
import { Comment, Dislike, Like, View } from "@prisma/client";
const btnClass =
  "flex justify-center items-center w-[75px] h-full bg-transparent text-black border-2 rounded-full hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ";

export const PostFooter = ({ postId }: { postId: string }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState(0);

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

  useEffect(() => {
    getPostsLikes({ postId }).then((val) => {
      if (val.success) {
        console.log(val.data);
        const data = val.data as Like[];
        setLikes(data?.length ? data.length : 0);
      } else {
        console.log(val.reason);
      }
    });

    getPostsViews({ postId }).then((val) => {
      if (val.success) {
        const data = val.data as View[];
        setViews(data?.length ? data.length : 0);
      } else {
      }
    });

    getPostsDislikes({ postId }).then((val) => {
      if (val.success) {
        const data = val.data as Dislike[];
        setDislikes(data?.length ? data.length : 0);
      } else {
        //
      }
    });

    getPostComments({ postId }).then((val) => {
      if (val.success) {
        const data = val.data as Comment[];
        setComments(data?.length ? data.length : 0);
      } else {
      }
    });
  }, []);

  return (
    <div className="my-2 w-full h-[30px] flex gap-2 justify-start items-center mt-5">
      <div
        id="views"
        className="flex justify-center items-center w-[75px] h-full text-black font-medium bg-transparent rounded-full border-2 gap-1 px-3 dark:text-gray-200 cursor-default"
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
