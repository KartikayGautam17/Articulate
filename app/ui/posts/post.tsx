import Link from "next/link";
import { PostFooter } from "./footer/post-footer";
import { PostImageWrapper } from "./image-wrapper";
import { PostContent } from "./post-content";
import { PostDetails } from "./post-details";

import { PostTitle } from "./post-title";
import { CommentSection } from "./comment-section/comment-section";
import { Separator } from "@/components/ui/separator";

const samepleData = {
  title: "My First Post",
  imageSrc:
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  content:
    "Hi guys, this is my first post!!! I hope you guys are as excited as I am.\n Even if you are not, its ok y'know? mmm I go eat",
};

export const Post = ({
  id,
  hotFocus = false,
}: {
  id: string;
  hotFocus?: boolean;
}) => {
  return (
    <Link href={"/post/" + id}>
      <div
        className={`${
          hotFocus
            ? "overflow-y-auto"
            : "max-h-[700px] cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-900/50"
        } w-full rounded-[37px] flex flex-col px-[25px] py-[10px] gap-0 `}
      >
        <PostDetails
          userId={id}
          name="Kartikay"
          avatar="https://github.com/shadcn.png"
          datePosted="1 day ago"
        />
        <PostTitle title={samepleData.title} />
        <PostImageWrapper src={samepleData.imageSrc} />
        <PostContent content={samepleData.content} />
        <PostFooter views={96} likes={55} dislikes={12} comments={8} />
        {hotFocus ? (
          <>
            <Separator className="my-2 bg-gray-400" />
            <CommentSection commentsCount={14} commentsArray={[]} />
          </>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
};
