import Link from "next/link";
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
  createdAt,
  name,
  avatar,
  userId,
  postId,
}: {
  createdAt: string;
  name: string;
  avatar: string;
  userId: string;
  postId: string;
}) => {
  const [popoverOpenState, setPopoverOpenState] = useState(false);
  return (
    <div className="border-b-2 w-full h-[40px]   flex items-center justify-between gap-2 text-sm">
      <div className="flex items-center justify-center">
        <Link href={"/user/" + userId}>
          <div className="inline-flex justify-center gap-2 items-center cursor-pointer">
            <Avatar className="w-[30px] h-[30px]">
              <AvatarImage src={avatar} className="" />
              <AvatarFallback>
                {name ? name.substring(0, 2) : ""}
              </AvatarFallback>
            </Avatar>
            <Label className="text-sm font-normal cursor-pointer hover:underline">
              {name}
            </Label>

            <span className="cursor-pointer">•</span>
            <Label className=" text-sm font-extralight cursor-pointer">
              {createdAt + " ago"}
            </Label>
          </div>
        </Link>
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
