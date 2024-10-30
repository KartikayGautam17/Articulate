import { PostFooter } from "./footer/post-footer";
import { PostImageWrapper } from "./image-wrapper";
import { PostContent } from "./post-content";
import { PostDetails } from "./post-details";

import { PostTitle } from "./post-title";

const samepleData = {
  title: "My First Post",
  imageSrc:
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  content:
    "Hi guys, this is my first post!!! I hope you guys are as excited as I am.\n Even if you are not, its ok y'know? mmm I go eat",
};

export const Post = () => {
  return (
    <div className="w-full max-h-[700px]  rounded-[37px] flex flex-col px-[25px] py-[10px] gap-0 hover:bg-gray-100/50 cursor-pointer dark:hover:bg-gray-900/50">
      <PostDetails
        name="Kartikay"
        avatar="https://github.com/shadcn.png"
        datePosted="1 day ago"
      />
      <PostTitle title={samepleData.title} />
      <PostImageWrapper src={samepleData.imageSrc} />
      <PostContent content={samepleData.content} />
      <PostFooter views={96} likes={55} dislikes={12} comments={8} />
    </div>
  );
};
