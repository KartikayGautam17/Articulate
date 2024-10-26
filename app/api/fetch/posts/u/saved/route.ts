import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const FetchSavedPostSchema = z.object({
  userId: z.string().cuid(),
});

export type FetchSavedPostsRequestProps = {
  userId: string;
};

export const POST = async (request: Request) => {
  const body: FetchSavedPostsRequestProps = await request.json();
  const parsedBody = FetchSavedPostSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const posts = await prisma.save.findMany({
        where: {
          userId: body.userId,
        },
        select: {
          post: true,
        },
      });
      return NextResponse.json({ success: true, postArray: posts });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Error in Prisma Fetch",
        error: error,
      });
    }
  }
};
