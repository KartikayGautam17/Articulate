import {
  IconUserCheck,
  IconUserCircle,
  IconUserPlus,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const SearchedUser = ({ name, description, follow = false }: any) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* <IconUserCircle id="avatar" className="h-12 w-12 rounded-full" /> */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn_logo" />
          <AvatarFallback>KG</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div id="name" className="h-4 w-full">
            {name}
          </div>
          <div id="description" className="h-4 w-full font-light">
            {description}
          </div>
        </div>
      </div>
      {!follow ? <IconUserPlus /> : <IconUserCheck />}
    </div>
  );
};
