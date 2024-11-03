import { Label } from "@/components/ui/label";
import { IconLink } from "@tabler/icons-react";
import Link from "next/link";
export const ProfileLinks = ({
  links,
  targetLinks,
}: {
  links: string[];
  targetLinks: string[];
}) => {
  return (
    <div className="text-center">
      <Label className="text-base font-medium">
        <div className="flex justify-center gap-1">
          <IconLink />
        </div>
      </Label>
      <div className="flex flex-col justify-center items-center font-light w-full overflow-x-clip">
        {links.map((val, i) => {
          return (
            <Link
              href={targetLinks[i]}
              className="hover:underline cursor-pointer"
            >
              {val}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
