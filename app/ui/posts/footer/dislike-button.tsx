import { Button } from "@/components/ui/button";
import { IconThumbDown, IconThumbDownFilled } from "@tabler/icons-react";
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
      disabled={disabled}
      onClick={() => {
        setState(!state);
      }}
    >
      {!state ? (
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
