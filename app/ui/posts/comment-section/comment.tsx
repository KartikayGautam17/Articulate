"use client";
import { formatDistanceToNow } from "date-fns";
import { CommentProps } from "./comment-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LikeButton } from "./like-button";
import { DislikeButton } from "./dislike-button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  getCommentsDislikes,
  getCommentsLikes,
  getUserProfile,
} from "@/app/utility/fetch";
import {
  CommentDislike,
  CommentLike,
  Dislike,
  Like,
  Profile,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { IconDots } from "@tabler/icons-react";

import { DeleteCommentDialog } from "./delete-comment";
import {
  dislikeComment,
  likeComment,
  unDislikeComment,
  unLikeComment,
} from "@/app/utility/action";
const btnClass = "rounded-md w-[75px]";

export const PostComment = ({
  postId,
  commentId,
  userId,
  content,
  createdAt,
  render,
  SetRender,
}: CommentProps & { render: any; SetRender: any }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ownComment, setOwnComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [commentLikes, setCommentLikes] = useState(-1);
  const [commentDislikes, setCommentDislikes] = useState(-1);
  const [commentLikeId, setCommentLikeId] = useState<string | null>(null);
  const [commentDislikeId, setCommentDislikeId] = useState<string | null>(null);

  useEffect(() => {
    if (isLiked) {
      try {
        likeComment({ commentId, userId }).then((value) => {
          if (value.success) {
            const data = value.data as CommentLike;
            setCommentLikeId(data.id);
          }
        });
      } catch (error) {
        //might do something in future about this
      }
    } else {
      if (commentLikeId) {
        unLikeComment({ commentLikeId }).then((value) => {
          if (value.success) {
            setCommentLikeId(null);
          }
        });
      }
    }
    if (isLiked && isDisliked) {
      setIsDisliked(false);
    }
  }, [isLiked]);
  useEffect(() => {
    if (isDisliked) {
      try {
        dislikeComment({ commentId, userId }).then((value) => {
          if (value.success) {
            const data = value.data as CommentDislike;
            setCommentDislikeId(data.id);
          }
        });
      } catch (error) {
        //might do something in future about this
      }
    } else {
      if (commentDislikeId) {
        unDislikeComment({ commentDislikeId }).then((value) => {
          if (value.success) {
            setCommentDislikeId(null);
          }
        });
      }
    }
    if (isLiked && isDisliked) {
      setIsLiked(false);
    }
  }, [isDisliked]);

  const session = useSession();
  const [popoverOpenState, setPopoverOpenState] = useState(false);
  useEffect(() => {
    if (session.data?.user.id) {
      getUserProfile({ userId })
        .then((value) => {
          if (value.success) {
            const data = value.data as Profile;
            setName(data.name);
            setImage(data.image ? data.image : "");
          }
        })
        .catch((reason) => {
          console.log(reason);
        });

      setOwnComment(session.data.user.id === userId);

      getCommentsLikes({ commentId }).then((val) => {
        if (val.success) {
          const data = val.data as Like[];
          let flag = false;
          for (let i = 0; i < data.length; i += 1) {
            if (data[i].userId === userId) {
              flag = true;
              setCommentLikeId(data[i].id);
              break;
            }
          }
          let likes = data?.length ? data.length : 0;
          if (flag) {
            likes -= 1;
            setIsLiked(true);
          }
          setCommentLikes(likes);
        }
      });
      getCommentsDislikes({ commentId }).then((val) => {
        if (val.success) {
          const data = val.data as Dislike[];
          let flag = false;
          for (let i = 0; i < data.length; i += 1) {
            if (data[i].userId === userId) {
              flag = true;
              setCommentDislikeId(data[i].id);
              break;
            }
          }
          let dislikes = data?.length ? data.length : 0;
          if (flag) {
            dislikes -= 1;
            setIsDisliked(true);
          }
          setCommentDislikes(dislikes);
        }
      });
    }
  }, [session.data?.user.id]);

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
          <AvatarImage src={image} />
          <AvatarFallback className="text-xs">
            {name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <Link
          href={process.env.NEXT_PUBLIC_BASE_URL + "user/" + userId}
          className="hover:underline font-normal"
        >
          <span>{name}</span>
        </Link>
        <span className="">
          •{" "}
          {createdAt
            ? formatDistanceToNow(new Date(createdAt)) + " ago"
            : "fetching date"}
        </span>
        {ownComment ? (
          <div>
            <Popover open={popoverOpenState} onOpenChange={setPopoverOpenState}>
              <PopoverTrigger>
                <Button className="w-[12px] h-[18px] bg-transparent dark:text-white text-black hover:bg-gray-200 rounded-full dark:hover:bg-gray-800 ">
                  <IconDots />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit h-fit border-2 p-0 ">
                <div className="flex flex-col">
                  <DeleteCommentDialog
                    render={render}
                    SetRender={SetRender}
                    commentId={commentId}
                    setPopoverState={setPopoverOpenState}
                  />{" "}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div id="Content" className="pl-[28px] text-sm">
        {content}
      </div>
      <div id="Footer" className="flex justify-start pl-3 my-2">
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
