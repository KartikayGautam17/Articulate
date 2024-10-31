import { Separator } from "@/components/ui/separator";
import { AddComment } from "./add-comment";
import { PostComment } from "./comment";

export type CommentProps = {
  name: string;
  img: string;
  content: string;
  postedAgo: string;
};

const sampleContent =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

export const CommentSection = ({
  commentsCount,
  commentsArray,
}: {
  commentsCount: number;
  commentsArray: Array<CommentProps>;
}) => {
  return (
    <div className="">
      <div className="my-2 flex justify-start gap-2 items-center">
        <div className=" w-fit">Comments</div>
        <span className="w-fit font-semibold text-gray-800 dark:text-gray-200 ">
          {commentsCount}
        </span>
      </div>
      <div id="comments-container" className=" w-full">
        <AddComment />
        <Separator className="bg-gray-600 dark:bg-gray-400 mb-2" />
        <div className="p-2 flex flex-col gap-4 border-2">
          <PostComment
            name="Kartikay"
            img="https://github.com/shadcn.png"
            content={sampleContent}
            postedAgo="3 days ago"
          />
          <PostComment
            name="Kartikay"
            img="https://github.com/shadcn.png"
            content={sampleContent}
            postedAgo="3 days ago"
          />
          <PostComment
            name="Kartikay"
            img="https://github.com/shadcn.png"
            content={sampleContent}
            postedAgo="3 days ago"
          />
          <PostComment
            name="Kartikay"
            img="https://github.com/shadcn.png"
            content={sampleContent}
            postedAgo="3 days ago"
          />
        </div>
      </div>
    </div>
  );
};
