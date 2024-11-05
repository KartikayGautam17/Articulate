"use client";

import { Navbar } from "@/app/ui/navbar/navbar";
import { Post } from "@/app/ui/posts/post";
import { Profile } from "@/app/ui/profile/profile";
import { PostWrapper } from "@/app/ui/posts/post-wrapper";
import { Sidebar } from "@/app/ui/sidebar/sidebar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostbyId, getPostComments } from "@/app/utility/fetch";
import { Comment, Post as PostType } from "@prisma/client";
import { PostComment } from "@/app/ui/posts/comment-section/comment";
import { CommentProps } from "@/app/ui/posts/comment-section/comment-section";

export default function PostPage() {
  const session = useSession();
  const [postData, setPostData] = useState(<div>Loading Post</div>);
  const { postId } = useParams();

  useEffect(() => {
    getPostbyId({ id: postId as string })
      .then((value) => {
        if (value.success) {
          const data = value.data as PostType;
          setPostData(
            <Post
              postId={data.id}
              authorId={data.authorId}
              createdAt={data.createdAt}
              title={data.title}
              content={data.content}
              hotFocus={true}
              imageSrc={data.images[0]}
            />
          );
        } else {
          setPostData(<div>Post Not Found / Error Loading Post</div>);
          console.log("Error Loading Post");
          console.log(value.error + "\n" + value.reason);
        }
      })
      .catch((reason) => {
        setPostData(<div>Error Loading Post {reason}</div>);
      });
  }, []);

  if (session.status === "loading") {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="overflow-hidden">
        <Navbar id={session.data?.user.id} />
        <div className="w-full flex mContainer justify-between">
          <Sidebar />
          <PostWrapper>{postData}</PostWrapper>
          <Profile />
        </div>
      </div>
    </>
  );
}
