"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { IconLogout2 } from "@tabler/icons-react";

export const logoutBtnClass =
  "flex justify-start items-center bg-transparent px-3  text-base font-normal bg-red-500 text-white w-full dark:bg-sky-500 hover:ring-1 ring-red-600 hover:bg-red-500 dark:ring-sky-600 dark:hover:bg-sky-500";

export const LogoutButton = () => {
  const HandleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: "/login/" });
  };
  return (
    <Button
      onClick={HandleLogout}
      className="flex justify-start items-center bg-transparent px-2  text-base font-normal bg-red-500 text-white w-full 
      dark:bg-sky-500 hover:ring-1 ring-red-600 hover:bg-red-500 dark:ring-sky-600 dark:hover:bg-sky-500 dark:text-white
    "
    >
      <div className="px-2 flex justify-start items-center gap-3">
        <IconLogout2 />
        <span>Logout</span>
      </div>
    </Button>
  );
};
