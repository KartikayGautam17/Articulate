import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchFollowingSchema = z.object({
  userId: z.string().cuid(),
});

export type FetchFollowingRequestProps = {
  userId: string;
};

export const POST = async (request: Request) => {
  const body: FetchFollowingRequestProps = await request.json();
  const parsedBody = FetchFollowingSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const followingArray = await prisma.follows.findMany({
        where: {
          followerId: body.userId,
        },
        select: {
          following: true,
        },
      });
      return NextResponse.json({
        success: true,
        followingArray: followingArray,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: error,
      });
    }
  }
};
