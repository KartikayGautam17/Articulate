import { Button } from "@/components/ui/button";
import { IconMessage } from "@tabler/icons-react";

export const CommentButton = ({
  btnClass,
  data: comments,
  disabled,
}: {
  btnClass: string;
  data: number;
  disabled: boolean;
}) => {
  if (disabled) {
    return (
      <Button className={btnClass} disabled={true}>
        <IconMessage />
      </Button>
    );
  }
  return (
    <Button className={btnClass}>
      <IconMessage />
      <span>{comments}</span>
    </Button>
  );
};
