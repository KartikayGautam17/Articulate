"use client";
import Link from "next/link";
import { PostImage } from "./post-image";

export const PostImageWrapper = ({ src }: { src: string }) => {
  if (!src) return <div></div>;
  return (
    <Link href={src} className="cursor-pointer">
      <PostImage src={src} />
    </Link>
  );
};
