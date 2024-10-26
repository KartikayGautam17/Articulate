import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FollowSchema = z.object({
  userId: z.string().cuid(),
  targetId: z.string().cuid(),
});

export type FollowRequestProps = {
  userId: string;
  targetId: string;
};

export const POST = async (request: Request) => {
  const body: FollowRequestProps = await request.json();
  const parsedBody = FollowSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const follow = await prisma.follows.create({
        data: {
          followerId: body.userId,
          followingId: body.targetId,
        },
      });
      return NextResponse.json({
        success: true,
        follow: follow,
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
