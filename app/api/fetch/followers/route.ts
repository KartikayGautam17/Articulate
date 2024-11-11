import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchFollowersSchema = z.object({
  userId: z.string().cuid(),
});

export type FetchFollowersRequestProps = {
  userId: string;
};

export const POST = async (request: Request) => {
  const body: FetchFollowersRequestProps = await request.json();
  const parsedBody = FetchFollowersSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const followersArray = await prisma.follows.findMany({
        where: {
          followingId: body.userId,
        },
      });
      return NextResponse.json({
        success: true,
        followersArray: followersArray,
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
