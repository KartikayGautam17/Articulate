import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-adapter";
import { z } from "zod";

const DeletePostSchema = z.object({
  postId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type DeletePostRequestProps = {
  postId: string;
  userId: string;
};

export const POST = async (request: Request) => {
  const body: DeletePostRequestProps = await request.json();
  const parsedData = DeletePostSchema.safeParse(body);
  if (!parsedData.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedData.error,
    });
  } else {
    try {
      const post = await prisma.post.delete({
        where: {
          id: body.postId,
          authorId: body.userId,
        },
      });
      return NextResponse.json({ success: true, post: post });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Error in prisma deleting the post",
        error: error,
      });
    }
  }
};
