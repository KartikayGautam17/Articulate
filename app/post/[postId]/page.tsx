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
import { Post as PostType } from "@prisma/client";
import { SideProfileWrapper } from "@/app/ui/profile/side-profile-wrapper";
import { viewPost } from "@/app/utility/action";

export default function PostPage() {
  const session = useSession();
  const [postData, setPostData] = useState(<div>Loading Post</div>);
  const { postId } = useParams();
  const [isVerified, setIsVerified] = useState<boolean>(true);
  const [author, setAuthor] = useState<string | null>(null);

  //UseEffect call below may run twice due to session.data?.user.id being updated two times
  //therefore using this below method as a workaround to solve the double fetching of data
  const flags = {
    useEffectFlag: true,
  };
  useEffect(() => {
    if (session.data?.user.id) {
      if (flags.useEffectFlag) {
        flags.useEffectFlag = false;
        getPostbyId({ id: postId as string })
          .then((value) => {
            if (value.success) {
              const data = value.data as PostType;
              // console.log(data.authorId);
              // console.log(session.data?.user.id);
              setAuthor(data.authorId);
              setPostData(
                <Post
                  postId={data.id}
                  authorId={data.authorId}
                  createdAt={data.createdAt}
                  title={data.title}
                  content={data.content}
                  hotFocus={true}
                  imageSrc={data.images[0]}
                  ownPost={session.data?.user.id === data.authorId}
                  pRender={null}
                  setPrender={null}
                />
              );

              //Registering view on the post
              try {
                viewPost({
                  userId: session.data.user.id as string,
                  postId: postId as string,
                })
                  .then((val) => {
                    if (val.success) {
                      console.log("view added");
                    } else {
                      console.error("could not register view " + val.reason);
                    }
                  })
                  .catch((reason) => {
                    console.error("Could not register view for the post");
                    console.error(reason);
                  });
              } catch (error) {
                console.error("Could not register view for the post");
                console.error(error);
              }
            } else {
              setIsVerified(false);
              setPostData(<div>Post Not Found / Error Loading Post</div>);
              console.log("Error Loading Post");
              console.log(value.error + "\n" + value.reason);
            }
          })
          .catch((reason) => {
            setIsVerified(false);
            setPostData(<div>Error Loading Post {reason}</div>);
          });
      }
    }
  }, [session.data?.user.id]);

  if (session.status === "loading") {
    return <div>Loading</div>;
  }

  if (!isVerified) {
    return <div>Post Not Found</div>;
  }

  return (
    <>
      <div className="overflow-hidden">
        <Navbar id={session.data?.user.id} />
        <div className="w-full flex mContainer justify-between">
          <Sidebar />
          <PostWrapper>{postData}</PostWrapper>
          <SideProfileWrapper
            userId={author}
            sessionId={session.data?.user.id as string}
          />
        </div>
      </div>
    </>
  );
}
