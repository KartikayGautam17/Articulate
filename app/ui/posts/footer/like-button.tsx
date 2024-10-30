import { Button } from "@/components/ui/button";
import { IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
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
      disabled={disabled}
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
