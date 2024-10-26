import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const LikePostSchema = z.object({
  postId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type LikePostRequestProps = {
  postId: string;
  userId: string;
};

export const POST = async (request: Request) => {
  const body: LikePostRequestProps = await request.json();
  const parsedBody = LikePostSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const like = await prisma.like.create({
        data: {
          postId: body.postId,
          userId: body.userId,
        },
      });
      return NextResponse.json({ success: true, like: like });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: error,
      });
    }
  }
};
