import { Button } from "@/components/ui/button";

import {
  IconLoader2,
  IconRotate2,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
export const LikeButton = ({
  btnClass,
  data: likes,
  state,
  setState,
  disabled,
  likeId,
  setLikeId,
}: {
  btnClass: string;
  data: number;
  state: boolean;
  setState: any;
  disabled: boolean;
  likeId: string | null;
  setLikeId: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <Button
      className={btnClass}
      disabled={disabled || likes === -1}
      onClick={() => {
        setState(!state);
      }}
    >
      {!state ? (
        <>
          <IconThumbUp />
          <span>
            {likes === -1 ? (
              <IconLoader2 className="w-2 h-2 animate-spin" />
            ) : (
              likes
            )}
          </span>
        </>
      ) : (
        <>
          <IconThumbUpFilled />
          <span>{likes + 1}</span>
        </>
      )}
    </Button>
  );
};
