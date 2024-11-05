import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchCommentsSchema = z.object({
  postId: z.string().cuid(),
});

export type FetchCommentsRequestProps = {
  postId: string;
};

export const POST = async (request: Request) => {
  const body: FetchCommentsRequestProps = await request.json();
  const parsedBody = FetchCommentsSchema.safeParse(body);
  console.log(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: body.postId,
        },
      });

      console.log(comments);
      return NextResponse.json({
        success: true,
        commentArray: comments,
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
