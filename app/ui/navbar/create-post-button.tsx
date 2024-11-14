"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";

export const CreatePostButton = ({ id }: { id: string | null | undefined }) => {
  const router = useRouter();
  // console.log("ID AT CREATE POST BUTTON " + id);
  // console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const HandleCreate = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}/create`);
  };
  return (
    <Button
      onClick={HandleCreate}
      className="sm:w-[90px] w-[55px] h-full flex justify-center items-center p-2 
    bg-transparent hover:bg-gray-200
    outline-none  dark:hover:bg-gray-600 mx-2 rounded-[16px]"
    >
      <IconPlus className=" dark:text-white text-black" />
      <div className="font-light text-black dark:text-white hidden sm:block">
        Create
      </div>
    </Button>
  );
};
