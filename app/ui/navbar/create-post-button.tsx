"use client";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export const CreatePostButton = () => {
  return (
    <Button
      className="w-[90px] h-full flex justify-center items-center p-2 
    bg-transparent hover:bg-gray-200
    outline-none  dark:hover:bg-gray-600 mx-2 rounded-[16px] "
    >
      <IconPlus className=" dark:text-white text-black" />
      <div className="font-light text-black dark:text-white">Create</div>
    </Button>
  );
};
