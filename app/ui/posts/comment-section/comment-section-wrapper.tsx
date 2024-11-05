"use client";

import { Separator } from "@radix-ui/react-separator";
import { CommentProps, CommentSection } from "./comment-section";
import { useEffect, useState } from "react";
import { getPostComments } from "@/app/utility/fetch";
import { Comment } from "@prisma/client";
import { PostComment } from "./comment";

export const CommentSectionWrapper = ({ postId }: { postId: string }) => {
  const [commentArray, setCommentArray] = useState<
    React.ReactElement[] | CommentProps[]
  >([<div>Loading</div>]);

  useEffect(() => {
    getPostComments({ postId: postId })
      .then((value) => {
        if (value.success) {
          const data = value.data as Comment[];

          setCommentArray(
            data.map((val) => {
              return (
                <PostComment
                  postId={postId}
                  commentId={val.id}
                  createdAt={val.createdAt}
                  content={val.content}
                  userId={val.authorId}
                />
              );
            })
          );
        } else {
          setCommentArray([<div>Error Loading Posts {value.reason}</div>]);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);
  return (
    <>
      <Separator className="my-2 bg-gray-400" />
      <CommentSection
        commentsCount={commentArray.length}
        commentsArray={commentArray as CommentProps[]}
        postId={postId}
      />
    </>
  );
};
