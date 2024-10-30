import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { IconDots } from "@tabler/icons-react";
import { useState } from "react";
import { SavePostButton } from "./save-post-button";

export const PostDetails = ({
  datePosted,
  name,
  avatar,
}: {
  datePosted: string;
  name: string;
  avatar: string;
}) => {
  const [popoverOpenState, setPopoverOpenState] = useState(false);
  return (
    <div className="border-b-2 w-full h-[40px]   flex items-center justify-between gap-2 text-sm">
      <div className="flex items-center">
        <div className="inline-flex justify-center gap-2 items-center cursor-pointer">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src={avatar} className="" />
            <AvatarFallback>{name.at(0)}</AvatarFallback>
          </Avatar>
          <Label className="text-sm font-light cursor-pointer hover:underline">
            {name}
          </Label>
        </div>
        <div className="inline-flex justify-center gap-2 items-center">
          <span className="ml-2">•</span>
          <Label className="font-light text-sm">{datePosted}</Label>
        </div>
      </div>
      <Popover open={popoverOpenState} onOpenChange={setPopoverOpenState}>
        <PopoverTrigger>
          <Button className="w-[12px] h-[18px] bg-transparent dark:text-white text-black hover:bg-gray-200 rounded-full dark:hover:bg-gray-800 ">
            <IconDots />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit h-fit border-2 p-0 ">
          <SavePostButton
            popoverOpenState={popoverOpenState}
            setPopoverOpenState={setPopoverOpenState}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
