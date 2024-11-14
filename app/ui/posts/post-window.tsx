"use client";
import { useEffect, useState } from "react";
import { Post } from "./post";
import {
  getPosts,
  getUserPosts,
  getUserPostsLiked,
  getUserPostsSaved,
  getUserPostsViewed,
} from "@/app/utility/fetch";
import { Post as PostType } from "@prisma/client";

type SaveData = {
  post: PostType;
}[];

export const Postswindow = ({
  userId,
  filter = null,
}: {
  userId: string | null | undefined;
  filter?: null | "liked" | "saved" | "published" | "viewed";
}) => {
  const [postArray, setPostArray] = useState([<div>Loading</div>]);
  const [pRender, setPrender] = useState(false);
  useEffect(() => {
    if (userId && !filter) {
      getPosts()
        .then((val) => {
          if (!val.success) {
            setPostArray([<div>Error Loading Posts</div>]);
          } else {
            const data = val.data as PostType[];

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
                    pRender={pRender}
                    setPrender={setPrender}
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
    } else if (userId && filter === "liked") {
      try {
        getUserPostsLiked({ userId })
          .then((val) => {
            if (!val.success) {
              setPostArray([<div>Error Loading Posts</div>]);
            } else {
              const data = val.data as unknown as SaveData;

              setPostArray(
                data.map((ObjVal) => {
                  const val = ObjVal.post;
                  return (
                    <Post
                      postId={val.id}
                      authorId={val.authorId}
                      title={val.title}
                      imageSrc={val.images[0]}
                      content={val.content}
                      createdAt={val.createdAt}
                      ownPost={val.authorId === userId}
                      pRender={pRender}
                      setPrender={setPrender}
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
      } catch (error) {
        console.log(error);
      }
    } else if (userId && filter === "saved") {
      getUserPostsSaved({ userId })
        .then((val) => {
          if (!val.success) {
            setPostArray([<div>Error Loading Posts</div>]);
          } else {
            const data = val.data as unknown as SaveData;

            setPostArray(
              data.map((objVal) => {
                const val = objVal.post;
                return (
                  <Post
                    postId={val.id}
                    authorId={val.authorId}
                    title={val.title}
                    imageSrc={val.images[0]}
                    content={val.content}
                    createdAt={val.createdAt}
                    ownPost={val.authorId === userId}
                    pRender={pRender}
                    setPrender={setPrender}
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
    } else if (userId && filter === "published") {
      getUserPosts({ userId })
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
                    pRender={pRender}
                    setPrender={setPrender}
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
    } else if (userId && filter === "viewed") {
      getUserPostsViewed({ userId })
        .then((val) => {
          if (!val.success) {
            setPostArray([<div>Error Loading Posts</div>]);
          } else {
            const data = val.data as unknown as SaveData;
            console.log(data);
            setPostArray(
              data.map((ObjValue) => {
                const val = ObjValue.post;
                return (
                  <Post
                    postId={val.id}
                    authorId={val.authorId}
                    title={val.title}
                    imageSrc={val.images[0]}
                    content={val.content}
                    createdAt={val.createdAt}
                    ownPost={val.authorId === userId}
                    pRender={pRender}
                    setPrender={setPrender}
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
    }
  }, [pRender]);
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
