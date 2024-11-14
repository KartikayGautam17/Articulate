"use client";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div>
      <Input
        className="w-[300px] m900:w-[560px] h-full mx-2 sm:mx-5 m700:mx-10 rounded-[30px] outline-none focus-visible:ring-0 
        focus-visible:border-gray-400 dark:focus-visible:border-gray-400 bg-gray-200
         dark:bg-gray-800  font-normal text-gray-600 dark:placeholder:text-gray-200 dark:text-white"
        placeholder="Search Posts..."
      />
    </div>
  );
};
