"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconCheck, IconLoader2, IconTrash, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { deletePost } from "@/app/utility/action";

export const DeletePostDialog = ({
  postId,
  userId,
  isDisabled,
  setIsDisabled,
  render,
  setRender,
}: {
  render: any;
  setRender: any;
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  postId: string;
  userId: string;
}) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);

  const router = useRouter();
  const HandleDelete = async () => {
    try {
      const response = await deletePost({ postId, userId });
      if (response.success) {
        toast({
          title: (
            <div className="flex items-center justify-start gap-1">
              <IconCheck width={16} height={16} />
              <span>Post Deleted</span>
            </div>
          ),
          description: "Refresh to see changes",
          action: (
            <ToastAction
              onClick={() => {
                if (setRender) {
                  setRender(!render);
                }
              }}
              altText="..."
            >
              Refresh
            </ToastAction>
          ),
        });
        setDeleteBtnClicked(false);
        setDialogOpen(false);
        setIsDisabled(true);
      } else {
        toast({
          title: (
            <div className="flex items-center justify-start gap-1">
              <IconX width={16} height={16} />
              <span>Failure</span>
            </div>
          ),
          description:
            "Post might have already been deleted refresh to see changes",
          action: <ToastAction altText="...">Close</ToastAction>,
        });
        console.log(response.error);
        setDeleteBtnClicked(false);
        setDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: (
          <div className="flex items-center justify-start gap-1">
            <IconX width={16} height={16} />
            <span>Failure</span>
          </div>
        ),
        description: "Could not delete post" + error,
        action: <ToastAction altText="...">Close</ToastAction>,
      });
      setDeleteBtnClicked(false);
    }
  };
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {}}
            variant={"outline"}
            disabled={isDisabled}
            className="w-[100px] h-fit bg-transparent text-black hover:bg-gray-200 
      font-light text-sm py-2 dark:hover:bg-gray-800 dark:text-white flex items-center justify-between"
          >
            <div className="w-full flex justify-start gap-2 items-center">
              <IconTrash />
              Delete
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[300px]">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post?
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between w-full px-[50px]">
            <Button
              variant={"default"}
              onClick={() => {
                HandleDelete();
                setDeleteBtnClicked(true);
              }}
              disabled={deleteBtnClicked}
            >
              {deleteBtnClicked ? (
                <>
                  <IconLoader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>Yes</>
              )}
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
