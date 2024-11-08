import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Dispatch, SetStateAction } from "react";
import { IconBookmarkMinus, IconBookmarkPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export const SavePostButton = ({
  popoverOpenState,
  setPopoverOpenState,
  isSaved,
  setIsSaved,
}: {
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
        setPopoverOpenState(false);
        toast({
          title: "Saved",
          description: "The post has been saved successfully",
          action: (
            <ToastAction altText="this is the alt text">Close</ToastAction>
          ),
        });
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
