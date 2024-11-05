import Link from "next/link";
import { PostFooter } from "./footer/post-footer";
import { PostImageWrapper } from "./image-wrapper";
import { PostContent } from "./post-content";
import { PostDetails } from "./post-details";
import { formatDistanceToNow } from "date-fns";
import { PostTitle } from "./post-title";
import {
  CommentProps,
  CommentSection,
} from "./comment-section/comment-section";
import { Separator } from "@/components/ui/separator";
import { CommentSectionWrapper } from "./comment-section/comment-section-wrapper";
import { PostDetailsWrapper } from "./post-details-wrapper";

export const Post = ({
  postId,
  authorId,
  createdAt,
  title,
  imageSrc,
  content,
  hotFocus = false,
}: {
  postId: string;
  authorId: string;
  createdAt: Date;
  title: string;
  imageSrc?: string;
  content: string;
  hotFocus?: boolean;
  commentsCount?: number;
  commentsArray?: CommentProps[];
}) => {
  return (
    <div
      className={`${
        hotFocus
          ? "overflow-y-auto"
          : "max-h-[700px] hover:bg-gray-100/50 dark:hover:bg-gray-900/50"
      } w-full rounded-[37px] flex flex-col px-[25px] py-[10px] gap-0 `}
    >
      <PostDetailsWrapper
        postId={postId}
        userId={authorId}
        createdAt={createdAt}
      />
      {/* too lazy to wrap the components inside the the Link tag below */}
      {hotFocus ? (
        <div className={"cursor-default select-text"}>
          <PostTitle title={title} />
          <PostImageWrapper src={imageSrc ? imageSrc : ""} />
          <PostContent content={content} />
          <PostFooter postId={postId} />

          <CommentSectionWrapper postId={postId} />
        </div>
      ) : (
        <>
          <Link href={"/post/" + postId} className={"cursor-pointer"}>
            <PostTitle title={title} />
            <PostImageWrapper src={imageSrc ? imageSrc : ""} />
            <PostContent content={content} />
          </Link>
          <PostFooter postId={postId} />
        </>
      )}
    </div>
  );
};
