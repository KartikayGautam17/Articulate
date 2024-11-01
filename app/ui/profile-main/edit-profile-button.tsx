"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconReload } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
export const EditProfileButton = ({
  name,
  description,
  links,
}: {
  name: string;
  description: string;
  links: string[];
}) => {
  const { toast } = useToast();
  const [popoverState, setPopoverState] = useState(false);
  const [isBtnClick, setIsBtnClick] = useState(false);
  const submitChangesWait = async () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  useEffect(() => {
    if (!isBtnClick) return;
    //if new changes are similiar to the previous one then there is no need to make a call to DB.
    //once changes are saved
    const handleBtnClick = async () => {
      await submitChangesWait();
      toast({
        title: "Changes Saved",
        description: "However these changes might take time to sync",
        action: (
          <ToastAction altText="cannot_show_close_button">Close</ToastAction>
        ),
      });
      setIsBtnClick(false);
    };
    handleBtnClick();
  }, [isBtnClick]);

  return (
    <Dialog onOpenChange={setPopoverState} open={popoverState}>
      <DialogTrigger>
        <Button variant={"default"}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-start items-center px-8  gap-4">
          <Label className="min-w-20 font-light">Name</Label>
          <span className=" p-2 rounded-md">{name}</span>
        </div>
        <div className="flex justify-start items-baseline px-8  gap-4">
          <Label className="min-w-20 font-light">Description</Label>
          <span className="border-2 p-2 rounded-md overflow-y-auto max-h-32">
            {description}
          </span>
        </div>
        <div className="flex justify-start items-baseline px-8  gap-4">
          <Label className="min-w-20 font-light">Links</Label>
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            {links.map((val, i) => {
              return (
                <Input
                  placeholder={"Enter link " + (i + 1)}
                  defaultValue={val}
                />
              );
            })}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isBtnClick}
            onClick={async () => {
              setIsBtnClick(true);
            }}
          >
            {isBtnClick ? (
              <>
                <IconReload className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes
              </>
            ) : (
              <>Save Changes</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
