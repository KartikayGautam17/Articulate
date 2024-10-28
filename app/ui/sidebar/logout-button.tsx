import { Button } from "@/components/ui/button";
import { IconLogout2 } from "@tabler/icons-react";

export const LogoutButton = () => {
  return (
    <Button
      className="flex justify-start items-center bg-transparent px-3  text-base font-normal bg-red-500 text-white w-full mt-10
      dark:bg-sky-500 hover:ring-1 ring-red-600 hover:bg-red-500 dark:ring-sky-600 dark:hover:bg-sky-500
    "
    >
      <div className="px-2 flex justify-start items-center gap-3">
        <IconLogout2 />
        <span>Logout</span>
      </div>
    </Button>
  );
};
