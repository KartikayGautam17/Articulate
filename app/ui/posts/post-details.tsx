import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { IconBookmarksFilled, IconDots } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SavePostButton } from "./save-post-button";
import { DeletePostDialog } from "./delete-post-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PostDetails = ({
  createdAt,
  name,
  avatar,
  userId,
  postId,
  ownPost,
  isSaved,
  setIsSaved,
  saveId,
  setSaveId,
  render,
  setRender,
}: {
  saveId: string | null;
  setSaveId: Dispatch<SetStateAction<string | null>>;
  render: any;
  setRender: any;
  ownPost: boolean;
  createdAt: string;
  name: string;
  avatar: string;
  userId: string;
  postId: string;
  isSaved: boolean;
  setIsSaved: Dispatch<SetStateAction<boolean>>;
}) => {
  const [popoverOpenState, setPopoverOpenState] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div className="border-b-2 w-full h-[40px] flex items-center justify-between gap-2 text-sm">
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

      <div className="flex items-center justify-start gap-1">
        {isSaved ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IconBookmarksFilled
                  width={24}
                  height={24}
                  className="cursor-default"
                />
              </TooltipTrigger>
              <TooltipContent>
                <span>Saved</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <></>
        )}

        <Popover open={popoverOpenState} onOpenChange={setPopoverOpenState}>
          <PopoverTrigger>
            <Button className="w-[12px] h-[18px] bg-transparent dark:text-white text-black hover:bg-gray-200 rounded-full dark:hover:bg-gray-800 ">
              <IconDots />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit h-fit border-2 p-0 ">
            <div className="flex flex-col">
              <SavePostButton
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                saveId={saveId}
                setSaveId={setSaveId}
                popoverOpenState={popoverOpenState}
                setPopoverOpenState={setPopoverOpenState}
                userId={userId}
                postId={postId}
              />
              {ownPost ? (
                <DeletePostDialog
                  render={render}
                  setRender={setRender}
                  postId={postId}
                  userId={userId}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                />
              ) : (
                <></>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
