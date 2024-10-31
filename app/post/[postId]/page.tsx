"use client";

import { Navbar } from "@/app/ui/navbar/navbar";
import { Post } from "@/app/ui/posts/post";
import { Profile } from "@/app/ui/profile/profile";
import { PostWrapper } from "@/app/ui/posts/post-wrapper";
import { Sidebar } from "@/app/ui/sidebar/sidebar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function PostPage() {
  const session = useSession();
  if (session.status === "loading") {
    return <div>Loading</div>;
  }
  const { postId } = useParams();
  const postData = {};
  //gett post data by making useEffect call

  return (
    <>
      <div className="overflow-hidden">
        <Navbar />
        <div className="w-full flex mContainer justify-between">
          <Sidebar />
          <PostWrapper>
            <Post
              id={typeof postId === "string" ? postId : postId[0]}
              hotFocus
            />
          </PostWrapper>
          <Profile />
        </div>
      </div>
    </>
  );
}
