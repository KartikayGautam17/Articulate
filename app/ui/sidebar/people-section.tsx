import { IconUser, IconUserCheck } from "@tabler/icons-react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { postSectionBtnClass } from "./post-section";

const btnClass = postSectionBtnClass;
export const PeopleSection = () => {
  return (
    <Accordion
      type="single"
      id="posts-group"
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="cursor-default">People</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-[5px] px-[10px] mt-2">
          <Button className={btnClass}>
            <div className="px-2 flex justify-start items-center gap-3">
              <IconUser />
              <span>Followers</span>
            </div>
          </Button>

          <Button className={btnClass}>
            <div className="px-2 flex justify-start items-center gap-3">
              <IconUserCheck />
              <span>Following</span>
            </div>
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
