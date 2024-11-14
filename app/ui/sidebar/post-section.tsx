"use client";

import { useRouter } from "next/navigation";
import {
  IconUserUp,
  IconThumbUp,
  IconBookmark,
  IconHistory,
} from "@tabler/icons-react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const postSectionBtnClass =
  "w-full flex justify-start bg-transparent hover:bg-gray-200 px-0 font-normal text-base dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200";

export const focusBtnClass = "font-semibold bg-gray-200";

export const PostSection = ({
  filter,
}: {
  filter?: null | "saved" | "liked" | "published" | "viewed";
}) => {
  const router = useRouter();
  return (
    <Accordion
      type="single"
      id="posts-group"
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="cursor-default">Posts</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-[5px] px-[10px] mt-2">
          <Button
            className={
              postSectionBtnClass +
              (filter === "published" ? focusBtnClass : "")
            }
            onClick={() => {
              router.push(process.env.NEXT_PUBLIC_BASE_URL + "published");
            }}
          >
            <div className="px-2 flex justify-start items-center gap-3">
              <IconUserUp />

              <span>Published</span>
            </div>
          </Button>

          <Button
            className={
              postSectionBtnClass + (filter === "liked" ? focusBtnClass : "")
            }
            onClick={() => {
              router.push(process.env.NEXT_PUBLIC_BASE_URL + "liked");
            }}
          >
            <div className="px-2 flex justify-start items-center gap-3">
              <IconThumbUp />
              <span>Liked</span>
            </div>
          </Button>

          <Button
            className={
              postSectionBtnClass + (filter === "saved" ? focusBtnClass : "")
            }
          >
            <div
              className="px-2 flex justify-start items-center gap-3"
              onClick={() => {
                router.push(process.env.NEXT_PUBLIC_BASE_URL + "saved");
              }}
            >
              <IconBookmark />
              <span>Saved</span>
            </div>
          </Button>
          <Button
            className={
              postSectionBtnClass + (filter === "viewed" ? focusBtnClass : "")
            }
            onClick={() => {
              router.push(process.env.NEXT_PUBLIC_BASE_URL + "history");
            }}
          >
            <div className="px-2 flex justify-start items-center gap-3">
              <IconBookmark />
              <span>History</span>
            </div>
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
