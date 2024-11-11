import Image from "next/image";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { EditProfileButton } from "./edit-profile-button";
import { MainProfileUserFollowButton } from "./follow-profile-button";

const contentItemClass = "flex flex-col justify-center gap-3";

export const ProfileMain = ({
  ownProfile,
  name,
  image,
  description,
  links,
  sessionId,
  paramId,
}: {
  paramId: string;
  sessionId: string;
  ownProfile: boolean;
  name: string | null;
  image: string | null;
  description: string | null;
  links: string[] | null;
}) => {
  return (
    <div className=" w-[800px] p-5 pt-0">
      <Card className="border-t-0 rounded-none">
        <CardHeader className="mb-2">
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className={contentItemClass + " gap-5"}>
          <div className={contentItemClass}>
            <Label>Image</Label>
            <Image
              className="w-[100px] h-[100px]"
              width={100}
              height={100}
              src={
                image
                  ? image
                  : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              }
              alt="loading"
            />
          </div>
          <div className={contentItemClass}>
            <Label>Name</Label>
            <div>{name}</div>
          </div>
          <div className={contentItemClass}>
            <Label>Description</Label>
            <div>{description}</div>
          </div>
          <div className={contentItemClass}>
            <Label>Links</Label>
            <div className={contentItemClass}>
              {links
                ? links.map((val) => (
                    <a
                      target="_blank"
                      href={val}
                      className={contentItemClass + " gap-3 hover:underline"}
                    >
                      {val}
                    </a>
                  ))
                : Array(3).map((val) => (
                    <a
                      target="_blank"
                      href={val}
                      className={contentItemClass + " gap-3 hover:underline"}
                    >
                      {val}
                    </a>
                  ))}
            </div>
          </div>
        </CardContent>
        {ownProfile ? (
          <CardFooter>
            <EditProfileButton
              name={name ? name : "error_loading_name"}
              description={
                description ? description : "error_loading_description"
              }
              links={links ? links : ["error_loading_links"]}
            />
          </CardFooter>
        ) : (
          <CardFooter>
            <MainProfileUserFollowButton
              username={name ? name : "loading name"}
              sessionId={sessionId}
              userId={paramId}
            />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
