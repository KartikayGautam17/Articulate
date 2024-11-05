import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchCommentLikes = z.object({
  commentId: z.string().cuid(),
});

export type FetchCommentLikesRequestProps = {
  commentId: string;
};

export const POST = async (request: Request) => {
  const body: FetchCommentLikesRequestProps = await request.json();
  const parsedBody = FetchCommentLikes.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const commentLikes = await prisma.commentLike.findMany({
        where: {
          commentId: body.commentId,
        },
      });

      return NextResponse.json({
        success: true,
        commentLikeArray: commentLikes,
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
