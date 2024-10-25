import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const DeleteCommentLikeSchema = z.object({
  commentLikeId: z.string().cuid(),
  userId: z.string().cuid(),
});

type DeleteCommentLikeSchemaProps = {
  commentLikeId: string;
  userId: string;
};

export const POST = async (request: Request) => {
  const body: DeleteCommentLikeSchemaProps = await request.json();
  const parsedBody = DeleteCommentLikeSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const commentLike = await prisma.commentLike.delete({
        where: {
          id: body.commentLikeId,
          userId: body.userId,
        },
      });
      return NextResponse.json({ success: true, commentLike: commentLike });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: parsedBody.error,
      });
    }
  }
};
