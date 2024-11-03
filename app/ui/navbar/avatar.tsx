"use client";
import { IconUserCircle } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const UserAvatar = () => {
  const session = useSession();
  return (
    <Link href={"/user/profile/"}>
      <Avatar>
        <AvatarImage src={session?.data?.user.image as string} />
        <AvatarFallback>
          {session.data?.user.name?.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};
