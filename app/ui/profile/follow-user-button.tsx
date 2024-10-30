"use client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { IconUserPlus, IconUserX } from "@tabler/icons-react";
import { ToastAction } from "@/components/ui/toast";
export const FollowUserButton = ({
  following,
  setFollowing,
  username,
}: {
  following: boolean;
  setFollowing: any;
  username: string;
}) => {
  const { toast } = useToast();
  return (
    <Button
      className="w-full h-fit p-2 bg-gray-600 hover:ring-1 hover:bg-gray-600 dark:bg-gray-100 dark:hover:bg-gray-200"
      onClick={() => {
        console.log(following);
        if (!following) {
          toast({
            title: "You are now following ",
            description: "You are now following " + username,
            action: (
              <ToastAction altText="you are now following">Close</ToastAction>
            ),
          });
        } else {
          toast({
            title: "You are now unfollowing ",
            description: "You are now unfollowing " + username,
            action: (
              <ToastAction altText="you are now unfollowing">Close</ToastAction>
            ),
          });
        }
        setFollowing(!following);
      }}
    >
      {following ? (
        <>
          <span>Unfollow</span>
          <IconUserX />
        </>
      ) : (
        <>
          <span>Follow</span>
          <IconUserPlus />
        </>
      )}
    </Button>
  );
};
