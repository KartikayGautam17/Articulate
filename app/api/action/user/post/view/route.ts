import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const ViewPostSchema = z.object({
  userId: z.string().cuid(),
  postId: z.string().cuid(),
});

export type ViewPostRequest = {
  userId: string;
  postId: string;
};

export const POST = async (request: Request) => {
  const body: ViewPostRequest = await request.json();
  const parsedBody = ViewPostSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const ViewedPost = await prisma.view.create({
        data: {
          userId: body.userId,
          postId: body.postId,
        },
      });
      return NextResponse.json({
        success: true,
        view: ViewedPost,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma error",
        error: error,
      });
    }
  }
};
