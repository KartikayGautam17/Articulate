"use client";
import { createComment } from "@/app/utility/action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IconCirclePlus, IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const AddComment = ({
  postId,
  userId,
  render,
  SetRender,
}: {
  render: any;
  SetRender: any;
  postId: string;
  userId: string;
}) => {
  const { toast } = useToast();
  const [postBtn, setPostBtn] = useState(false);
  const [content, setContent] = useState("");
  const HandleOnClick = async () => {
    if (content === "") {
      toast({
        title: "Write something!",
        description: "You have to write something in that input field ",
        action: <ToastAction altText="...">Got it!</ToastAction>,
      });
      setPostBtn(false);
      return;
    }
    try {
      const response = await createComment({ postId, userId, content });
      if (response.success) {
        toast({
          title: "Success",
          description: "refresh to see your comment",
          action: (
            <ToastAction
              altText="..."
              onClick={() => {
                SetRender(!render);
              }}
            >
              Refresh
            </ToastAction>
          ),
        });
        setContent("");
      } else {
        toast({
          title: "Error",
          description: response.reason,
          action: <ToastAction altText="...">Close</ToastAction>,
        });
        console.log("Could not post comment" + response.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "" + error,
        action: <ToastAction altText="...">Close</ToastAction>,
      });
      console.log("Some error " + error);
    } finally {
      setPostBtn(false);
    }
  };

  return (
    <div className="relative h-[40px]">
      <Textarea
        disabled={postBtn}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="Add a Comment..."
        className="min-h-4 h-full max-h-[80px] focus-visible:ring-0 rounded-none pr-16 overflow-y-hidden my-0"
        value={content}
      ></Textarea>

      <Button
        disabled={postBtn}
        variant={"destructive"}
        className="absolute right-0 bottom-0 h-full rounded-sm border-b-[1px] dark:bg-sky-500 "
        onClick={() => {
          setPostBtn(true);
          HandleOnClick();
        }}
      >
        {postBtn ? (
          <IconLoader2 className="w-4 h-4 animate-spin" />
        ) : (
          <IconCirclePlus />
        )}
      </Button>
    </div>
  );
};
