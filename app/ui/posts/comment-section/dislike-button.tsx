import { Button } from "@/components/ui/button";
import {
  IconLoader2,
  IconThumbDown,
  IconThumbDownFilled,
} from "@tabler/icons-react";
import { boolean } from "zod";
export const DislikeButton = ({
  btnClass,
  data: dislikes,
  state,
  setState,
}: {
  btnClass: string;
  data: number;
  state: boolean;
  setState: any;
}) => {
  return (
    <Button
      variant={"ghost"}
      className={btnClass}
      onClick={() => {
        setState(!state);
      }}
      disabled={dislikes === -1}
    >
      {dislikes === -1 ? (
        <IconLoader2 className="w-3 h-3 animate-spin" />
      ) : !state ? (
        <>
          <IconThumbDown />
          <span>{dislikes}</span>
        </>
      ) : (
        <>
          <IconThumbDownFilled />
          <span>{dislikes + 1}</span>
        </>
      )}
    </Button>
  );
};
