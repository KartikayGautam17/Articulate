import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const DislikePostSchema = z.object({
  postId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type DislikePostRequestProps = {
  postId: string;
  userId: string;
};

export const POST = async (request: Request) => {
  const body: DislikePostRequestProps = await request.json();
  const parsedBody = DislikePostSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const dislike = await prisma.dislike.create({
        data: {
          postId: body.postId,
          userId: body.userId,
        },
      });
      return NextResponse.json({ success: true, dislike: dislike });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: error,
      });
    }
  }
};
