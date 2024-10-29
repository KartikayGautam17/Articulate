"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { IconUserSearch } from "@tabler/icons-react";
import { SkeletonLoading } from "./skeleton-loading";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SearchedUser } from "./searched-user";

export const SearchPeopleDialog = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [content, setContent] = useState<React.ReactElement>(<div></div>);
  useEffect(() => {
    if (inputVal.length < 1) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setContent(
        <>
          <SearchedUser
            name="Kartikay"
            description="Just like the description 1"
          />
          <SearchedUser
            name="Gautam"
            description="Just like the description 2"
            follow={true}
          />
          <SearchedUser name="sams" description="Just like the description 3" />
        </>
      );
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputVal]);
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="py-2 px-2 text-white bg-gray-600 hover:ring-1 dark:text-black dark:bg-gray-200  dark:ring-white rounded-md w-full">
          <div className="px-2 flex justify-start items-center gap-3 text-base font-normal">
            <IconUserSearch width={16} height={16} />
            <span>Search Users</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Users</DialogTitle>
          <DialogDescription>
            It might take time to sync newly created users with the database
          </DialogDescription>
        </DialogHeader>
        <Input
          onChange={(e) => {
            setInputVal(e.target.value);
            setContent(
              <>
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
              </>
            );
          }}
          type="text"
          className="focus-visible:ring-1 focus-visible:border-0 border-2 leading-6"
          placeholder="Enter username"
        />
        {inputVal.length ? (
          <div className="flex flex-col gap-8 mt-2">{content}</div>
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  );
};
