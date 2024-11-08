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
  disabled,
}: {
  btnClass: string;
  data: number;
  state: boolean;
  setState: any;
  disabled: boolean;
}) => {
  return (
    <Button
      className={btnClass}
      disabled={disabled || dislikes === -1}
      onClick={() => {
        setState(!state);
      }}
    >
      {!state ? (
        <>
          <IconThumbDown />
          <span>
            {dislikes === -1 ? (
              <IconLoader2 className="w-2 h-2 animate-spin" />
            ) : (
              dislikes
            )}
          </span>
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
