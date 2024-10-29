import { Post } from "./post";
export const Postswindow = () => {
  return (
    <div className="w-[800px] h-full border-2 border-y-0 mx-[50px]">
      <div
        id="posts-container"
        className="flex flex-col px-[25px] mt-10 rounded-[37px]"
      >
        <Post />
      </div>
    </div>
  );
};
