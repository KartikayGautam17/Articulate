"use client";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export const CreatePostButton = () => {
  return (
    <Button
      className="w-[90px] h-full flex justify-around items-center border-2 rounded-[16px] p-3 
    bg-transparent text-black hover:bg-gray-200
    outline-none dark:text-white dark:hover:bg-gray-600 mx-2"
    >
      <IconPlus className="opacity-75 w-[24px] h-[24px] " />
      <div className="font-light">Create</div>
    </Button>
  );
};
