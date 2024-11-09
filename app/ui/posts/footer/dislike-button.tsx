import { Button } from "@/components/ui/button";

import {
  IconLoader2,
  IconThumbDown,
  IconThumbDownFilled,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { boolean } from "zod";
export const DislikeButton = ({
  btnClass,
  data: dislikes,
  state,
  setState,
  disabled,
  dislikeId,
  setDislikeId,
}: {
  btnClass: string;
  data: number;
  state: boolean;
  setState: any;
  disabled: boolean;
  dislikeId: string | null;
  setDislikeId: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <Button
      className={btnClass}
      disabled={disabled || dislikes === -1}
      onClick={async () => {
        setState(!state);
        if (!state) {
        }
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
