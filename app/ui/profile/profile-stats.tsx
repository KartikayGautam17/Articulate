import { IconLoader2 } from "@tabler/icons-react";

export const ProfileStats = ({
  following,
  followers,
}: {
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
          <span>Following</span>
        </span>
        <span>
          {following === -1 ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            following
          )}
        </span>
      </div>
      <div
        id="Views"
        className="flex flex-col justify-start items-center w-full"
      >
        <span className="w-[75px] h-full flex justify-center">
          <span>Followers</span>
        </span>
        <span>
          {followers === -1 ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            followers
          )}
        </span>
      </div>
    </div>
  );
};
