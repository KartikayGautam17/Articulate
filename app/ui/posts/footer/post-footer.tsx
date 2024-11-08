"use client";

import { Button } from "@/components/ui/button";
import {
  IconEye,
  IconThumbUp,
  IconThumbDown,
  IconMessage,
  IconLoader2,
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

export const PostFooter = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(-1);
  const [dislikes, setDislikes] = useState(-1);
  const [views, setViews] = useState(-1);
  const [comments, setComments] = useState(-1);

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
        const data = val.data as Like[];
        let flag = false;
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].userId === userId) {
            flag = true;
            break;
          }
        }
        let likes = data?.length ? data?.length : 0;
        if (flag) likes -= 1;
        setLiked(flag);
        setLikes(likes);
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

        let flag = false;
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].userId === userId) {
            flag = true;
            break;
          }
        }
        let dislikes = data?.length ? data?.length : 0;
        if (flag) dislikes -= 1;
        setDisliked(flag);

        setDislikes(dislikes);
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
        <span className="text-sm tracking-normal">
          {views === -1 ? (
            <IconLoader2 className="w-3 h-3 animate-spin" />
          ) : (
            views
          )}
        </span>
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
