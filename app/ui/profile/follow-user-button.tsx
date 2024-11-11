"use client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { IconLoader2, IconUserPlus, IconUserX } from "@tabler/icons-react";
import { ToastAction } from "@/components/ui/toast";
import { createFollower, deleteFollower } from "@/app/utility/misc";
import { useState } from "react";

const toastObject = ({
  username,
  error,
}: {
  username?: string;
  error?: string;
}) => {
  return {
    following: {
      title: "Success",
      description: "You are now following " + username,
      action: <ToastAction altText="...">Close</ToastAction>,
    },
    unfollowing: {
      title: "Success",
      description: "You are now unfollowing " + username,
      action: <ToastAction altText="...">Close</ToastAction>,
    },
    error: {
      title: "error",
      description: error,
      action: <ToastAction altText="...">Close</ToastAction>,
    },
  };
};
export const FollowUserButton = ({
  following,
  setFollowing,
  username,
  sessionId,
  userId,
  followId,
  setFollowId,
}: {
  followId: string | null;
  setFollowId: any;
  following: boolean;
  setFollowing: any;
  username: string;
  sessionId: string;
  userId: string;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!sessionId || sessionId === userId) {
    return <div></div>;
  }
  return (
    <Button
      className="w-full h-fit  bg-gray-600 hover:ring-1 hover:bg-gray-600 dark:bg-gray-100 dark:hover:bg-gray-200"
      onClick={() => {
        setIsLoading(true);
        if (!following) {
          if (sessionId) {
            createFollower({ userId: sessionId, targetId: userId })
              .then((value) => {
                if (value.success) {
                  toast(toastObject({ username }).following);
                } else {
                  toast(toastObject({ error: value.error }).error);
                }
                setFollowId(value.data as string);
                setIsLoading(false);
              })
              .catch((error) => {
                toast(toastObject({ error }).error);
                setIsLoading(false);
              });
          }
        } else {
          if (followId) {
            deleteFollower({ followId })
              .then((value) => {
                if (value.success) {
                  toast(toastObject({ username }).unfollowing);
                } else {
                  toast(toastObject({ error: value.error }).error);
                }
                setFollowId(null);
                setIsLoading(false);
              })
              .catch((error) => {
                toast(toastObject({ error }).error);
                setIsLoading(false);
              });
          } else {
            toast(toastObject({ error: "FollowId is null" }).error);
            setIsLoading(false);
          }
        }
        setFollowing(!following);
      }}
    >
      {isLoading ? (
        <IconLoader2 className="w-4 h-4 animate-spin" />
      ) : following ? (
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
