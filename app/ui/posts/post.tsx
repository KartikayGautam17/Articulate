import { PostDetails } from "./post-details";

export const Post = () => {
  return (
    <div className="w-full h-[500px] border-2 rounded-[37px] flex flex-col px-[25px] py-[10px]">
      <PostDetails
        name="Kartikay"
        avatar="https://github.com/shadcn.png"
        datePosted="1 day ago"
      />
    </div>
  );
};
