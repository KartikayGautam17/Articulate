import Image from "next/image";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import Link from "next/link";

import { EditProfileButton } from "./edit-profile-button";

import { useState } from "react";
import { MainProfileUserFollowButton } from "./follow-profile-button";

const sampleData = {
  name: "Kartikay Gautam",
  image: "https://github.com/shadcn.png",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla iaculis auctor justo eget scelerisque. Nulla vehicula et arcu sit amet convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat magna sed urna elementum gravida. Pellentesque venenatis nulla sit amet nisi porta scelerisque non eget neque. Fusce at nulla.",
  links: ["instagram.com", "https://www.youtube.com/", "reddit.com"],
};
const ownProfile = true;

const contentItemClass = "flex flex-col justify-center gap-3";

export const ProfileMain = () => {
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
              src={sampleData.image}
              alt="Cannot load image"
            />
          </div>

          <div className={contentItemClass}>
            <Label>Name</Label>
            <div>{sampleData.name}</div>
          </div>

          <div className={contentItemClass}>
            <Label>Description</Label>
            <div>{sampleData.description}</div>
          </div>

          <div className={contentItemClass}>
            <Label>Links</Label>
            <div className={contentItemClass}>
              {sampleData.links.map((val) => (
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
              name={sampleData.name}
              description={sampleData.description}
              links={sampleData.links}
            />
          </CardFooter>
        ) : (
          <CardFooter>
            <MainProfileUserFollowButton username={sampleData.name} />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
