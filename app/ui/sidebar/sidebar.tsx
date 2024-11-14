"use client";
import { useState } from "react";
import { LogoutButton } from "./logout-button";
import { PeopleSection } from "./people-section";
import { PostSection } from "./post-section";
import { SearchPeopleDialog } from "./search-people";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
export const Sidebar = ({
  filter = null,
}: {
  filter?: null | "saved" | "liked" | "published" | "viewed";
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="relative">
      {!isSidebarOpen ? (
        <Button
          variant={"outline"}
          className="block m900:hidden top-0 left-0 absolute cursor-pointer border-0 bg-transparent hover:bg-white dark:bg-transparent"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <IconMenu2 />
        </Button>
      ) : (
        <></>
      )}
      <div
        className={` m900:relative block absolute top-0 dark:bg-black bg-white w-[275px] h-full border-2 border-y-0 p-[15px] px-[20px] overflow-y-auto custom-scrollbar dark:custom-scrollbar-dark
       duration-500 z-10 ${
         isSidebarOpen ? "left-0" : "left-[-275px]"
       } m900:left-0`}
      >
        <div className="relative">
          <div
            id="groups-container"
            className="flex flex-col justify-start w-full items-center"
          >
            <PostSection filter={filter} />
            <PeopleSection />
          </div>
          <div className="flex mt-10 gap-5 flex-col items-center justify-between">
            <SearchPeopleDialog />
            <LogoutButton />
          </div>
        </div>
        {isSidebarOpen ? (
          <Button
            variant={"outline"}
            className="block m900:hidden z-20 cursor-pointer border-0 absolute right-0 top-0 bg-transparent dark:bg-transparent hover:bg-transparent"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <IconX />
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
