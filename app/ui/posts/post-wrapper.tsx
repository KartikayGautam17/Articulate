import { Post } from "./post";
export const PostWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[800px] h-full border-x-2 mx-[50px]  overflow-y-auto custom-scrollbar dark:custom-scrollbar-dark">
      <div
        id="posts-container"
        className="flex flex-col px-[25px] mt-10 rounded-[37px] gap-5"
      >
        {children}
      </div>
    </div>
  );
};
