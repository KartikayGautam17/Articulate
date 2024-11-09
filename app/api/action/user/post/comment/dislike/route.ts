import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const DislikeCommentSchema = z.object({
  commentId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type DislikeCommentRequestProps = {
  commentId: string;
  userId: string;
};

export const POST = async (request: Request) => {
  const body: DislikeCommentRequestProps = await request.json();
  const parsedBody = DislikeCommentSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const dislike = await prisma.commentDislike.create({
        data: {
          commentId: body.commentId,
          userId: body.userId,
        },
      });
      return NextResponse.json({ success: true, commentDislike: dislike });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: error,
      });
    }
  }
};
