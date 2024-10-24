import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const LikeCommentSchema = z.object({
  commentId: z.string().cuid(),
  userId: z.string().cuid(),
});

type LikeCommentRequestProps = {
  commentId: string;
  userId: string;
};

export const POST = async (request: Request) => {
  const body: LikeCommentRequestProps = await request.json();
  const parsedBody = LikeCommentSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const like = await prisma.commentLike.create({
        data: {
          commentId: body.commentId,
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
