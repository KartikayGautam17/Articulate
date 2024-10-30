import { Separator } from "@/components/ui/separator";
export const ProfileStats = ({
  views,
  following,
  followers,
}: {
  views: number;
  following: number;
  followers: number;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        id="Views"
        className="flex flex-col justify-start items-center w-full"
      >
        <span className="w-[75px] h-full flex justify-center">
          <span>Views</span>
        </span>
        <span className="">{views}</span>
      </div>
      <div
        id="Views"
        className="flex flex-col justify-start items-center w-full"
      >
        <span className="w-[75px] h-full flex justify-center">
          <span>Following</span>
        </span>
        <span>{following}</span>
      </div>
      <div
        id="Views"
        className="flex flex-col justify-start items-center w-full"
      >
        <span className="w-[75px] h-full flex justify-center">
          <span>Followers</span>
        </span>
        <span>{followers}</span>
      </div>
    </div>
  );
};
