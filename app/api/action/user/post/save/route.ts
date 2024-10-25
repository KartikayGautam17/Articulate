import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const SavePostSchema = z.object({
  userId: z.string().cuid(),
  postId: z.string().cuid(),
});

type SavePostRequest = {
  userId: string;
  postId: string;
};

export const POST = async (request: Request) => {
  const body: SavePostRequest = await request.json();
  const parsedBody = SavePostSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const savedPost = await prisma.save.create({
        data: {
          userId: body.userId,
          postId: body.postId,
        },
      });
      return NextResponse.json({ success: true, savedPost: savedPost });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: error,
      });
    }
  }
};
