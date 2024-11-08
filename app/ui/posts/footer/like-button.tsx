import { Button } from "@/components/ui/button";
import {
  IconLoader2,
  IconRotate2,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
export const LikeButton = ({
  btnClass,
  data: likes,
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
