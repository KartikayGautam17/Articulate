"use client";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Dispatch, SetStateAction } from "react";
import { IconBookmarkMinus, IconBookmarkPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { savePost, unSavePost } from "@/app/utility/misc";

export const SavePostButton = ({
  popoverOpenState,
  setPopoverOpenState,
  isSaved,
  setIsSaved,
  saveId,
  setSaveId,
  userId,
  postId,
}: {
  userId: string;
  postId: string;
  saveId: string | null;
  setSaveId: Dispatch<SetStateAction<string | null>>;
  popoverOpenState: any;
  setPopoverOpenState: any;
  isSaved: boolean;
  setIsSaved: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();

  return (
    <Button
      variant={"outline"}
      onClick={() => {
        if (isSaved) {
          setIsSaved(false);
          if (saveId) {
            unSavePost({ saveId }).then((value) => {
              if (value.success) {
                setSaveId(null);
                toast({
                  title: "Unsaved",
                  description: "The post has been unsaved successfully",
                  action: <ToastAction altText="...">Close</ToastAction>,
                });
              } else {
                toast({
                  title: "Error",
                  description: "Could not unsave " + value.error,
                  action: <ToastAction altText="...">Close</ToastAction>,
                });
              }
            });
          }
        } else {
          setIsSaved(true);
          savePost({ userId, postId })
            .then((value) => {
              if (value.success) {
                toast({
                  title: "Saved",
                  description: "The post has been saved successfully",
                  action: <ToastAction altText="...">Close</ToastAction>,
                });
                setSaveId(value.data as string);
              } else {
                toast({
                  title: "Error",
                  description: value.error as string,
                  action: <ToastAction altText="...">Close</ToastAction>,
                });
              }
            })
            .catch((reason) => {
              toast({
                title: "Error",
                description: reason,
                action: <ToastAction altText="...">Close</ToastAction>,
              });
            });
        }
        setPopoverOpenState(false);
      }}
      className="w-[100px] h-fit bg-transparent text-black hover:bg-gray-200 
      font-light text-sm py-2 dark:hover:bg-gray-800 dark:text-white"
    >
      <div className="w-full flex justify-start gap-2 items-center">
        {!isSaved ? (
          <>
            <IconBookmarkPlus className="w-[24px] h-[24px]" />
            <span className="text-sm">Save</span>
          </>
        ) : (
          <>
            <IconBookmarkMinus className="w-[24px] h-[24px]" />
            <span className="text-sm">Unsave</span>
          </>
        )}
      </div>
    </Button>
  );
};
