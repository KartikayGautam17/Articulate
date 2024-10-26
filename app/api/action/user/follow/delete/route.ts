import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const DeleteFollowSchema = z.object({
  followId: z.string().cuid(),
  userId: z.string().cuid(),
  targetId: z.string().cuid(),
});

export type DeleteFollowRequestProps = {
  followId: string;
  userId: string;
  targetId: string;
};

export const POST = async (request: Request) => {
  const body: DeleteFollowRequestProps = await request.json();
  const parsedBody = DeleteFollowSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const follow = await prisma.follows.delete({
        where: {
          id: body.followId,
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
