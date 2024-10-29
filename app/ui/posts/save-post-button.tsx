import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";
import { IconBookmark } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export const SavePostButton = ({
  popoverOpenState,
  setPopoverOpenState,
}: any) => {
  const { toast } = useToast();

  return (
    <Button
      variant={"outline"}
      onClick={() => {
        setPopoverOpenState(false);
        toast({
          title: "Saved",
          description: "The post has been saved successfully",
          action: (
            <ToastAction altText="this is the alt text">Close</ToastAction>
          ),
        });
      }}
      className="w-[100px] h-fit bg-transparent text-white hover:bg-gray-800 font-light text-sm py-2"
    >
      <div className="w-full flex justify-around items-center">
        <IconBookmark className="w-[24px] h-[24px]" />
        <span className="text-sm">Save</span>
      </div>
    </Button>
  );
};
