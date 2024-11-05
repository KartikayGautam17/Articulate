import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchCommentDislikes = z.object({
  commentId: z.string().cuid(),
});

export type FetchCommentDislikesRequestProps = {
  commentId: string;
};

export const POST = async (request: Request) => {
  const body: FetchCommentDislikesRequestProps = await request.json();
  const parsedBody = FetchCommentDislikes.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const commentDislikes = await prisma.commentDislike.findMany({
        where: {
          commentId: body.commentId,
        },
      });
      return NextResponse.json({
        success: true,
        commentDislikeArray: commentDislikes,
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
