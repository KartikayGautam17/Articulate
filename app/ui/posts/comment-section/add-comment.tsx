import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IconCirclePlus } from "@tabler/icons-react";

export const AddComment = () => {
  return (
    <div className="relative h-[40px]">
      <Textarea
        placeholder="Add a Comment..."
        className="min-h-4 h-full max-h-[80px]  focus-visible:ring-0 rounded-none pr-16 overflow-y-hidden my-0"
      >
        <span>Hi There</span>
      </Textarea>
      <Button
        variant={"destructive"}
        className="absolute right-0 bottom-0 h-full rounded-sm border-b-[1px] dark:bg-sky-500 "
        onClick={() => {
          /* Add Comment */
        }}
      >
        <IconCirclePlus />
      </Button>
    </div>
  );
};
