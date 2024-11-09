import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const DeleteCommentSchema = z.object({
  commentId: z.string().cuid(),
});

export type DeleteCommentSchemaProps = {
  commentId: string;
};

export const POST = async (request: Request) => {
  const body: DeleteCommentSchemaProps = await request.json();
  const parsedBody = DeleteCommentSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const comment = await prisma.comment.delete({
        where: {
          id: body.commentId,
        },
      });
      return NextResponse.json({ success: true, comment: comment });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: parsedBody.error,
      });
    }
  }
};
