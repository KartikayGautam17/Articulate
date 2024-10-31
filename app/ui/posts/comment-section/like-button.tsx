import { Button } from "@/components/ui/button";
import { IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
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
    >
      {!state ? (
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
