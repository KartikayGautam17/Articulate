import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchFollowersSchema = z.object({
  userId: z.string().cuid(),
});

type FetchFollowersRequestProps = {
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
      const followers = await prisma.follows.count({
        where: {
          followingId: body.userId,
        },
      });
      return NextResponse.json({
        success: true,
        followers: followers,
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
