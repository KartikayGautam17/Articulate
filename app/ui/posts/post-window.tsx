"use client";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { getPosts } from "@/app/utility/fetch";
import { Post as PostType } from "@prisma/client";

export const Postswindow = ({
  userId,
}: {
  userId: string | null | undefined;
}) => {
  const [postArray, setPostArray] = useState([<div>Loading</div>]);
  useEffect(() => {
    if (userId)
      getPosts()
        .then((val) => {
          if (!val.success) {
            setPostArray([<div>Error Loading Posts</div>]);
          } else {
            const data = val.data as PostType[];
            console.log(data);
            setPostArray(
              data.map((val) => {
                return (
                  <Post
                    postId={val.id}
                    authorId={val.authorId}
                    title={val.title}
                    imageSrc={val.images[0]}
                    content={val.content}
                    createdAt={val.createdAt}
                    ownPost={val.authorId === userId}
                  />
                );
              })
            );
          }
        })
        .catch((val) => {
          setPostArray([
            <div>Error in fetching posts, possible reasons : {val}</div>,
          ]);
        });
  }, []);
  return (
    <div className="w-[800px] h-full border-x-2 mx-[50px]  overflow-y-auto custom-scrollbar dark:custom-scrollbar-dark">
      <div
        id="posts-container"
        className="flex flex-col px-[25px] mt-10 rounded-[37px] gap-2"
      >
        {postArray.map((val) => val)}
      </div>
    </div>
  );
};
