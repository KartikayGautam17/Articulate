import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const DeleteCommentDislikeSchema = z.object({
  commentDislikeId: z.string().cuid(),
});

export type DeleteCommentDislikeSchemaProps = {
  commentDislikeId: string;
};

export const POST = async (request: Request) => {
  const body: DeleteCommentDislikeSchemaProps = await request.json();
  const parsedBody = DeleteCommentDislikeSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const commentDislike = await prisma.commentDislike.delete({
        where: {
          id: body.commentDislikeId,
        },
      });
      return NextResponse.json({
        success: true,
        commentDislike: commentDislike,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: parsedBody.error,
      });
    }
  }
};
