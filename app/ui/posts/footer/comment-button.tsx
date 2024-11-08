"use client";
import { Button } from "@/components/ui/button";
import { IconLoader2, IconMessage } from "@tabler/icons-react";

export const CommentButton = ({
  btnClass,
  data: comments,
  disabled,
}: {
  btnClass: string;
  data: number;
  disabled: boolean;
}) => {
  return (
    <Button className={btnClass} disabled={disabled || comments === -1}>
      <IconMessage />
      <span>
        {comments === -1 ? (
          <IconLoader2 className="w-2 h-2 animate-spin" />
        ) : (
          comments
        )}
      </span>
    </Button>
  );
};
