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
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const DeletePostDialog = ({ postId }: { postId: string }) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!deleteBtnClicked) return;
    const timeout = setTimeout(() => {
      setDeleteBtnClicked(false);
      toast({
        title: "Post Deleted",
        description: "However it may take time to sync changes with database",
        action: <ToastAction altText="...">Got it</ToastAction>,
      });
    }, 1500);
    const timeout2 = setTimeout(() => {
      router.push("/");
    }, 2500);
    () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, [deleteBtnClicked]);
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
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post?
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between w-full px-[50px]">
            <Button
              variant={"default"}
              onClick={() => {
                setDeleteBtnClicked(true);
              }}
              disabled={deleteBtnClicked}
            >
              {deleteBtnClicked ? (
                <>
                  <IconLoader2 className="w-4 h-4 animate-spin" /> Deleting...{" "}
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
