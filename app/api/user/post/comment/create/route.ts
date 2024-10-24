import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateCommentSchema = z.object({
  content: z.string().min(1),
  postId: z.string().cuid(),
  userId: z.string().cuid(),
});

type CreateCommentRequestProps = {
  content: string;
  postId: string;
  userId: string;
};

export const POST = async (request: Request) => {
  const body: CreateCommentRequestProps = await request.json();
  const parsedBody = CreateCommentSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const comment = await prisma.comment.create({
        data: {
          content: body.content,
          postId: body.postId,
          authorId: body.userId,
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
