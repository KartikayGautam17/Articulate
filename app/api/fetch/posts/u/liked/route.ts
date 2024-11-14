import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const FetchLikedPostSchema = z.object({
  userId: z.string().cuid(),
});

export type FetchLikedPostsRequestProps = {
  userId: string;
};

export const POST = async (request: Request) => {
  const body: FetchLikedPostsRequestProps = await request.json();
  const parsedBody = FetchLikedPostSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const posts = await prisma.like.findMany({
        where: {
          userId: body.userId,
        },
        select: {
          post: true,
        },
        orderBy: {
          createdAt: "desc",
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
