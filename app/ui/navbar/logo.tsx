"use client";

import Link from "next/link";
export const Logo = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>
      <div className="w-[100px] h-full flex justify-center items-center text-xl">
        Articulate
      </div>
    </Link>
  );
};
