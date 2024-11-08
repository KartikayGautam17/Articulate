import { Button } from "@/components/ui/button";
import {
  IconLoader2,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
export const LikeButton = ({
  btnClass,
  data: likes,
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
      disabled={likes === -1}
    >
      {likes === -1 ? (
        <IconLoader2 className="w-3 h-3 animate-spin" />
      ) : !state ? (
        <>
          <IconThumbUp />
          <span>{likes}</span>
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
