"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { IconTrash, IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deleteComment } from "@/app/utility/action";

export const DeleteCommentDialog = ({
  commentId,
  setPopoverState,
  render,
  SetRender,
}: {
  commentId: string;
  render: any;
  SetRender: any;
  setPopoverState: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);

  const HandleOnClick = async () => {
    try {
      const response = await deleteComment({ commentId });
      if (response.success) {
        toast({
          title: "Success",
          description: "Refresh to see changes",
          action: <ToastAction altText="...">Close</ToastAction>,
        });
      } else {
        toast({
          title: "Error",
          description: response.reason,
          action: <ToastAction altText="...">Close</ToastAction>,
        });
        console.log("Could not delete comment" + response.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "" + error,
        action: <ToastAction altText="...">Close</ToastAction>,
      });
      console.log("Some error " + error);
    } finally {
      setDeleteBtnClicked(false);
      setDialogOpen(false);
      setPopoverState(false);
    }
  };
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {}}
            variant={"outline"}
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
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment?
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between w-full px-[50px]">
            <Button
              variant={"default"}
              onClick={() => {
                setDeleteBtnClicked(true);
                HandleOnClick();
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
